/**
 * API Socket Client
 *
 * WebSocket client for syncing with LeapCode Server
 * Based on Happy's apiSocket.ts implementation
 *
 * @author LeapDesign (躍智)
 * @license MIT
 */

import { io, Socket } from 'socket.io-client';

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface ApiSocketConfig {
  endpoint: string;
  token: string;
  clientType?: 'user-scoped' | 'machine-scoped';
}

export class ApiSocket {
  private socket?: Socket;
  private config?: ApiSocketConfig;
  private status: ConnectionStatus = 'disconnected';
  private reconnectAttempts = 0;

  constructor() {
    // Will be initialized with configure()
  }

  /**
   * Configure the socket with server endpoint and token
   */
  configure(config: ApiSocketConfig): void {
    this.config = config;
  }

  /**
   * Connect to the WebSocket server
   */
  connect(): void {
    if (!this.config || this.socket) {
      return;
    }

    this.updateStatus('connecting');

    this.socket = io(this.config.endpoint, {
      path: '/v1/updates',
      auth: {
        token: this.config.token,
        clientType: this.config.clientType || 'user-scoped',
      },
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity,
    });

    this.setupEventHandlers();
  }

  /**
   * Setup event handlers for socket
   */
  private setupEventHandlers(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('✅ Connected to LeapCode Server');
      this.updateStatus('connected');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason) => {
      console.log(`❌ Disconnected from LeapCode Server: ${reason}`);
      this.updateStatus('disconnected');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error.message);
      this.updateStatus('error');
      this.reconnectAttempts++;

      if (this.reconnectAttempts > 5) {
        console.error('Too many reconnection attempts, giving up');
        this.disconnect();
      }
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
      this.updateStatus('error');
    });
  }

  /**
   * Register a message handler for a specific event
   */
  onMessage(event: string, handler: (data: any) => void): void {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }

    this.socket.on(event, handler);
  }

  /**
   * Send a message with acknowledgment
   */
  async emitWithAck(event: string, data: any): Promise<any> {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }

    return new Promise((resolve, reject) => {
      this.socket!.timeout(30000).emit(event, data, (error: Error | null, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  /**
   * Send stdout data to server
   */
  async sendOutput(output: string): Promise<void> {
    try {
      await this.emitWithAck('output', {
        type: 'stdout',
        data: output,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error('Failed to send output:', error);
    }
  }

  /**
   * Send stderr data to server
   */
  async sendError(error: string): Promise<void> {
    try {
      await this.emitWithAck('output', {
        type: 'stderr',
        data: error,
        timestamp: Date.now(),
      });
    } catch (err) {
      console.error('Failed to send error:', err);
    }
  }

  /**
   * Send input data to server
   */
  async sendInput(input: string): Promise<void> {
    try {
      await this.emitWithAck('input', {
        data: input,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error('Failed to send input:', error);
    }
  }

  /**
   * Disconnect from the server
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = undefined;
      this.updateStatus('disconnected');
    }
  }

  /**
   * Update connection status
   */
  private updateStatus(status: ConnectionStatus): void {
    this.status = status;
    // TODO: Emit status change event if needed
  }

  /**
   * Get current connection status
   */
  getStatus(): ConnectionStatus {
    return this.status;
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.status === 'connected';
  }
}

// Singleton instance
let instance: ApiSocket | null = null;

export function getApiSocket(): ApiSocket {
  if (!instance) {
    instance = new ApiSocket();
  }
  return instance;
}
