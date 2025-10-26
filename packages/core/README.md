# @jimmyliao/leapcode-core

**LeapCode Core** - Shared types, constants, and utilities

[![npm version](https://img.shields.io/npm/v/@jimmyliao/leapcode-core.svg)](https://www.npmjs.com/package/@jimmyliao/leapcode-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)

---

## 📖 Description

Core package containing shared TypeScript types, constants, and utility functions used across all LeapCode packages.

---

## 📦 Installation

```bash
npm install @jimmyliao/leapcode-core
```

---

## 🔧 Usage

### Types

```typescript
import { AITool, CLIOptions, LeapCodeConfig } from '@jimmyliao/leapcode-core';

const tool: AITool = 'gemini';

const options: CLIOptions = {
  server: 'https://api.leapcode.dev',
  offline: true,
  apiKey: 'your-key',
};
```

### Constants

```typescript
import { DEFAULT_CONFIG, ENV_VARS, APP_META } from '@jimmyliao/leapcode-core';

console.log(APP_META.NAME); // 'LeapCode'
console.log(APP_META.VERSION); // '0.2.0'
console.log(ENV_VARS.GEMINI_API_KEY); // 'GEMINI_API_KEY'
```

### Utilities

```typescript
import { isValidAITool, getEnv, retry } from '@jimmyliao/leapcode-core';

if (isValidAITool('gemini')) {
  const apiKey = getEnv('GEMINI_API_KEY');

  await retry(async () => {
    // Your async operation
  }, { maxAttempts: 3 });
}
```

---

## 📚 Exported Items

### Types

- `AITool` - Supported AI tools ('gemini' | 'claude' | 'codex')
- `CLIOptions` - CLI command options
- `LeapCodeConfig` - Configuration structure
- `SocketConfig` - WebSocket configuration
- `OutputMessage` - Output message format
- `RPCCall` / `RPCResponse` - RPC message types
- `PairingData` - Device pairing data

### Constants

- `DEFAULT_CONFIG` - Default configuration values
- `ENV_VARS` - Environment variable names
- `CLI_COMMANDS` - CLI command names
- `WS_EVENTS` - WebSocket event names
- `APP_META` - Application metadata

### Utilities

- `isValidAITool(tool)` - Validate AI tool name
- `getEnv(key, fallback?)` - Get environment variable
- `formatTimestamp(timestamp)` - Format timestamp to ISO string
- `sleep(ms)` - Sleep utility
- `retry(fn, options?)` - Retry with exponential backoff

---

## 🔗 Related Packages

- [@jimmyliao/leapcode](../cli) - Main CLI package

---

## 📄 License

MIT © [Jimmy Liao](https://github.com/jimmyliao)
