/**
 * Claude Code Wrapper
 *
 * Wraps Claude Code CLI for LeapCode integration
 *
 * @author LeapDesign (躍智)
 * @license MIT
 */

import { spawn, ChildProcess } from 'child_process';
import { BaseWrapper, WrapperConfig } from './base';
import { execSync } from 'child_process';

export interface ClaudeConfig extends WrapperConfig {
  apiKey?: string;
}

export class ClaudeWrapper extends BaseWrapper {
  private claudeProcess?: ChildProcess;
  private claudeConfig: ClaudeConfig;

  constructor(config: ClaudeConfig) {
    super(config);
    this.claudeConfig = config;
  }

  /**
   * Check if Claude Code is installed
   */
  async isInstalled(): Promise<boolean> {
    try {
      // Check if claude command exists
      execSync('which claude', { stdio: 'ignore' });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get the version of installed Claude Code
   */
  async getVersion(): Promise<string | null> {
    try {
      const version = execSync('claude --version', { encoding: 'utf-8' });
      return version.trim();
    } catch (error) {
      return null;
    }
  }

  /**
   * Start Claude Code in interactive mode
   */
  async start(): Promise<void> {
    // Check installation
    const installed = await this.isInstalled();
    if (!installed) {
      throw new Error(
        'Claude Code is not installed. Please install it from: https://claude.ai/code'
      );
    }

    // Get version info
    const version = await this.getVersion();
    console.log(`Starting Claude Code ${version || 'unknown version'}...`);

    // Build command args
    const args = this.getCommand();

    // Setup environment
    const env = { ...process.env };
    if (this.claudeConfig.apiKey) {
      env.ANTHROPIC_API_KEY = this.claudeConfig.apiKey;
    }

    // Spawn Claude Code process
    this.claudeProcess = spawn('claude', args, {
      env,
      stdio: ['inherit', 'pipe', 'pipe'], // stdin: inherit, stdout/stderr: pipe
    });

    // Setup I/O handlers
    this.setupIOHandlers();

    // Setup process handlers
    this.claudeProcess.on('error', (error) => {
      console.error('Failed to start Claude Code:', error.message);
      throw error;
    });

    this.claudeProcess.on('exit', (code, signal) => {
      console.log(`Claude Code exited with code ${code} and signal ${signal}`);
    });
  }

  /**
   * Setup I/O handlers for stdout and stderr
   */
  private setupIOHandlers(): void {
    if (!this.claudeProcess) return;

    // Handle stdout
    this.claudeProcess.stdout?.on('data', (data: Buffer) => {
      const output = data.toString();

      // TODO: Sync to server if not offline
      if (!this.config.offline) {
        this.syncOutput(output);
      }

      // Echo to local stdout
      process.stdout.write(output);
    });

    // Handle stderr
    this.claudeProcess.stderr?.on('data', (data: Buffer) => {
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
   * Stop Claude Code gracefully
   */
  async stop(): Promise<void> {
    if (!this.claudeProcess) {
      return;
    }

    return new Promise((resolve) => {
      this.claudeProcess!.on('exit', () => {
        this.claudeProcess = undefined;
        resolve();
      });

      // Send SIGTERM for graceful shutdown
      this.claudeProcess!.kill('SIGTERM');

      // Force kill after 5 seconds
      setTimeout(() => {
        if (this.claudeProcess) {
          this.claudeProcess.kill('SIGKILL');
        }
      }, 5000);
    });
  }

  /**
   * Get command arguments for Claude Code
   */
  protected getCommand(): string[] {
    const args: string[] = [];

    // Claude Code typically runs without special args
    // Add custom args here if needed

    return args;
  }
}
