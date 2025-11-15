/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * This is the main entry point for the background tasks feature.
 * It exports the primary service, the adapter for shell processes,
 * and all related types.
 */

// Core service for managing tasks
export { BackgroundTaskManager } from '../../services/backgroundTaskManager.js';

// Adapter for converting ChildProcess to a manageable handle
export { ShellExecutionAdapter } from './adapter.js';

// All relevant types for background tasks and shell execution
export * from './types.js';
