# LeapCode 發布準備檢查清單 / Publishing Preparation Checklist

**版本 / Version**: 0.2.0
**日期 / Date**: 2025-10-26
**狀態 / Status**: 🔄 準備中 / In Preparation

---

## ✅ 已完成項目 / Completed Items

### 程式碼 / Code
- [x] 所有功能已實作 / All features implemented
- [x] Claude/Codex 標記為規劃中 / Claude/Codex marked as planned
- [x] 版本檢查修復 / Version check fixed
- [x] 所有套件建構成功 / All packages build successfully
- [x] TypeScript 編譯無錯誤 / TypeScript compiles without errors

### 文件 / Documentation
- [x] 英文 README 完整 / English README complete
- [x] 繁體中文 README 完整 / Traditional Chinese README complete
- [x] 語言切換連結正常 / Language switcher links working
- [x] CLI 使用說明完整 / CLI usage documentation complete
- [x] API 文件完整 / API documentation complete
- [x] 發布指南已建立 / Publishing guide created

### Git
- [x] Git repository 已初始化 / Git repository initialized
- [x] 已推送到 GitHub / Pushed to GitHub
- [x] 最新 commit 包含所有變更 / Latest commit includes all changes
- [x] Repository URL 正確 / Repository URL correct

### Package.json 設定 / Package.json Configuration
- [x] 套件名稱正確 / Package name correct: `@jimmyliao/leapcode`
- [x] 版本號正確 / Version correct: `0.2.0`
- [x] 授權正確 / License correct: `MIT`
- [x] Repository URL 設定 / Repository URL set
- [x] bin 設定正確 / bin configuration correct
- [x] publishConfig 設定 / publishConfig set to public
- [x] 關鍵字完整 / Keywords complete
- [x] engines 設定 / engines requirement set (Node >= 18.0.0)

---

## 🔄 待辦事項 / Pending Items

### npm 帳號設定 / npm Account Setup
- [ ] **登入 npm**
  ```bash
  npm login
  ```
  - [ ] 輸入使用者名稱
  - [ ] 輸入密碼
  - [ ] 輸入電子郵件
  - [ ] 輸入 2FA 碼（如已啟用）

- [ ] **驗證登入**
  ```bash
  npm whoami
  # 應顯示您的 npm 使用者名稱
  ```

- [ ] **檢查 @jimmyliao scope 權限**
  - 確認您有權限發布到 `@jimmyliao` scope
  - 或考慮使用個人 scope `@yourusername`

### 發布前測試 / Pre-publish Testing
- [ ] **測試 Core 套件內容**
  ```bash
  cd packages/core
  npm pack --dry-run
  ```
  檢查輸出，確認包含：
  - dist/ 目錄
  - package.json
  - README.md 和 README.zh-TW.md
  - LICENSE

- [ ] **測試 CLI 套件內容**
  ```bash
  cd packages/cli
  npm pack --dry-run
  ```
  檢查輸出，確認包含：
  - dist/cli.js（executable）
  - dist/ 其他檔案
  - package.json
  - README.md 和 README.zh-TW.md
  - LICENSE

- [ ] **本地測試安裝**
  ```bash
  # 在 core 目錄
  npm pack
  # 會產生 jimmyliao-leapcode-core-0.2.0.tgz

  # 在 cli 目錄
  npm pack
  # 會產生 jimmyliao-leapcode-0.2.0.tgz

  # 測試安裝
  npm install -g ./jimmyliao-leapcode-0.2.0.tgz
  leapcode --version
  leapcode --help
  ```

### 發布步驟 / Publishing Steps

#### 步驟 1：發布 Core 套件
- [ ] **確認在 packages/core 目錄**
  ```bash
  cd packages/core
  pwd  # 應顯示 .../leapcode/packages/core
  ```

- [ ] **發布 Core**
  ```bash
  npm publish --access public
  ```
  預期輸出：`+ @jimmyliao/leapcode-core@0.2.0`

- [ ] **驗證 Core 發布**
  ```bash
  npm view @jimmyliao/leapcode-core
  ```

- [ ] **等待 npm registry 同步**（約 1-2 分鐘）

#### 步驟 2：更新 CLI 依賴
- [ ] **更新 CLI package.json**
  ```bash
  cd ../cli
  ```

  選項 A：手動編輯 package.json
  ```json
  "dependencies": {
    "@jimmyliao/leapcode-core": "^0.2.0",  // 從 "*" 改為 "^0.2.0"
    ...
  }
  ```

  選項 B：使用 npm 安裝
  ```bash
  npm install @jimmyliao/leapcode-core@latest
  ```

- [ ] **重新建構 CLI**
  ```bash
  npm run build
  ```

#### 步驟 3：發布 CLI 套件
- [ ] **確認在 packages/cli 目錄**
  ```bash
  pwd  # 應顯示 .../leapcode/packages/cli
  ```

- [ ] **發布 CLI**
  ```bash
  npm publish --access public
  ```
  預期輸出：`+ @jimmyliao/leapcode@0.2.0`

- [ ] **驗證 CLI 發布**
  ```bash
  npm view @jimmyliao/leapcode
  ```

---

## ✅ 發布後驗證 / Post-publish Verification

