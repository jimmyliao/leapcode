# LeapCode CLI 使用演示

**實際操作指南** - 預設已整合 Gemini CLI

---

## 🎬 演示：啟動 Gemini CLI

### 步驟 1: 準備環境

```bash
# 進入 CLI 目錄
cd ~/workspace/jimmyliao/leapcode/leapcode-cli

# 安裝依賴（只需首次執行）
npm install

# 構建專案（只需首次執行或修改代碼後）
npm run build
```

### 步驟 2: 設置 API Key（選擇一種方式）

**方式 A: 使用環境變數（推薦）**
```bash
export GEMINI_API_KEY="your-gemini-api-key-here"
```

**方式 B: 使用配置文件**
```bash
node dist/cli.js config set gemini.apiKey "your-gemini-api-key-here"
```

**方式 C: 使用命令行參數**
```bash
# 直接在啟動時指定（見下方）
```

### 步驟 3: 啟動 LeapCode + Gemini CLI

**最簡單的方式（離線模式）：**
```bash
node dist/cli.js gemini --offline
```

**帶 API key：**
```bash
node dist/cli.js gemini --api-key "your-key" --offline
```

**使用環境變數：**
```bash
export GEMINI_API_KEY="your-key"
node dist/cli.js
```

---

## 📺 預期輸出

### 成功啟動時，你會看到：

```
🚀 LeapCode CLI v0.1.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Starting Gemini CLI wrapper...
   Gemini CLI version: 1.x.x
Starting Gemini CLI 1.x.x...

[Gemini CLI 正常啟動]
┌─────────────────────────────────────────────┐
│ Gemini CLI                                  │
│ Type your question or /help for commands    │
└─────────────────────────────────────────────┘

>
```

現在你可以正常使用 Gemini CLI，所有輸入輸出都會被 LeapCode 攔截！

---

## 🔧 實際操作範例

### 範例 1: 快速測試

```bash
# 1. 進入目錄
cd ~/workspace/jimmyliao/leapcode/leapcode-cli

# 2. 確保已構建
npm run build

# 3. 啟動（離線模式，不需要 server）
GEMINI_API_KEY="your-key" node dist/cli.js gemini --offline
```

### 範例 2: 使用配置文件

```bash
# 1. 設置配置
node dist/cli.js config set gemini.apiKey "your-key"
node dist/cli.js config set general.offline true

# 2. 查看配置
node dist/cli.js config list

# 3. 啟動（會自動使用配置）
node dist/cli.js
```

輸出：
```json
{
  "gemini": {
    "apiKey": "your-key"
  },
  "general": {
    "offline": true,
    "autoSync": true
  }
}
```

### 範例 3: 連接 Server（完整功能）

**Terminal 1 - 啟動 Server:**
```bash
cd ~/workspace/jimmyliao/leapcode/leapcode-server
npm install
npm run build
npm start
```

輸出：
```
🚀 Starting LeapCode Server...
Environment: development
Listening on: 0.0.0.0:3000
✅ LeapCode Server is running
   HTTP: http://0.0.0.0:3000
   WebSocket: ws://0.0.0.0:3000
```

**Terminal 2 - 啟動 CLI:**
```bash
cd ~/workspace/jimmyliao/leapcode/leapcode-cli
export GEMINI_API_KEY="your-key"
node dist/cli.js gemini --server http://localhost:3000
```

輸出：
```
🚀 LeapCode CLI v0.1.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Starting Gemini CLI wrapper...
   Gemini CLI version: 1.x.x
Starting Gemini CLI 1.x.x...
✅ Connected to LeapCode Server

[Gemini CLI 正常啟動，I/O 會同步到 server]
```

---

## 🎯 互動測試

啟動後，試試這些 Gemini CLI 命令：

```bash
# 問一個問題
> 你好，請介紹一下自己

# 查看幫助
> /help

# 退出
> /exit
```

