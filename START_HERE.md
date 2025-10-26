# 🚀 LeapCode - 從這裡開始

**歡迎使用 LeapCode！** 這是你開始使用的完整指南。

---

## 📖 文檔導覽

LeapCode 提供了完整的文檔幫助你快速上手：

| 文檔 | 用途 | 適合對象 |
|------|------|----------|
| **README_USAGE.md** ⭐ | 3步快速啟動 | 想立即使用的人 |
| **DEMO.md** | 詳細演示和範例 | 想了解詳細操作的人 |
| **USAGE_GUIDE.md** | 完整使用指南 | 想深入了解所有功能的人 |
| **quick-start.sh** | 一鍵啟動腳本 | 想最簡單啟動的人 |

---

## ⚡ 最快速開始（3 步驟）

### 1️⃣ 設置 API Key

```bash
export GEMINI_API_KEY="your-gemini-api-key"
```

### 2️⃣ 執行腳本

```bash
cd ~/workspace/jimmyliao/leapcode
./quick-start.sh
```

### 3️⃣ 開始使用！

現在 Gemini CLI 已經透過 LeapCode 啟動，所有 I/O 都會被攔截！

---

## 📚 詳細文檔

### 🎯 快速使用（推薦先看這個）

```bash
cat README_USAGE.md
```

內容包含：
- ✅ 3步快速啟動
- ✅ 實際演示
- ✅ 常見問題解決
- ✅ 快速參考表

### 🎬 演示指南（想看詳細操作）

```bash
cat DEMO.md
```

內容包含：
- ✅ 步驟式演示
- ✅ 預期輸出展示
- ✅ 完整範例腳本
- ✅ 驗證清單

### 📖 完整指南（想了解所有功能）

```bash
cat USAGE_GUIDE.md
```

內容包含：
- ✅ 所有命令詳解
- ✅ 配置管理詳解
- ✅ 進階使用技巧
- ✅ 故障排除完整指南

---

## 🎯 你想做什麼？

### 我想立即使用 LeapCode + Gemini

```bash
# 設置 API key
export GEMINI_API_KEY="your-key"

# 啟動
cd ~/workspace/jimmyliao/leapcode
./quick-start.sh
```

### 我想了解如何使用

```bash
# 查看快速指南
cat README_USAGE.md

# 或查看詳細演示
cat DEMO.md
```

### 我想使用 Claude Code

```bash
export ANTHROPIC_API_KEY="your-key"
./quick-start.sh claude
```

### 我想使用 Codex

```bash
export OPENAI_API_KEY="your-key"
./quick-start.sh codex
```

### 我想測試完整功能（CLI + Server）

**Terminal 1 - Server:**
```bash
cd ~/workspace/jimmyliao/leapcode/leapcode-server
npm install && npm run build
npm start
```

**Terminal 2 - CLI:**
```bash
cd ~/workspace/jimmyliao/leapcode/leapcode-cli
export GEMINI_API_KEY="your-key"
node dist/cli.js gemini --server http://localhost:3000
```

---

## 🔧 首次使用前的準備

### 1. 確保已安裝 Gemini CLI

```bash
# 檢查
which gemini

# 如果沒有，安裝它
npm install -g @google/gemini-cli
```

### 2. 構建 LeapCode CLI

```bash
cd ~/workspace/jimmyliao/leapcode/leapcode-cli
npm install
npm run build
```

### 3. 驗證構建成功

```bash
ls dist/cli.js
# 應該看到文件存在
```

---

## 📂 專案結構

```
~/workspace/jimmyliao/leapcode/
├── START_HERE.md           ⭐ 你正在看的文件
├── README_USAGE.md         ⭐ 快速使用指南
├── DEMO.md                 📺 詳細演示
├── USAGE_GUIDE.md          📖 完整指南
├── quick-start.sh          🚀 快速啟動腳本
│
├── leapcode-cli/           💻 CLI 原始碼
│   ├── src/                   源代碼
│   ├── dist/                  編譯後文件
│   └── package.json
│
├── leapcode-server/        🌐 Server 原始碼
│   ├── src/
│   └── package.json
│
└── .agents/                📋 開發協作
    └── collaboration/         AI 協作文檔
```

---

## 🎓 學習路徑

### 入門級（5 分鐘）
1. 閱讀 `README_USAGE.md`
2. 執行 `./quick-start.sh`
3. 開始使用！

### 進階級（15 分鐘）
1. 閱讀 `DEMO.md`
2. 嘗試不同的啟動方式
3. 配置個人化設置

### 專家級（30 分鐘）
1. 閱讀 `USAGE_GUIDE.md`
2. 設置 Server
3. 測試完整功能
4. 自定義配置和腳本

---

## 💡 快速提示

### 最常用命令

```bash
# 啟動 Gemini（最簡單）
./quick-start.sh

# 啟動 Claude
./quick-start.sh claude

# 查看配置
cd leapcode-cli && node dist/cli.js config list

# 設置配置
node dist/cli.js config set gemini.apiKey "your-key"
```

### 環境變數快速設置

添加到 `~/.bashrc` 或 `~/.zshrc`：

```bash
# LeapCode 環境變數
export GEMINI_API_KEY="your-gemini-key"
export ANTHROPIC_API_KEY="your-claude-key"
export OPENAI_API_KEY="your-openai-key"

# LeapCode 別名
alias lc='cd ~/workspace/jimmyliao/leapcode && ./quick-start.sh'
alias lcg='lc'
alias lcc='lc claude'
alias lcx='lc codex'
```

然後：
```bash
source ~/.bashrc  # 或 source ~/.zshrc
lc  # 直接啟動 Gemini
```

---

## 🆘 需要幫助？

### 快速故障排除

| 問題 | 解決方案 |
|------|----------|
| "Gemini CLI is not installed" | `npm install -g @google/gemini-cli` |
| "dist/cli.js not found" | `cd leapcode-cli && npm run build` |
| "API key not found" | `export GEMINI_API_KEY="your-key"` |
| 其他問題 | 查看 `USAGE_GUIDE.md` 的故障排除章節 |

### 查看詳細日誌

```bash
DEBUG=* node dist/cli.js gemini --offline
```

---

## 🎉 準備好了嗎？

### 一行命令開始使用：

```bash
export GEMINI_API_KEY="your-key" && cd ~/workspace/jimmyliao/leapcode && ./quick-start.sh
```

---

## 📞 更多資源

- **夜間開發總結**: `.agents/collaboration/NIGHT_SUMMARY.md`
- **完整進度報告**: `~/.agents/leapdesign/oss/progress/`
- **AI 協作文檔**: `.agents/collaboration/`

---

**LeapCode v0.1.0 - 讓 AI 編程工具隨時隨地可用！** 🚀

**現在開始使用吧！** 👉 `cat README_USAGE.md`
