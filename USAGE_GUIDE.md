# LeapCode CLI 使用指南

**版本**: v0.1.0
**更新日期**: 2025-10-26

---

## 🚀 快速開始

### 1. 安裝依賴

```bash
cd ~/workspace/jimmyliao/leapcode/leapcode-cli
npm install
```

### 2. 構建專案

```bash
npm run build
```

### 3. 使用 LeapCode

```bash
# 方式 1: 使用 npm start
npm start

# 方式 2: 直接執行
node dist/cli.js

# 方式 3: 使用 npx（如果已全局安裝）
npx leapcode
```

---

## 💻 基本使用

### 啟動 Gemini CLI（默認）

```bash
# 最簡單的方式
node dist/cli.js

# 或明確指定
node dist/cli.js gemini

# 帶 API key
node dist/cli.js gemini --api-key YOUR_GEMINI_API_KEY

# 離線模式（不同步到 server）
node dist/cli.js gemini --offline
```

### 啟動 Claude Code

```bash
node dist/cli.js claude

# 帶 API key
node dist/cli.js claude --api-key YOUR_ANTHROPIC_API_KEY
```

### 啟動 Codex

```bash
node dist/cli.js codex

# 帶 API key
node dist/cli.js codex --api-key YOUR_OPENAI_API_KEY
```

---

## ⚙️ 配置管理

### 設置配置

```bash
# 設置 server URL
node dist/cli.js config set server.url https://api.leapcode.dev

# 設置 Gemini API key
node dist/cli.js config set gemini.apiKey YOUR_KEY

# 設置 Claude API key
node dist/cli.js config set claude.apiKey YOUR_KEY

# 設置 Codex API key
node dist/cli.js config set codex.apiKey YOUR_KEY
```

### 查看配置

```bash
# 查看特定配置
node dist/cli.js config get server.url

# 查看所有配置
node dist/cli.js config list
```

### 配置文件位置

配置保存在: `~/.leapcode/config.json`

```json
{
  "server": {
    "url": "https://api.leapcode.dev"
  },
  "gemini": {
    "apiKey": "YOUR_GEMINI_API_KEY",
    "outputFormat": "text"
  },
  "claude": {
    "apiKey": "YOUR_ANTHROPIC_API_KEY"
  },
  "codex": {
    "apiKey": "YOUR_OPENAI_API_KEY"
  },
  "general": {
    "offline": false,
    "autoSync": true
  }
}
```

---

## 🔑 環境變數

LeapCode 支持通過環境變數設置 API keys：

```bash
# Gemini API Key
export GEMINI_API_KEY="your-gemini-api-key"
node dist/cli.js gemini

# Claude API Key
export ANTHROPIC_API_KEY="your-anthropic-api-key"
node dist/cli.js claude

# Codex API Key
export OPENAI_API_KEY="your-openai-api-key"
node dist/cli.js codex
```

或者使用 `.env` 文件：

```bash
# 創建 .env 文件
cat > ~/workspace/jimmyliao/leapcode/leapcode-cli/.env <<EOF
GEMINI_API_KEY=your-gemini-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key
OPENAI_API_KEY=your-openai-api-key
EOF
```

---

## 📱 與 LeapCode Server 連接

### 啟動 Server

```bash
# 在另一個終端
cd ~/workspace/jimmyliao/leapcode/leapcode-server
npm install
npm run build
npm start
```

Server 會在 `http://localhost:3000` 啟動

### 連接 CLI 到 Server

```bash
# 使用默認 server (localhost:3000)
node dist/cli.js gemini

# 使用自定義 server
node dist/cli.js gemini --server https://your-server.com
```

---

## 🎯 完整使用範例

### 範例 1: 使用 Gemini CLI（離線模式）

```bash
cd ~/workspace/jimmyliao/leapcode/leapcode-cli

# 設置環境變數
export GEMINI_API_KEY="your-api-key"

# 啟動 LeapCode（離線模式，不需要 server）
node dist/cli.js gemini --offline
```

你會看到：
```
🚀 LeapCode CLI v0.1.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Starting Gemini CLI wrapper...
   Gemini CLI version: x.x.x
Starting Gemini CLI x.x.x...

# 然後 Gemini CLI 會正常啟動
```

### 範例 2: 使用配置文件