### 安裝測試 / Installation Testing
- [ ] **全域安裝測試**
  ```bash
  # 移除本地版本
  npm uninstall -g @jimmyliao/leapcode

  # 安裝已發布版本
  npm install -g @jimmyliao/leapcode

  # 驗證版本
  leapcode --version  # 應顯示 0.2.0

  # 測試說明
  leapcode --help

  # 測試 Claude（應顯示規劃中訊息）
  leapcode claude

  # 測試 Codex（應顯示規劃中訊息）
  leapcode codex
  ```

- [ ] **npx 測試**
  ```bash
  npx @jimmyliao/leapcode --version
  npx @jimmyliao/leapcode --help
  npx @jimmyliao/leapcode claude
  ```

- [ ] **Gemini CLI 測試**（如有 API key）
  ```bash
  export GEMINI_API_KEY="your-key"
  leapcode gemini
  # 應該啟動 Gemini CLI 包裝器
  ```

### npm 網站驗證 / npm Website Verification
- [ ] **檢查 Core 套件頁面**
  - 訪問：https://www.npmjs.com/package/@jimmyliao/leapcode-core
  - [ ] README 顯示正確
  - [ ] 版本號正確（0.2.0）
  - [ ] 依賴列表正確
  - [ ] 授權顯示為 MIT

- [ ] **檢查 CLI 套件頁面**
  - 訪問：https://www.npmjs.com/package/@jimmyliao/leapcode
  - [ ] README 顯示正確（雙語連結可見）
  - [ ] 版本號正確（0.2.0）
  - [ ] 依賴列表正確（包含 @jimmyliao/leapcode-core）
  - [ ] bin 命令顯示（leapcode）
  - [ ] 授權顯示為 MIT

### GitHub 驗證 / GitHub Verification
- [ ] **檢查 GitHub repository**
  - 訪問：https://github.com/jimmyliao/leapcode
  - [ ] README.md 顯示正確
  - [ ] 語言切換連結有效
  - [ ] 雙語文件都可訪問
  - [ ] 最新 commit 已推送

---

## 📊 發布資訊 / Publishing Information

### 套件 URL / Package URLs
| 套件 | npm URL | GitHub |
|------|---------|--------|
| Core | https://www.npmjs.com/package/@jimmyliao/leapcode-core | https://github.com/jimmyliao/leapcode/tree/main/packages/core |
| CLI | https://www.npmjs.com/package/@jimmyliao/leapcode | https://github.com/jimmyliao/leapcode/tree/main/packages/cli |

### 安裝命令 / Installation Commands
```bash
# 全域安裝 / Global installation
npm install -g @jimmyliao/leapcode

# 或使用 npx / Or use npx
npx @jimmyliao/leapcode gemini
```

### 版本資訊 / Version Information
- **Current Version**: 0.2.0
- **Node.js Requirement**: >= 18.0.0
- **License**: MIT

---

## 🚨 疑難排解 / Troubleshooting

### 常見問題 / Common Issues

1. **無法登入 npm**
   - 確認網路連線
   - 確認 npm 帳號已建立
   - 嘗試 `npm logout` 後重新 `npm login`

2. **發布權限錯誤**
   - 確認您擁有 @jimmyliao scope 權限
   - 或改用個人 scope：在 package.json 將 `@jimmyliao` 改為 `@yourusername`

3. **依賴找不到**
   - 確保先發布 core 套件
   - 等待幾分鐘讓 npm registry 同步
   - 檢查 package.json 中的依賴版本

4. **版本衝突**
   - 如果版本已存在，更新版本號：
     ```bash
     npm version patch  # 0.2.0 -> 0.2.1
     ```

---

## 📝 發布記錄 / Publishing Log

### v0.2.0 (待發布 / Pending)

**發布日期 / Publish Date**: _待定 / TBD_

**變更內容 / Changes**:
- 初始發布 / Initial release
- Gemini CLI 支援 / Gemini CLI support
- 雙語文件 / Bilingual documentation
- Claude/Codex 標記為規劃中 / Claude/Codex marked as planned

**發布者 / Publisher**: _待定 / TBD_

**發布命令記錄 / Publishing Command Log**:
```bash
# 記錄實際使用的命令和結果
# Log actual commands used and results

# Core 發布 / Core publish:
# [待填寫 / To be filled]

# CLI 發布 / CLI publish:
# [待填寫 / To be filled]
```

---

## 🎯 下次發布準備 / Next Release Preparation

當準備下一個版本時：

1. **更新版本號**
   ```bash
   # 在 packages/core 和 packages/cli
   npm version patch  # 或 minor/major
   ```

2. **更新 CHANGELOG.md**（考慮建立）
   - 記錄所有變更
   - 列出新功能、修復和破壞性變更

3. **建構和測試**
   ```bash
   npm run build
   # 執行所有測試
   ```

4. **發布**
   - 重複上述發布步驟

5. **Git 標籤**
   ```bash
   git tag v0.2.1
   git push origin v0.2.1
   ```

---

**檢查清單建立時間**: 2025-10-26
**最後更新**: 2025-10-26
**維護者**: Jimmy Liao <jimmyliao@jimmyliao.net>
