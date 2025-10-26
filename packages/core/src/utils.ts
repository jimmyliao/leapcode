/**
 * LeapCode Core Utilities
 */

import { AITool } from './types';
import { CLI_COMMANDS } from './constants';

/**
 * Validate AI tool name
 */
export function isValidAITool(tool: string): tool is AITool {
  return Object.values(CLI_COMMANDS).includes(tool as any);
}

/**
 * Get environment variable with fallback
 */
export function getEnv(key: string, fallback?: string): string | undefined {
  return process.env[key] || fallback;
}

/**
 * Format timestamp to ISO string
 */
export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toISOString();
}

/**
 * Sleep utility
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry utility with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number;
    delayMs?: number;
    backoff?: number;
  } = {}
): Promise<T> {
  const { maxAttempts = 3, delayMs = 1000, backoff = 2 } = options;

  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt < maxAttempts) {
        const delay = delayMs * Math.pow(backoff, attempt - 1);
        await sleep(delay);
      }
    }
  }

  throw lastError;
}
