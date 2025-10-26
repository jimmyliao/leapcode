# 🎯 LeapCode 快速使用指南

**最簡單的使用方式** - 3 步開始使用

---

## 🚀 最快速度啟動（推薦）

### 步驟 1: 設置 API Key

```bash
# 在終端機執行（只需設置一次）
export GEMINI_API_KEY="your-gemini-api-key"
```

### 步驟 2: 執行快速啟動腳本

```bash
cd ~/workspace/jimmyliao/leapcode
./quick-start.sh
```

### 步驟 3: 開始使用！

你會看到 Gemini CLI 啟動，現在可以開始問問題了！

---

## 🎬 實際演示

### 使用 Gemini CLI

```bash
# 1. 設置 API key
export GEMINI_API_KEY="your-api-key"

# 2. 啟動 LeapCode
cd ~/workspace/jimmyliao/leapcode
./quick-start.sh

# 你會看到:
🚀 LeapCode CLI 快速啟動
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ GEMINI_API_KEY 已設置
🎬 啟動 LeapCode CLI...

🚀 LeapCode CLI v0.1.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Starting Gemini CLI wrapper...
   Gemini CLI version: 1.x.x
Starting Gemini CLI 1.x.x...

[Gemini CLI 正常運行]
```

### 使用 Claude Code

```bash
export ANTHROPIC_API_KEY="your-api-key"
./quick-start.sh claude
```

### 使用 Codex

```bash
export OPENAI_API_KEY="your-api-key"
./quick-start.sh codex
```

---

## 📋 其他使用方式

### 方式 1: 手動啟動（完全控制）

```bash
cd ~/workspace/jimmyliao/leapcode/leapcode-cli
npm run build
node dist/cli.js gemini --offline
```

### 方式 2: 使用配置文件

```bash
# 設置配置
node dist/cli.js config set gemini.apiKey "your-key"

# 啟動（會自動使用配置）
./quick-start.sh
```

### 方式 3: 連接 Server（完整功能）

```bash
# Terminal 1: 啟動 Server
cd ~/workspace/jimmyliao/leapcode/leapcode-server
npm start

# Terminal 2: 啟動 CLI
cd ~/workspace/jimmyliao/leapcode/leapcode-cli
node dist/cli.js gemini --server http://localhost:3000
```

---

## 🔑 API Key 設置方式

### 方式 A: 環境變數（推薦）

```bash
# 臨時設置（當前 session）
export GEMINI_API_KEY="your-key"

# 永久設置（添加到 ~/.bashrc 或 ~/.zshrc）
echo 'export GEMINI_API_KEY="your-key"' >> ~/.bashrc
source ~/.bashrc
```

### 方式 B: 配置文件

```bash
node dist/cli.js config set gemini.apiKey "your-key"
```

### 方式 C: 命令行參數

```bash
node dist/cli.js gemini --api-key "your-key" --offline
```

---

## 📂 重要文件位置

```
~/workspace/jimmyliao/leapcode/
├── quick-start.sh          # 快速啟動腳本 ⭐
├── DEMO.md                 # 詳細演示指南
├── USAGE_GUIDE.md          # 完整使用指南
├── README_USAGE.md         # 本文件
├── leapcode-cli/           # CLI 原始碼
│   ├── dist/cli.js         # 編譯後的執行文件
│   └── .env                # 可選：環境變數文件
└── leapcode-server/        # Server 原始碼
```

---

## ✅ 驗證安裝

### 檢查 Gemini CLI

```bash
which gemini
gemini --version
```

如果未安裝：
```bash
npm install -g @google/gemini-cli
```

### 檢查 LeapCode 構建

```bash
ls ~/workspace/jimmyliao/leapcode/leapcode-cli/dist/cli.js
```

如果不存在：
```bash
cd ~/workspace/jimmyliao/leapcode/leapcode-cli
npm install
npm run build
```

---

## 🎯 快速參考

### 啟動命令

| 命令 | 功能 |
|------|------|
| `./quick-start.sh` | 啟動 Gemini（默認） |
| `./quick-start.sh claude` | 啟動 Claude Code |
| `./quick-start.sh codex` | 啟動 Codex |

### 配置命令

| 命令 | 功能 |
|------|------|
| `node dist/cli.js config set <key> <value>` | 設置配置 |
| `node dist/cli.js config get <key>` | 查看配置 |
| `node dist/cli.js config list` | 列出所有配置 |

### 環境變數

| 變數 | 用途 |
|------|------|
| `GEMINI_API_KEY` | Gemini API 密鑰 |
| `ANTHROPIC_API_KEY` | Claude API 密鑰 |
| `OPENAI_API_KEY` | Codex API 密鑰 |

---

## 🐛 遇到問題？

### 1. 檢查構建

```bash
cd ~/workspace/jimmyliao/leapcode/leapcode-cli
npm run build
```

### 2. 檢查 API key

```bash
echo $GEMINI_API_KEY
```

### 3. 查看詳細日誌

```bash
DEBUG=* node dist/cli.js gemini --offline
```

### 4. 查看完整文檔

- 詳細演示：`cat DEMO.md`
- 完整指南：`cat USAGE_GUIDE.md`

---

## 💡 提示

- ✅ 首次使用請先執行 `npm run build`
- ✅ 離線模式使用 `--offline` 參數
- ✅ API key 可以通過環境變數或配置文件設置
- ✅ 使用 `./quick-start.sh` 是最簡單的方式

---

## 🎉 現在開始使用！

```bash
# 一行命令啟動
export GEMINI_API_KEY="your-key" && cd ~/workspace/jimmyliao/leapcode && ./quick-start.sh
```

**享受 LeapCode 帶來的便利！** 🚀
