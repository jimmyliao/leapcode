# LeapCode 雙語文件說明 / Bilingual Documentation Guide

**日期**: 2025-10-26
**版本**: 0.2.0

---

## 📚 文件結構 / Document Structure

LeapCode 現在提供**英文**與**繁體中文**雙語文件。

LeapCode now provides documentation in both **English** and **Traditional Chinese**.

---

## 🌐 語言切換 / Language Switcher

每個 README 檔案頂部都有語言切換連結：

Every README file has a language switcher at the top:

```markdown
**English** | [繁體中文](README.zh-TW.md)
```

或 / Or:

```markdown
[English](README.md) | **繁體中文**
```

---

## 📂 檔案清單 / File List

### 主要文件 / Main Documentation

| 英文版本 (English) | 繁體中文版本 (Traditional Chinese) | 說明 (Description) |
|-------------------|-----------------------------------|-------------------|
| [README.md](README.md) | [README.zh-TW.md](README.zh-TW.md) | 主要專案說明 / Main project README |

### CLI 套件文件 / CLI Package Documentation

| 英文版本 (English) | 繁體中文版本 (Traditional Chinese) | 說明 (Description) |
|-------------------|-----------------------------------|-------------------|
| [packages/cli/README.md](packages/cli/README.md) | [packages/cli/README.zh-TW.md](packages/cli/README.zh-TW.md) | CLI 套件說明 / CLI package README |

### Core 套件文件 / Core Package Documentation

| 英文版本 (English) | 繁體中文版本 (Traditional Chinese) | 說明 (Description) |
|-------------------|-----------------------------------|-------------------|
| [packages/core/README.md](packages/core/README.md) | [packages/core/README.zh-TW.md](packages/core/README.zh-TW.md) | Core 套件說明 / Core package README |

---

## 📝 單語文件 / Monolingual Documents

以下文件目前僅提供英文版本：

The following documents are currently available in English only:

- [START_HERE.md](START_HERE.md) - 快速導覽 / Quick navigation
- [USAGE_GUIDE.md](USAGE_GUIDE.md) - 完整使用指南 / Complete usage guide
- [DEMO.md](DEMO.md) - 詳細演示 / Detailed demonstration
- [README_USAGE.md](README_USAGE.md) - 快速使用指南 / Quick usage guide
- [CLEANUP_COMPLETE.md](CLEANUP_COMPLETE.md) - 清理完成報告 / Cleanup completion report
- [TESTING_RESULTS.md](TESTING_RESULTS.md) - 測試結果 / Testing results

---

## 🎯 翻譯規範 / Translation Guidelines

### 術語對照 / Terminology

| English | 繁體中文 | 備註 (Notes) |
|---------|---------|-------------|
| Multi-AI Coding CLI Wrapper | 多 AI 編程 CLI 包裝器 | 專案名稱副標題 |
| Installation | 安裝 | |
| Usage | 使用方式 | |
| Quick Start | 快速開始 | |
| Configuration | 設定 | |
| Architecture | 架構 | |
| Package | 套件 | npm package |
| Available | 可用 | ✅ 標記 |
| Planned | 規劃中 | 📋 標記 |
| Environment Variables | 環境變數 | |
| Prerequisites | 前置需求 | |
| License | 授權 | |
| Contributing | 貢獻 | |

### 特殊標記保留 / Special Markers Retained

以下標記在中英文中保持一致：

The following markers are consistent across both languages:

- ✅ (可用 / Available)
- 📋 (規劃中 / Planned)
- 🚀 (快速開始 / Quick Start)
- 📖 (文件 / Documentation)
- 🔧 (設定 / Configuration)
- 💻 (開發 / Development)
- 📦 (套件 / Package)

---

## 🔄 更新流程 / Update Process

當更新文件時，請遵循以下流程：

When updating documentation, please follow this process:

1. **英文優先 / English First**: 先更新英文版本
2. **同步翻譯 / Sync Translation**: 立即更新對應的繁體中文版本
3. **驗證連結 / Verify Links**: 確認語言切換連結正常運作
4. **內容一致 / Content Consistency**: 確保兩個版本內容同步

---

## 📊 文件覆蓋率 / Documentation Coverage

| 類型 (Type) | 英文 (English) | 繁體中文 (Traditional Chinese) | 覆蓋率 (Coverage) |
|------------|----------------|-------------------------------|------------------|
| 主要 README | ✅ | ✅ | 100% |
| CLI 套件 | ✅ | ✅ | 100% |
| Core 套件 | ✅ | ✅ | 100% |
| 使用指南 | ✅ | ❌ | 0% |
| 演示文件 | ✅ | ❌ | 0% |
| 技術報告 | ✅ | ❌ | 0% |

**總覆蓋率 (Total Coverage)**: ~37% (3/8 核心文件)

---

## 🎯 未來計畫 / Future Plans

### 短期 (Short-term)
- [ ] 翻譯 START_HERE.md
- [ ] 翻譯 USAGE_GUIDE.md
- [ ] 翻譯 DEMO.md

### 中期 (Mid-term)
- [ ] 自動化翻譯檢查工具
- [ ] CI/CD 整合語言一致性檢查
- [ ] 社群貢獻翻譯指南

### 長期 (Long-term)
- [ ] 支援更多語言（簡體中文、日文等）
- [ ] 建立翻譯管理系統
- [ ] 多語言文件生成工具

---

## 🤝 貢獻翻譯 / Contributing Translations

如果您想貢獻翻譯：

If you would like to contribute translations:

1. 選擇需要翻譯的文件 / Choose a document to translate
2. 建立對應的 `.zh-TW.md` 檔案 / Create a corresponding `.zh-TW.md` file
3. 參考現有翻譯的術語對照 / Refer to existing terminology mappings
4. 新增語言切換連結 / Add language switcher links
5. 提交 Pull Request / Submit a Pull Request

---

## 📄 授權 / License

所有文件遵循 MIT 授權。

All documentation follows the MIT License.

---

**建立日期 (Created)**: 2025-10-26
**維護者 (Maintainer)**: Jimmy Liao <jimmyliao@jimmyliao.net>
