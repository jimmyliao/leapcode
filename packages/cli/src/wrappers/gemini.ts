/**
 * Gemini CLI Wrapper
 *
 * Wraps the Gemini CLI tool for LeapCode integration
 * Based on analysis from Gemini CLI structure analysis
 *
 * @author LeapDesign (躍智)  
 * @license MIT
 */

import { spawn, ChildProcess } from 'child_process';
import { BaseWrapper, WrapperConfig } from './base';
import { execSync } from 'child_process';
import { getApiSocket } from '../sync/apiSocket';
import {
  getBackgroundTaskManager,
  BackgroundTaskManager,
  ShellExecutionAdapter,
  BackgroundTask,
} from '@jimmyliao/leapcode-core';
import chalk from 'chalk';
import { checkGeminiCliVersion } from '@jimmyliao/leapcode-core';

export interface GeminiConfig extends WrapperConfig {
  apiKey?: string;
  outputFormat?: 'text' | 'json' | 'stream-json';
  sandbox?: boolean;
}

export class GeminiWrapper extends BaseWrapper {
  private geminiProcess?: ChildProcess;
  private geminiConfig: GeminiConfig;
  private backgroundTaskManager: BackgroundTaskManager;
  private isBackgroundTaskSupported = false;

  constructor(config: GeminiConfig) {
    super(config);
    this.geminiConfig = config;
    this.backgroundTaskManager = getBackgroundTaskManager();
  }

