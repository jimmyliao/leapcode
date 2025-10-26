# @jimmyliao/leapcode-core

**LeapCode Core** - 共享型別、常數與工具函式

[![npm version](https://img.shields.io/npm/v/@jimmyliao/leapcode-core.svg)](https://www.npmjs.com/package/@jimmyliao/leapcode-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)

[English](README.md) | **繁體中文**

---

## 📖 說明

核心套件，包含所有 LeapCode 套件使用的共享 TypeScript 型別、常數和工具函式。

---

## 📦 安裝

```bash
npm install @jimmyliao/leapcode-core
```

---

## 🔧 使用方式

### 型別

```typescript
import { AITool, CLIOptions, LeapCodeConfig } from '@jimmyliao/leapcode-core';

const tool: AITool = 'gemini';

const options: CLIOptions = {
  server: 'https://api.leapcode.dev',
  offline: true,
  apiKey: 'your-key',
};
```

### 常數

```typescript
import { DEFAULT_CONFIG, ENV_VARS, APP_META } from '@jimmyliao/leapcode-core';

console.log(APP_META.NAME); // 'LeapCode'
console.log(APP_META.VERSION); // '0.2.0'
console.log(ENV_VARS.GEMINI_API_KEY); // 'GEMINI_API_KEY'
```

### 工具函式

```typescript
import { isValidAITool, getEnv, retry } from '@jimmyliao/leapcode-core';

if (isValidAITool('gemini')) {
  const apiKey = getEnv('GEMINI_API_KEY');

  await retry(async () => {
    // 你的非同步操作
  }, { maxAttempts: 3 });
}
```

---

## 📚 匯出項目

### 型別

- `AITool` - 支援的 AI 工具 ('gemini' | 'claude' | 'codex')
- `CLIOptions` - CLI 命令選項
- `LeapCodeConfig` - 設定結構
- `SocketConfig` - WebSocket 設定
- `OutputMessage` - 輸出訊息格式
- `RPCCall` / `RPCResponse` - RPC 訊息型別
- `PairingData` - 裝置配對資料

### 常數

- `DEFAULT_CONFIG` - 預設設定值
- `ENV_VARS` - 環境變數名稱
- `CLI_COMMANDS` - CLI 命令名稱
- `WS_EVENTS` - WebSocket 事件名稱
- `APP_META` - 應用程式詮釋資料

### 工具函式

- `isValidAITool(tool)` - 驗證 AI 工具名稱
- `getEnv(key, fallback?)` - 取得環境變數
- `formatTimestamp(timestamp)` - 格式化時間戳記為 ISO 字串
- `sleep(ms)` - 睡眠工具
- `retry(fn, options?)` - 指數退避重試

---

## 🔗 相關套件

- [@jimmyliao/leapcode](../cli) - 主要 CLI 套件

---

## 📄 授權

MIT © [Jimmy Liao](https://github.com/jimmyliao)
