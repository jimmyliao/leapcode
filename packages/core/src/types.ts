/**
 * LeapCode Core Types
 * Shared type definitions across all packages
 */

/**
 * Supported AI tools
 */
export type AITool = 'gemini' | 'claude' | 'codex';

/**
 * CLI options
 */
export interface CLIOptions {
  server?: string;
  offline?: boolean;
  apiKey?: string;
  sync?: boolean;
}

/**
 * Configuration structure
 */
export interface LeapCodeConfig {
  server?: {
    url?: string;
  };
  gemini?: {
    apiKey?: string;
    outputFormat?: string;
  };
  claude?: {
    apiKey?: string;
  };
  codex?: {
    apiKey?: string;
  };
  general?: {
    offline?: boolean;
    autoSync?: boolean;
  };
}

/**
 * WebSocket message types
 */
export interface WSMessage {
  type: 'stdout' | 'stderr' | 'stdin' | 'rpc-call' | 'rpc-response';
  data: any;
  timestamp: number;
}

/**
 * Output message for sync
 */
export interface OutputMessage {
  type: 'stdout' | 'stderr';
  data: string;
  timestamp: number;
}

/**
 * RPC call message
 */
export interface RPCCall {
  method: string;
  params: any[];
  id: string;
}

/**
 * RPC response message
 */
export interface RPCResponse {
  result?: any;
  error?: {
    code: number;
    message: string;
  };
  id: string;
}

/**
 * Device pairing data
 */
export interface PairingData {
  deviceId: string;
  publicKey: string;
  timestamp: number;
}

/**
 * Socket connection config
 */
export interface SocketConfig {
  endpoint: string;
  token?: string;
  clientType?: 'user-scoped' | 'device-scoped';
}
