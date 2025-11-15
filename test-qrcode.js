#!/usr/bin/env node

/**
 * Test QR Code display without running Gemini CLI
 */

const { createPairingData, displayQRCode } = require('./packages/cli/dist/utils/qrcode');

console.log('\n🧪 Testing QR Code Generation...\n');

// Create pairing data
const pairingData = createPairingData(
  'gemini',
  'wss://api.leapcode.dev',
  process.cwd()
);

// Display QR Code
displayQRCode(pairingData);

console.log('\n✅ QR Code test complete!');
console.log('\n📱 You can scan this QR code with the LeapCode Mobile app');
console.log('   to test the pairing functionality.\n');
