
import { ChildProcess } from 'child_process';
import {
  ShellExecutionHandle,
  ShellExecutionResult,
} from './types';

const GRACEFUL_KILL_TIMEOUT = 2000; // 2 seconds

/**
 * Adapts a Node.js ChildProcess to the ShellExecutionHandle interface.
 * This class is responsible for managing the lifecycle of a spawned process,
 * capturing its output, and providing a standardized way to interact with it.
 */
export class ShellExecutionAdapter implements ShellExecutionHandle {
  readonly pid: number;
  readonly result: Promise<ShellExecutionResult>;
  readonly process: ChildProcess;

  private output = '';
  private aborted = false;

  /**
   * Constructs a new ShellExecutionAdapter.
   * @param process The Node.js ChildProcess instance to wrap.
   */
  constructor(process: ChildProcess) {
    this.process = process;
    if (process.pid === undefined) {
      throw new Error('Process has no PID.');
    }
    this.pid = process.pid;

    this.result = new Promise((resolve) => {
      // Capture stdout and stderr
      process.stdout?.on('data', (data) => (this.output += data.toString()));
      process.stderr?.on('data', (data) => (this.output += data.toString()));

      process.on('error', (error) => {
        resolve({
          exitCode: 1, // Generic error code
          signal: null,
          aborted: this.aborted,
          error,
          output: this.output,
        });
      });

      process.on('close', (exitCode, signal) => {
        resolve({
          exitCode,
          signal,
          aborted: this.aborted,
          output: this.output,
        });
      });
    });
  }

  /**
   * Terminates the process gracefully.
   * It first sends a SIGTERM signal and waits for a timeout. If the process
   * is still alive, it sends a SIGKILL signal to force termination.
   * @param signal The signal to use. Not used in this implementation, which
   * always attempts a graceful SIGTERM then SIGKILL.
   * @returns A promise that resolves when the process is terminated.
   */
  async kill(): Promise<void> {
    if (this.process.killed) {
      return;
    }
    this.aborted = true;

    return new Promise((resolve) => {
      // 1. Attempt graceful termination
      this.process.kill('SIGTERM');

      // 2. Set a timeout to forcefully kill if it doesn't terminate
      const timeout = setTimeout(() => {
        if (!this.process.killed) {
          this.process.kill('SIGKILL');
        }
      }, GRACEFUL_KILL_TIMEOUT);

      // 3. Resolve the promise once the process is closed
      this.process.on('close', () => {
        clearTimeout(timeout);
        resolve();
      });
    });
  }
}
