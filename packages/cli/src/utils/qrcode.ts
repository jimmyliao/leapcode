/**
 * QR Code Generation Utility
 *
 * Generates QR codes for mobile pairing
 *
 * @author LeapDesign (躍智)
 * @license MIT
 */

import * as qrcode from 'qrcode-terminal';
import { randomBytes } from 'crypto';

export interface PairingData {
  sessionId: string;
  serverUrl: string;
  token: string;
  aiTool: 'gemini' | 'claude' | 'codex';
  workingDirectory?: string;
}

/**
 * Generate a unique session ID
 */
export function generateSessionId(): string {
  return randomBytes(16).toString('hex');
}

/**
 * Generate a secure pairing token
 */
export function generatePairingToken(): string {
  return randomBytes(32).toString('base64url');
}

/**
 * Create pairing data object
 */
export function createPairingData(
  aiTool: 'gemini' | 'claude' | 'codex',
  serverUrl: string = 'wss://api.leapcode.dev',
  workingDirectory?: string
): PairingData {
  return {
    sessionId: generateSessionId(),
    serverUrl,
    token: generatePairingToken(),
    aiTool,
    workingDirectory: workingDirectory || process.cwd(),
  };
}

/**
 * Display QR code in terminal
 */
export function displayQRCode(data: PairingData): void {
  const jsonData = JSON.stringify(data);

  console.log('\n' + '='.repeat(50));
  console.log('📱 Scan this QR Code with LeapCode Mobile App');
  console.log('='.repeat(50) + '\n');

  qrcode.generate(jsonData, { small: true }, (qrCodeString) => {
    console.log(qrCodeString);
  });

  console.log('='.repeat(50));
  console.log('Session ID: ' + data.sessionId.substring(0, 8) + '...');
  console.log('AI Tool: ' + data.aiTool);
  console.log('Working Directory: ' + data.workingDirectory);
  console.log('='.repeat(50) + '\n');
}
