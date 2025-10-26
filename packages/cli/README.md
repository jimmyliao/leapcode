# @jimmyliao/leapcode

**Multi-AI Coding CLI Wrapper** - Main CLI package

[![npm version](https://img.shields.io/npm/v/@jimmyliao/leapcode.svg)](https://www.npmjs.com/package/@jimmyliao/leapcode)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)

---

## 🚀 Installation

```bash
npm install -g @jimmyliao/leapcode
```

Or use with npx:

```bash
npx @jimmyliao/leapcode gemini
```

---

## 📖 Usage

### Gemini CLI

```bash
export GEMINI_API_KEY="your-api-key"
leapcode gemini
```

### Claude Code

```bash
export ANTHROPIC_API_KEY="your-api-key"
leapcode claude
```

### Codex

```bash
export OPENAI_API_KEY="your-api-key"
leapcode codex
```

---

## 🔧 Options

```bash
leapcode <aiTool> [options]

Options:
  -s, --server <url>   LeapCode server URL
  --offline            Run without sync (default)
  --api-key <key>      AI API key
  -h, --help           Display help
  -V, --version        Display version
```

---

## 📚 Documentation

See the [main README](../../README.md) for complete documentation.

---

## 🏗️ What's Inside

This package wraps popular AI coding tools to provide:

- **Unified Interface**: One CLI for all AI tools
- **I/O Interception**: Capture AI interactions
- **Offline First**: Works without server connection
- **Optional Sync**: Mobile device synchronization (optional)

---

## 🔗 Related Packages

- [@jimmyliao/leapcode-core](../core) - Shared types and utilities

---

## 📄 License

MIT © [Jimmy Liao](https://github.com/jimmyliao)
