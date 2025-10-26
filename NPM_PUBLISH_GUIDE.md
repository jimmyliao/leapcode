# LeapCode npm 發布指南 / npm Publishing Guide

**版本 / Version**: 0.2.0
**日期 / Date**: 2025-10-26

[English](#english) | [繁體中文](#繁體中文)

---

## English

### 📋 Prerequisites

1. **npm Account**
   - Create account at https://www.npmjs.com/signup
   - Verify email address
   - Enable 2FA (recommended)

2. **npm Login**
   ```bash
   npm login
   ```
   Enter your username, password, and email.

3. **Organization Access** (if using @jimmyliao scope)
   - Ensure you have publishing rights to `@jimmyliao` scope
   - Or publish under your own scope

4. **Build Verification**
   ```bash
   npm run build
   ```
   All packages should build successfully.

---

### 🚀 Publishing Steps

#### Step 1: Publish Core Package First

The CLI package depends on `@jimmyliao/leapcode-core`, so publish core first:

```bash
# Navigate to core package
cd packages/core

# Verify package contents
npm pack --dry-run

# Publish to npm
npm publish --access public
```

**Expected output:**
```
+ @jimmyliao/leapcode-core@0.2.0
```

**Verify publication:**
```bash
npm view @jimmyliao/leapcode-core
```

---

#### Step 2: Update CLI Package Dependencies

After core is published, update CLI's dependency:

```bash
cd ../cli

# Update package.json to use published version
# Change: "@jimmyliao/leapcode-core": "*"
# To: "@jimmyliao/leapcode-core": "^0.2.0"
```

Or use this command:
```bash
npm install @jimmyliao/leapcode-core@latest
```

---

#### Step 3: Publish CLI Package

```bash
# Verify package contents
npm pack --dry-run

# Publish to npm
npm publish --access public
```

**Expected output:**
```
+ @jimmyliao/leapcode@0.2.0
```

**Verify publication:**
```bash
npm view @jimmyliao/leapcode
```

---

### ✅ Verification

#### Test Global Installation

```bash
# Uninstall any existing version
npm uninstall -g @jimmyliao/leapcode

# Install published version
npm install -g @jimmyliao/leapcode

# Verify installation
leapcode --version
# Should output: 0.2.0

# Test help
leapcode --help

# Test with Gemini (if you have API key)
export GEMINI_API_KEY="your-key"
leapcode gemini
```

#### Test with npx

```bash
npx @jimmyliao/leapcode --version
npx @jimmyliao/leapcode --help
```

---

### 📦 What Gets Published

#### @jimmyliao/leapcode-core
- `dist/` - Compiled JavaScript
- `dist/*.d.ts` - TypeScript definitions
- `package.json`
- `README.md`
- `README.zh-TW.md`
- `LICENSE`

#### @jimmyliao/leapcode (CLI)
- `dist/` - Compiled JavaScript
- `dist/cli.js` - CLI entry point (executable)
- `dist/*.d.ts` - TypeScript definitions
- `package.json`
- `README.md`
- `README.zh-TW.md`
- `LICENSE`

**Excluded** (via .gitignore and .npmignore):
- `node_modules/`
- `src/` (only dist/ is included)
- `*.ts` source files
- Test files
- Development configs

---

### 🔍 Troubleshooting

#### Issue: "You do not have permission to publish"

**Solution:**
```bash
# Check if you're logged in
npm whoami

# Login again
npm login

# Or use a different scope
# Change @jimmyliao to @yourusername in package.json
```

#### Issue: "Package name already exists"

**Solution:**
- Package name must be unique
- Use a different scope: `@yourusername/leapcode`
- Or choose a different name

#### Issue: "Version already exists"

**Solution:**
```bash
# Update version in package.json
npm version patch  # 0.2.0 -> 0.2.1
npm version minor  # 0.2.0 -> 0.3.0
npm version major  # 0.2.0 -> 1.0.0

# Then publish
npm publish --access public
```

#### Issue: "Dependency @jimmyliao/leapcode-core not found"

**Solution:**
- Ensure core package is published first
- Wait a few minutes for npm registry to sync
- Use published version instead of workspace alias

---

### 📊 npm Package Pages

After publishing, your packages will be available at:

- CLI: https://www.npmjs.com/package/@jimmyliao/leapcode
- Core: https://www.npmjs.com/package/@jimmyliao/leapcode-core

---

### 🔄 Updating Published Packages

When you make changes:

1. **Update version**
   ```bash
   npm version patch  # or minor/major
   ```

2. **Rebuild**
   ```bash
   npm run build
   ```

3. **Publish**
   ```bash
   npm publish
   ```

4. **Git tag** (optional but recommended)
   ```bash
   git tag v0.2.1
   git push origin v0.2.1
   ```

---

### 🎯 Post-Publication Checklist

- [ ] Verify package on npmjs.com
- [ ] Test global installation
- [ ] Test npx usage
- [ ] Update README with installation instructions
- [ ] Create GitHub release
- [ ] Announce on social media/blog (optional)

---

## 繁體中文

### 📋 前置需求

1. **npm 帳號**
   - 在 https://www.npmjs.com/signup 建立帳號
   - 驗證電子郵件
   - 啟用 2FA（建議）

2. **npm 登入**
   ```bash
   npm login
   ```
   輸入您的使用者名稱、密碼和電子郵件。

3. **組織存取權限**（如果使用 @jimmyliao scope）
   - 確保您有 `@jimmyliao` scope 的發布權限
   - 或使用您自己的 scope 發布

4. **建構驗證**
   ```bash
   npm run build
   ```
   所有套件應該成功建構。

---

### 🚀 發布步驟

#### 步驟 1：先發布 Core 套件

CLI 套件依賴 `@jimmyliao/leapcode-core`，因此先發布 core：

```bash
# 進入 core 套件目錄
cd packages/core

# 驗證套件內容
npm pack --dry-run

# 發布到 npm
npm publish --access public
```

**預期輸出：**
```
+ @jimmyliao/leapcode-core@0.2.0
```

**驗證發布：**
```bash
npm view @jimmyliao/leapcode-core
```

---

#### 步驟 2：更新 CLI 套件依賴

Core 發布後，更新 CLI 的依賴：

```bash
cd ../cli

# 更新 package.json 使用已發布的版本
# 從: "@jimmyliao/leapcode-core": "*"
# 改為: "@jimmyliao/leapcode-core": "^0.2.0"
```

或使用此命令：
```bash
npm install @jimmyliao/leapcode-core@latest
```

---

#### 步驟 3：發布 CLI 套件

```bash
# 驗證套件內容
npm pack --dry-run

# 發布到 npm
npm publish --access public
```

**預期輸出：**
```
+ @jimmyliao/leapcode@0.2.0
```

**驗證發布：**
```bash
npm view @jimmyliao/leapcode
```

---

### ✅ 驗證

#### 測試全域安裝

```bash
# 移除任何現有版本
npm uninstall -g @jimmyliao/leapcode

# 安裝已發布的版本
npm install -g @jimmyliao/leapcode

# 驗證安裝
leapcode --version
# 應該輸出: 0.2.0

# 測試說明
leapcode --help

# 測試 Gemini（如果有 API key）
export GEMINI_API_KEY="your-key"
leapcode gemini
```

#### 使用 npx 測試

```bash
npx @jimmyliao/leapcode --version
npx @jimmyliao/leapcode --help
```

---

### 📦 發布內容

#### @jimmyliao/leapcode-core
- `dist/` - 編譯後的 JavaScript
- `dist/*.d.ts` - TypeScript 型別定義
- `package.json`
- `README.md`
- `README.zh-TW.md`
- `LICENSE`

#### @jimmyliao/leapcode (CLI)
- `dist/` - 編譯後的 JavaScript
- `dist/cli.js` - CLI 進入點（可執行）
- `dist/*.d.ts` - TypeScript 型別定義
- `package.json`
- `README.md`
- `README.zh-TW.md`
- `LICENSE`

**排除內容**（透過 .gitignore 和 .npmignore）：
- `node_modules/`
- `src/`（只包含 dist/）
- `*.ts` 原始檔案
- 測試檔案
- 開發設定檔

---

### 🔍 疑難排解

#### 問題：「您沒有發布權限」

**解決方案：**
```bash
# 檢查是否已登入
npm whoami

# 重新登入
npm login

# 或使用不同的 scope
# 將 package.json 中的 @jimmyliao 改為 @yourusername
```

#### 問題：「套件名稱已存在」

**解決方案：**
- 套件名稱必須唯一
- 使用不同的 scope：`@yourusername/leapcode`
- 或選擇不同的名稱

#### 問題：「版本已存在」

**解決方案：**
```bash
# 更新 package.json 中的版本
npm version patch  # 0.2.0 -> 0.2.1
npm version minor  # 0.2.0 -> 0.3.0
npm version major  # 0.2.0 -> 1.0.0

# 然後發布
npm publish --access public
```

#### 問題：「找不到依賴 @jimmyliao/leapcode-core」

**解決方案：**
- 確保先發布 core 套件
- 等待幾分鐘讓 npm registry 同步
- 使用已發布的版本而非 workspace 別名

---

### 📊 npm 套件頁面

發布後，您的套件將在以下位置可用：

- CLI: https://www.npmjs.com/package/@jimmyliao/leapcode
- Core: https://www.npmjs.com/package/@jimmyliao/leapcode-core

---

### 🔄 更新已發布的套件

當您進行變更時：

1. **更新版本**
   ```bash
   npm version patch  # 或 minor/major
   ```

2. **重新建構**
   ```bash
   npm run build
   ```

3. **發布**
   ```bash
   npm publish
   ```

4. **Git 標籤**（可選但建議）
   ```bash
   git tag v0.2.1
   git push origin v0.2.1
   ```

---

### 🎯 發布後檢查清單

- [ ] 在 npmjs.com 上驗證套件
- [ ] 測試全域安裝
- [ ] 測試 npx 使用
- [ ] 更新 README 包含安裝說明
- [ ] 建立 GitHub release
- [ ] 在社群媒體/部落格公告（可選）

---

## 📞 支援 / Support

如有問題，請在 GitHub Issues 回報：
https://github.com/jimmyliao/leapcode/issues

---

**維護者 / Maintainer**: Jimmy Liao <jimmyliao@jimmyliao.net>
**授權 / License**: MIT