**LeapCode 會攔截所有這些輸入輸出！**

---

## 📊 查看 LeapCode 運作

### 檢查 I/O 攔截

當你在 Gemini CLI 中輸入問題時，LeapCode 會：

1. ✅ 捕獲你的輸入（stdin）
2. ✅ 捕獲 Gemini 的輸出（stdout）
3. ✅ 捕獲錯誤信息（stderr）
4. ✅ 如果連接 server，會同步到 server

### 檢查 WebSocket 連接（如果啟用）

在 Server 的 terminal 中，你會看到：
```
Client connected { socketId: 'xxx', clientType: 'user-scoped', hasToken: true }
Received output { socketId: 'xxx', type: 'stdout', length: 123 }
```

---

## 🐛 常見問題解決

### Q1: "Gemini CLI is not installed"

**解決：**
```bash
# 安裝 Gemini CLI
npm install -g @google/gemini-cli

# 驗證安裝
gemini --version
```

### Q2: 沒有輸出

**檢查：**
```bash
# 1. 確認已構建
ls dist/cli.js

# 2. 重新構建
npm run build

# 3. 嘗試運行
node dist/cli.js gemini --offline
```

### Q3: API key 錯誤

**解決：**
```bash
# 確認環境變數
echo $GEMINI_API_KEY

# 重新設置
export GEMINI_API_KEY="your-correct-key"

# 或使用配置文件
node dist/cli.js config set gemini.apiKey "your-key"
```

---

## 🎨 進階使用

### 創建快捷命令

在 `~/.bashrc` 或 `~/.zshrc` 添加：

```bash
# LeapCode 快捷命令
alias lc='cd ~/workspace/jimmyliao/leapcode/leapcode-cli && node dist/cli.js'
alias lcg='lc gemini --offline'

# 設置默認 API key
export GEMINI_API_KEY="your-key"
```

然後：
```bash
source ~/.bashrc  # 或 source ~/.zshrc

# 現在可以直接使用
lcg  # 啟動 LeapCode + Gemini
```

### 使用 package.json scripts

在 `leapcode-cli/package.json` 中添加：

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/cli.js gemini --offline",
    "start:gemini": "node dist/cli.js gemini",
    "start:claude": "node dist/cli.js claude",
    "start:codex": "node dist/cli.js codex"
  }
}
```

然後：
```bash
npm start  # 啟動 Gemini（離線）
npm run start:gemini  # 啟動 Gemini
npm run start:claude  # 啟動 Claude
```

---

## 🎬 完整演示腳本

複製貼上以下命令進行完整測試：

```bash
# 1. 進入目錄並構建
cd ~/workspace/jimmyliao/leapcode/leapcode-cli
npm install
npm run build

# 2. 設置 API key（替換成你的）
export GEMINI_API_KEY="your-gemini-api-key-here"

# 3. 啟動 LeapCode + Gemini（離線模式）
node dist/cli.js gemini --offline

# 現在你應該看到 Gemini CLI 正常啟動！
# 試著輸入一個問題測試
```

---

## 📝 驗證清單

啟動後，檢查以下項目：

- [ ] 看到 "🚀 LeapCode CLI v0.1.0"
- [ ] 看到 "Starting Gemini CLI wrapper..."
- [ ] 看到 Gemini CLI 版本號
- [ ] Gemini CLI 正常啟動
- [ ] 可以輸入問題
- [ ] 可以看到 Gemini 回應
- [ ] 使用 `/exit` 可以正常退出

---

## 🎉 成功！

如果你看到所有上述輸出，恭喜！LeapCode CLI 已經成功運行並整合了 Gemini CLI！

接下來你可以：
1. ✅ 嘗試連接 Server（完整功能）
2. ✅ 測試 Claude Code wrapper
3. ✅ 測試 Codex wrapper
4. ✅ 配置自動同步

---

**享受使用 LeapCode CLI！** 🚀
