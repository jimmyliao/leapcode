/**
 * LeapCode Core Constants
 */

/**
 * Default configuration values
 */
export const DEFAULT_CONFIG = {
  SERVER_URL: 'https://api.leapcode.dev',
  CONFIG_DIR: '.leapcode',
  CONFIG_FILE: 'config.json',
  OFFLINE_MODE: false,
  AUTO_SYNC: true,
} as const;

/**
 * Environment variable names
 */
export const ENV_VARS = {
  GEMINI_API_KEY: 'GEMINI_API_KEY',
  ANTHROPIC_API_KEY: 'ANTHROPIC_API_KEY',
  OPENAI_API_KEY: 'OPENAI_API_KEY',
  LEAPCODE_SERVER: 'LEAPCODE_SERVER',
} as const;

/**
 * CLI tool commands
 */
export const CLI_COMMANDS = {
  GEMINI: 'gemini',
  CLAUDE: 'claude',
  CODEX: 'codex',
} as const;

/**
 * WebSocket events
 */
export const WS_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  OUTPUT: 'output',
  RPC_CALL: 'rpc-call',
  RPC_RESPONSE: 'rpc-response',
  ERROR: 'error',
} as const;

/**
 * Application metadata
 */
export const APP_META = {
  NAME: 'LeapCode',
  VERSION: '0.2.0',
  DESCRIPTION: 'Multi-AI coding CLI wrapper',
  AUTHOR: 'Jimmy Liao',
} as const;
