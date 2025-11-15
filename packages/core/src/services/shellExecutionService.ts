
import { ChildProcess } from 'child_process';

/**
 * @interface ShellExecutionResult
 * Represents the result of a shell command execution.
 */
export interface ShellExecutionResult {
  /**
   * The exit code of the process. Can be null if the process was terminated by a signal.
   */
  exitCode: number | null;
  /**
   * The signal that terminated the process. Can be null if the process exited normally.
   */
  signal: NodeJS.Signals | number | null;
  /**
   * Indicates if the process was aborted (killed).
   */
  aborted: boolean;
  /**
   * The error object if the process exited with an error.
   */
  error?: Error;
  /**
   * The combined stdout and stderr output of the process.
   */
  output: string;
}

/**
 * @interface ShellExecutionHandle
 * Provides a handle to a running shell command, allowing for interaction and result tracking.
 * This is the interface that the BackgroundTaskManager expects for managing background tasks.
 */
export interface ShellExecutionHandle {
  /**
   * The process ID of the running command.
   */
  readonly pid: number;
  /**
   * A promise that resolves with the execution result when the command completes.
   */
  readonly result: Promise<ShellExecutionResult>;
  /**
   * The underlying ChildProcess instance.
   */
  readonly process: ChildProcess;

  /**
   * Terminates the running command.
   * @param signal The signal to send to the process. Defaults to 'SIGTERM'.
   * @returns A promise that resolves when the process has been terminated.
   */
  kill(signal?: NodeJS.Signals | number): Promise<void>;
}
