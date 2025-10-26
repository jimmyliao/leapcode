# @jimmyliao/leapcode

**多 AI 編程 CLI 包裝器** - 目前支援 Gemini CLI

[![npm version](https://img.shields.io/npm/v/@jimmyliao/leapcode.svg)](https://www.npmjs.com/package/@jimmyliao/leapcode)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)

[English](README.md) | **繁體中文**

---

## 🚀 安裝

```bash
npm install -g @jimmyliao/leapcode
```

或使用 npx：

```bash
npx @jimmyliao/leapcode gemini
```

---

## 📖 使用方式

### Gemini CLI (✅ 可用)

```bash
export GEMINI_API_KEY="your-api-key"
leapcode gemini
```

### Claude Code (📋 規劃中)

```bash
# 未來版本推出
```

### Codex (📋 規劃中)

```bash
# 未來版本推出
```

---

## 🔧 選項

```bash
leapcode <aiTool> [選項]

選項：
  -s, --server <url>   LeapCode 伺服器 URL
  --offline            離線執行（不同步）（預設）
  --api-key <key>      AI API 金鑰
  -h, --help           顯示說明
  -V, --version        顯示版本
```

---

## 📚 文件

完整文件請參考 [主要 README](../../README.zh-TW.md)。

---

## 🏗️ 套件內容

本套件包裝了流行的 AI 編程工具，提供：

- **統一介面**：單一 CLI 整合所有 AI 工具
- **I/O 攔截**：捕獲 AI 互動內容
- **離線優先**：無需伺服器連線即可運作
- **可選同步**：可選擇同步到行動裝置

---

## 🔗 相關套件

- [@jimmyliao/leapcode-core](../core) - 共享型別與工具

---

## 📄 授權

MIT © [Jimmy Liao](https://github.com/jimmyliao)
