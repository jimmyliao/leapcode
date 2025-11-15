/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * This file re-exports the core background task types from the service layer.
 * It serves as the single source of truth for all background task-related types
 * within the LeapCode Core package, ensuring consistency and ease of maintenance.
 *
 * By centralizing type exports, we can easily add adapter-specific types in the future
 * without modifying the core service definitions.
 */

export type {
  BackgroundTask,
  BackgroundTaskStatus,
  BackgroundTaskManagerConfig,
} from '../../services/backgroundTaskManager.js';

export type {
  ShellExecutionHandle,
  ShellExecutionResult,
} from '../../services/shellExecutionService.js';