  /**
   * Check if Gemini CLI is installed
   */
  async isInstalled(): Promise<boolean> {
    try {
      execSync('gemini --version', { stdio: 'ignore' });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get the version of installed Gemini CLI
   */
  async getVersion(): Promise<string | null> {
    try {
      const version = execSync('gemini --version', { encoding: 'utf-8' });
      return version.trim();
    } catch (error) {
      return null;
    }
  }

  /**
   * Check if installed Gemini CLI supports background tasks
   */
  async checkFeatureSupport(): Promise<void> {
    const version = await this.getVersion();
    if (version) {
      const { supported, requiredVersion } = await checkGeminiCliVersion(
        version,
      );
      this.isBackgroundTaskSupported = supported;

      if (supported) {
        console.log(
          chalk.gray(
            `   Background tasks feature is supported (requires gemini-cli >= v${requiredVersion}).`,
          ),
        );
      } else {
        console.log(
          chalk.yellow(
            `   Warning: gemini-cli version (${version}) is too old for background tasks (requires >= v${requiredVersion}).`,
          ),
        );
        console.log(
          chalk.yellow(
            '   Background shell commands will not be available. Please upgrade gemini-cli.',
          ),
        );
      }
    }
  }

  /**
   * Run a shell command in the background
   * @param command The command to execute
   * @param cwd The working directory
   * @returns The background task object
   */
  private async runInBackground(
    command: string,
    cwd: string,
  ): Promise<BackgroundTask> {
    const process = spawn(command, {
      shell: true,
      cwd,
      detached: true, // To run independently of the parent
    });

    const adapter = new ShellExecutionAdapter(process);
    const task = this.backgroundTaskManager.registerTask(command, cwd, adapter);

    return task;
  }

  /**
   * Start Gemini CLI in interactive mode
   */
  async start(): Promise<void> {
    // Check installation
    const installed = await this.isInstalled();
    if (!installed) {
      throw new Error(
        'Gemini CLI is not installed. Please install it with: npm install -g @google/gemini-cli',
      );
    }

    // Get version info
    const version = await this.getVersion();
    console.log(`Starting Gemini CLI ${version || 'unknown version'}...`);

    await this.checkFeatureSupport();

    // Build command args
    const args = this.getCommand();

    // Setup environment
    const env = { ...process.env };
    if (this.geminiConfig.apiKey) {
      env.GEMINI_API_KEY = this.geminiConfig.apiKey;
    }

    // Spawn Gemini CLI process
    this.geminiProcess = spawn('gemini', args, {
      env,
      stdio: 'inherit', // Inherit parent's stdio for interactive mode
    });

    // Setup I/O handlers
    this.setupIOHandlers();

    // Setup process handlers
    this.geminiProcess.on('error', (error) => {
      console.error('Failed to start Gemini CLI:', error.message);
      throw error;
    });

    this.geminiProcess.on('exit', (code, signal) => {
      console.log(`Gemini CLI exited with code ${code} and signal ${signal}`);
      process.stdin.removeListener('data', stdinHandler);
    });
  }

  /**
   * Setup I/O handlers for stdout and stderr
   */
  private setupIOHandlers(): void {
    if (!this.geminiProcess) return;

    // Handle stdout
    this.geminiProcess.stdout?.on('data', (data: Buffer) => {
      const output = data.toString();
      let isBackgroundTaskRequest = false;

      if (this.isBackgroundTaskSupported) {
        try {
          const jsonOutput = JSON.parse(output);
          if (
            jsonOutput.type === 'tool_code' &&
            jsonOutput.data?.tool_name === 'run_shell_command' &&
            jsonOutput.data?.run_in_background === true
          ) {
            isBackgroundTaskRequest = true;
            const { command, dir_path } = jsonOutput.data;
            this.runInBackground(command, dir_path || process.cwd()).then(
              (task) => {
                const response = {
                  type: 'tool_result',
                  tool_name: 'run_shell_command',
                  shell_id: task.id,
                  pid: task.pid,
                  output: `Background task started with ID: ${task.id} and PID: ${task.pid}`,
                };
                this.geminiProcess?.stdin?.write(
                  JSON.stringify(response) + '\n',
                );
              },
            );
          }
        } catch (e) {
          // Not a JSON object, treat as regular output
        }
      }

      if (!isBackgroundTaskRequest) {
        if (!this.config.offline) {
          this.syncOutput(output);
        }
        process.stdout.write(output);
      }
    });

    // Handle stderr
    this.geminiProcess.stderr?.on('data', (data: Buffer) => {
      const error = data.toString();

      // TODO: Sync to server if not offline
      if (!this.config.offline) {
        this.syncError(error);
      }

      // Echo to local stderr
      process.stderr.write(error);
    });
  }

  /**
   * Sync output to server
   */
  private syncOutput(output: string): void {
    const apiSocket = getApiSocket();
    if (apiSocket.isConnected()) {
      apiSocket.sendOutput(output);
    }
  }

  /**
   * Sync error to server
   */
  private syncError(error: string): void {
    const apiSocket = getApiSocket();
    if (apiSocket.isConnected()) {
      apiSocket.sendError(error);
    }
  }

  /**
   * Stop Gemini CLI gracefully
   */
  async stop(): Promise<void> {
    if (!this.geminiProcess) {
      return;
    }

    return new Promise((resolve) => {
      this.geminiProcess!.on('exit', () => {
        this.geminiProcess = undefined;
        resolve();
      });

      // Send SIGTERM for graceful shutdown
      this.geminiProcess!.kill('SIGTERM');

      // Force kill after 5 seconds
      setTimeout(() => {
        if (this.geminiProcess) {
          this.geminiProcess.kill('SIGKILL');
        }
      }, 5000);
    });
  }

  /**
   * Get command arguments for Gemini CLI
   */
  protected getCommand(): string[] {
    const args: string[] = [];

    // Output format
    if (this.geminiConfig.outputFormat) {
      args.push('--output-format', this.geminiConfig.outputFormat);
    }

    // Sandbox mode
    if (this.geminiConfig.sandbox) {
      args.push('--sandbox');
    }

    return args;
  }

  /**
   * Run a one-off command in non-interactive mode
   */
  async runCommand(prompt: string): Promise<string> {
    const installed = await this.isInstalled();
    if (!installed) {
      throw new Error('Gemini CLI is not installed');
    }

    return new Promise((resolve, reject) => {
      const env = { ...process.env };
      if (this.geminiConfig.apiKey) {
        env.GEMINI_API_KEY = this.geminiConfig.apiKey;
      }

      const geminiProcess = spawn(
        'gemini',
        ['-p', prompt, '--output-format', 'json'],
        {
          env,
          stdio: ['pipe', 'pipe', 'pipe'],
        },
      );

      let stdoutData = '';
      let stderrData = '';

      geminiProcess.stdout.on('data', (data) => {
        stdoutData += data.toString();
      });

      geminiProcess.stderr.on('data', (data) => {
        stderrData += data.toString();
      });

      geminiProcess.on('close', (code) => {
        if (code === 0) {
          try {
            // Try to parse JSON output
            const jsonOutput = JSON.parse(stdoutData);
            resolve(jsonOutput.response || stdoutData);
          } catch (e) {
            // Fallback to raw output
            resolve(stdoutData);
          }
        } else {
          reject(
            new Error(
              `Gemini CLI exited with code ${code}. Stderr: ${stderrData}`,
            ),
          );
        }
      });

      geminiProcess.on('error', (err) => {
        reject(new Error(`Failed to start Gemini CLI: ${err.message}`));
      });
    });
  }
}
