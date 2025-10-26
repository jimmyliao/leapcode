# LeapCode

**多 AI 編程 CLI 包裝器** - 目前支援 Gemini CLI（Claude Code 與 Codex 規劃中）

[![版本](https://img.shields.io/badge/version-0.2.0-blue.svg)](https://github.com/jimmyliao/leapcode)
[![授權](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)

[English](README.md) | **繁體中文**

---

## 🚀 快速開始

### 安裝

```bash
npm install -g @jimmyliao/leapcode
```

### 使用方式

```bash
# Gemini CLI (✅ 可用)
export GEMINI_API_KEY="your-api-key"
leapcode gemini

# Claude Code (📋 規劃中)
# 即將推出...

# Codex (📋 規劃中)
# 即將推出...
```

---

## 📖 什麼是 LeapCode？

LeapCode 包裝了流行的 AI 編程工具，提供統一的介面和增強功能。

**目前狀態：**
- ✅ **Gemini CLI** - 完全支援
- 📋 **Claude Code** - 未來版本規劃中
- 📋 **Codex** - 未來版本規劃中

**功能特色：**

- ✅ **統一介面**：單一 CLI 整合所有 AI 工具
- ✅ **I/O 攔截**：捕獲並同步 AI 互動內容
- ✅ **離線優先**：無需伺服器連線即可運作
- ✅ **可選同步**：可選擇同步到行動裝置
- ✅ **端到端加密**：安全的通訊（同步時）

---

## 🏗️ 架構

LeapCode 是一個 monorepo，包含：

```
leapcode/
├── packages/
│   ├── cli/          📦 主要 CLI（公開）
│   ├── core/         📦 共享型別與工具（公開）
│   ├── sync/         📦 WebSocket 同步客戶端（私有）
│   └── server/       📦 同步伺服器（私有）
└── apps/
    └── mobile/       📱 行動應用程式（未來）
```

### 套件說明

| 套件 | 說明 | 發布狀態 |
|------|------|----------|
| `@jimmyliao/leapcode` | 主要 CLI 套件 | ✅ 公開 |
| `@jimmyliao/leapcode-core` | 共享型別與工具 | ✅ 公開 |
| `@jimmyliao/leapcode-sync` | WebSocket 客戶端 | ❌ 私有 |
| `@jimmyliao/leapcode-server` | 同步伺服器 | ❌ 私有 |

---

## 💻 開發

### 前置需求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 設定

```bash
# 複製儲存庫
git clone https://github.com/jimmyliao/leapcode.git
cd leapcode

# 安裝依賴
npm install

# 建構所有套件
npm run build
```

### Monorepo 結構

本專案使用 **npm workspaces** 進行 monorepo 管理。

```bash
# 建構所有套件
npm run build

# 執行測試
npm run test

# 檢查程式碼
npm run lint

# 清理建構產物
npm run clean
```

### 快速啟動腳本

```bash
# 啟動 Gemini CLI
./quick-start.sh gemini

# 啟動 Claude Code
./quick-start.sh claude

# 啟動 Codex
./quick-start.sh codex
```

---

## 📚 文件

- [START_HERE.md](START_HERE.md) - 從這裡開始
- [USAGE_GUIDE.md](USAGE_GUIDE.md) - 完整使用指南
- [DEMO.md](DEMO.md) - 詳細演示
- [README_USAGE.md](README_USAGE.md) - 快速使用指南
- [Architecture Review](.agents/collaboration/architecture-review.md) - 架構設計文檔

---

## 🔧 CLI 命令

```bash
# 啟動 AI 工具包裝器
leapcode <aiTool> [選項]

選項：
  -s, --server <url>   LeapCode 伺服器 URL
  --offline            離線執行（不同步）（預設）
  --api-key <key>      AI API 金鑰
  -h, --help           顯示說明
  -V, --version        顯示版本

# 設定管理
leapcode config set <key> <value>
leapcode config get <key>
leapcode config list
```

---

## 🔐 環境變數

```bash
# AI API 金鑰
export GEMINI_API_KEY="your-gemini-api-key"  # ✅ 目前支援

# 未來版本規劃：
# export ANTHROPIC_API_KEY="your-anthropic-api-key"  # 📋 規劃中
# export OPENAI_API_KEY="your-openai-api-key"        # 📋 規劃中

# 可選：伺服器 URL
export LEAPCODE_SERVER="https://api.leapcode.dev"
```

---

## 📦 發布

### 發布 CLI 到 npm

```bash
# 測試發布
npm publish -w @jimmyliao/leapcode --dry-run

# 正式發布
npm publish -w @jimmyliao/leapcode --access public
```

### 發布 Core 到 npm

```bash
npm publish -w @jimmyliao/leapcode-core --access public
```

---

## 🤝 貢獻

歡迎貢獻！提交 PR 前請先閱讀我們的貢獻指南。

1. Fork 本儲存庫
2. 建立功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交變更 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 開啟 Pull Request

---

## 📄 授權

MIT License - 詳見 [LICENSE](LICENSE) 檔案

---

## 👤 作者

**Jimmy Liao** <jimmyliao@jimmyliao.net>

- GitHub: [@jimmyliao](https://github.com/jimmyliao)

---

## 🙏 致謝

- 靈感來自 [Happy Coder](https://github.com/slopus/happy)
- 為 AI 編程社群而建

---

**LeapCode v0.2.0** - 讓 AI 編程工具無處不在！🚀
