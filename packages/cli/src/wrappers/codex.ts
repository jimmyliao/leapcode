/**
 * Codex Wrapper
 *
 * Wraps OpenAI Codex CLI for LeapCode integration
 *
 * @author LeapDesign (躍智)
 * @license MIT
 */

import { spawn, ChildProcess } from 'child_process';
import { BaseWrapper, WrapperConfig } from './base';
import { execSync } from 'child_process';

export interface CodexConfig extends WrapperConfig {
  apiKey?: string;
  model?: string; // e.g., 'gpt-4', 'gpt-3.5-turbo'
}

export class CodexWrapper extends BaseWrapper {
  private codexProcess?: ChildProcess;
  private codexConfig: CodexConfig;

  constructor(config: CodexConfig) {
    super(config);
    this.codexConfig = config;
  }

  /**
   * Check if Codex CLI is installed
   */
  async isInstalled(): Promise<boolean> {
    try {
      // Check if codex command exists
      execSync('which codex', { stdio: 'ignore' });
      return true;
    } catch (error) {
      // Alternative: check for 'openai' command
      try {
        execSync('which openai', { stdio: 'ignore' });
        return true;
      } catch {
        return false;
      }
    }
  }

  /**
   * Get the version of installed Codex
   */
  async getVersion(): Promise<string | null> {
    try {
      const version = execSync('codex --version', { encoding: 'utf-8' });
      return version.trim();
    } catch (error) {
      // Try openai command
      try {
        const version = execSync('openai --version', { encoding: 'utf-8' });
        return version.trim();
      } catch {
        return null;
      }
    }
  }

  /**
   * Start Codex in interactive mode
   */
  async start(): Promise<void> {
    // Check installation
    const installed = await this.isInstalled();
    if (!installed) {
      throw new Error(
        'Codex is not installed. Please install OpenAI CLI or Codex wrapper.'
      );
    }

    // Get version info
    const version = await this.getVersion();
    console.log(`Starting Codex ${version || 'unknown version'}...`);

    // Build command args
    const args = this.getCommand();

    // Setup environment
    const env = { ...process.env };
    if (this.codexConfig.apiKey) {
      env.OPENAI_API_KEY = this.codexConfig.apiKey;
    }

    // Spawn Codex process
    this.codexProcess = spawn('codex', args, {
      env,
      stdio: ['inherit', 'pipe', 'pipe'], // stdin: inherit, stdout/stderr: pipe
    });

    // Setup I/O handlers
    this.setupIOHandlers();

    // Setup process handlers
    this.codexProcess.on('error', (error) => {
      console.error('Failed to start Codex:', error.message);
      throw error;
    });

    this.codexProcess.on('exit', (code, signal) => {
      console.log(`Codex exited with code ${code} and signal ${signal}`);
    });
  }

  /**
   * Setup I/O handlers for stdout and stderr
   */
  private setupIOHandlers(): void {
    if (!this.codexProcess) return;

    // Handle stdout
    this.codexProcess.stdout?.on('data', (data: Buffer) => {
      const output = data.toString();

      // TODO: Sync to server if not offline
      if (!this.config.offline) {
        this.syncOutput(output);
      }

      // Echo to local stdout
      process.stdout.write(output);
    });

    // Handle stderr
    this.codexProcess.stderr?.on('data', (data: Buffer) => {
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
   * Sync output to server (placeholder)
   */
  private syncOutput(output: string): void {
    // TODO: Implement WebSocket sync to leapcode-server
  }

  /**
   * Sync error to server (placeholder)
   */
  private syncError(error: string): void {
    // TODO: Implement WebSocket sync to leapcode-server
  }

  /**
   * Stop Codex gracefully
   */
  async stop(): Promise<void> {
    if (!this.codexProcess) {
      return;
    }

    return new Promise((resolve) => {
      this.codexProcess!.on('exit', () => {
        this.codexProcess = undefined;
        resolve();
      });

      // Send SIGTERM for graceful shutdown
      this.codexProcess!.kill('SIGTERM');

      // Force kill after 5 seconds
      setTimeout(() => {
        if (this.codexProcess) {
          this.codexProcess.kill('SIGKILL');
        }
      }, 5000);
    });
  }

  /**
   * Get command arguments for Codex
   */
  protected getCommand(): string[] {
    const args: string[] = [];

    // Add model if specified
    if (this.codexConfig.model) {
      args.push('--model', this.codexConfig.model);
    }

    return args;
  }

  /**
   * Run a one-off command in non-interactive mode
   */
  async runCommand(prompt: string): Promise<string> {
    const installed = await this.isInstalled();
    if (!installed) {
      throw new Error('Codex is not installed');
    }

    return new Promise((resolve, reject) => {
      const env = { ...process.env };
      if (this.codexConfig.apiKey) {
        env.OPENAI_API_KEY = this.codexConfig.apiKey;
      }

      const args = ['-p', prompt];
      if (this.codexConfig.model) {
        args.push('--model', this.codexConfig.model);
      }

      const codexProcess = spawn('codex', args, {
        env,
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      let stdoutData = '';
      let stderrData = '';

      codexProcess.stdout.on('data', (data) => {
        stdoutData += data.toString();
      });

      codexProcess.stderr.on('data', (data) => {
        stderrData += data.toString();
      });

      codexProcess.on('close', (code) => {
        if (code === 0) {
          resolve(stdoutData);
        } else {
          reject(
            new Error(
              `Codex exited with code ${code}. Stderr: ${stderrData}`
            )
          );
        }
      });

      codexProcess.on('error', (err) => {
        reject(new Error(`Failed to start Codex: ${err.message}`));
      });
    });
  }
}
