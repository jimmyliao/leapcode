/**
 * Base AI Wrapper
 *
 * Abstract base class for all AI tool wrappers
 */

import { ChildProcess } from 'child_process';

export interface WrapperConfig {
  serverUrl?: string;
  offline: boolean;
}

export abstract class BaseWrapper {
  protected process?: ChildProcess;
  protected config: WrapperConfig;

  constructor(config: WrapperConfig) {
    this.config = config;
  }

  /**
   * Start the AI tool and attach I/O handlers
   */
  abstract start(): Promise<void>;

  /**
   * Stop the AI tool gracefully
   */
  abstract stop(): Promise<void>;

  /**
   * Check if the AI tool is installed
   */
  abstract isInstalled(): Promise<boolean>;

  /**
   * Get the command to start the AI tool
   */
  protected abstract getCommand(): string[];
}