```bash
# 先設置配置
node dist/cli.js config set gemini.apiKey "your-api-key"
node dist/cli.js config set general.offline true

# 然後直接啟動（會使用配置文件的設置）
node dist/cli.js gemini
```

### 範例 3: 完整流程（CLI + Server）

```bash
# Terminal 1: 啟動 Server
cd ~/workspace/jimmyliao/leapcode/leapcode-server
npm start

# Terminal 2: 啟動 CLI
cd ~/workspace/jimmyliao/leapcode/leapcode-cli
export GEMINI_API_KEY="your-api-key"
node dist/cli.js gemini --server http://localhost:3000
```

---

## 🔍 檢查安裝狀態

### 檢查 Gemini CLI 是否安裝

```bash
# 方式 1: 使用 which
which gemini

# 方式 2: 檢查版本
gemini --version

# 如果未安裝，執行：
npm install -g @google/gemini-cli
```

### 檢查 Claude Code 是否安裝

```bash
which claude
claude --version

# 安裝方式：訪問 https://claude.ai/code
```

### 檢查 Codex 是否安裝

```bash
which codex
# 或
which openai

# 安裝方式：
npm install -g @openai/codex-cli
```

---

## 🛠️ 故障排除

### 問題 1: "Gemini CLI is not installed"

**解決方案**:
```bash
npm install -g @google/gemini-cli
```

### 問題 2: "Failed to connect to server"

**解決方案**:
```bash
# 檢查 server 是否運行
curl http://localhost:3000/health

# 或使用離線模式
node dist/cli.js gemini --offline
```

### 問題 3: "API key not found"

**解決方案**:
```bash
# 方式 1: 使用環境變數
export GEMINI_API_KEY="your-key"

# 方式 2: 使用命令行參數
node dist/cli.js gemini --api-key "your-key"

# 方式 3: 設置配置文件
node dist/cli.js config set gemini.apiKey "your-key"
```

### 問題 4: 查看詳細日誌

```bash
# 設置 DEBUG 環境變數
DEBUG=* node dist/cli.js gemini
```

---

## 📋 命令參考

### 主命令

```bash
leapcode [AI工具] [選項]

AI工具:
  gemini    啟動 Gemini CLI (默認)
  claude    啟動 Claude Code
  codex     啟動 Codex

選項:
  -s, --server <url>    LeapCode server URL
  --offline             離線模式（不同步）
  --api-key <key>       AI API key
  -h, --help            顯示幫助
  -V, --version         顯示版本
```

### 配置命令

```bash
leapcode config set <key> <value>    設置配置
leapcode config get <key>            獲取配置
leapcode config list                 列出所有配置
```

---

## 🎨 進階使用

### 創建別名（方便使用）

在 `~/.bashrc` 或 `~/.zshrc` 添加：

```bash
alias lc='node ~/workspace/jimmyliao/leapcode/leapcode-cli/dist/cli.js'
alias lcg='lc gemini --offline'
alias lcc='lc claude --offline'
alias lcx='lc codex --offline'
```

然後就可以使用：

```bash
lcg  # 啟動 Gemini
lcc  # 啟動 Claude
lcx  # 啟動 Codex
```

### 使用 npm link（開發模式）

```bash
cd ~/workspace/jimmyliao/leapcode/leapcode-cli
npm link

# 現在可以全局使用
leapcode gemini
```

---

## 📊 使用統計

LeapCode CLI 會自動記錄使用統計（未來功能）：
- 使用次數
- 使用時長
- AI 工具偏好
- 同步數據量

---

## 🔐 安全建議

1. **不要在代碼中硬編碼 API keys**
2. **使用環境變數或配置文件**
3. **不要提交 `.env` 文件到 git**
4. **定期輪換 API keys**

---

## 📞 獲取幫助

```bash
# 查看幫助
node dist/cli.js --help

# 查看版本
node dist/cli.js --version

# 查看配置
node dist/cli.js config list
```

---

## 🎉 快速測試

執行以下命令快速測試 LeapCode：

```bash
cd ~/workspace/jimmyliao/leapcode/leapcode-cli
npm install
npm run build

# 測試基本功能（假設 Gemini CLI 已安裝）
node dist/cli.js gemini --offline
```

---

**LeapCode CLI - 讓 AI 編程工具隨時隨地可用！** 🚀
