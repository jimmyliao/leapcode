/**
 * Process Utilities
 *
 * Helper functions for process management
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Check if a command exists in PATH
 */
export async function which(command: string): Promise<string> {
  try {
    const { stdout } = await execAsync(`which ${command}`);
    return stdout.trim();
  } catch {
    throw new Error(`Command not found: ${command}`);
  }
}

/**
 * Check if a process is running
 */
export function isProcessRunning(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}
