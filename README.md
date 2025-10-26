# LeapCode

**Multi-AI Coding CLI Wrapper** - Connect Gemini, Claude Code, and Codex from anywhere

[![Version](https://img.shields.io/badge/version-0.2.0-blue.svg)](https://github.com/jimmyliao/leapcode)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)

---

## 🚀 Quick Start

### Installation

```bash
npm install -g @jimmyliao/leapcode
```

### Usage

```bash
# Gemini CLI (default)
export GEMINI_API_KEY="your-api-key"
leapcode gemini

# Claude Code
export ANTHROPIC_API_KEY="your-api-key"
leapcode claude

# Codex
export OPENAI_API_KEY="your-api-key"
leapcode codex
```

---

## 📖 What is LeapCode?

LeapCode wraps popular AI coding tools (Gemini CLI, Claude Code, Codex) to provide:

- ✅ **Unified Interface**: One CLI for all AI tools
- ✅ **I/O Interception**: Capture and sync AI interactions
- ✅ **Offline First**: Works without server connection
- ✅ **Optional Sync**: Sync to mobile devices (optional)
- ✅ **End-to-End Encryption**: Secure communication (when syncing)

---

## 🏗️ Architecture

LeapCode is a monorepo containing:

```
leapcode/
├── packages/
│   ├── cli/          📦 Main CLI (公開)
│   ├── core/         📦 Shared types and utilities (公開)
│   ├── sync/         📦 WebSocket sync client (私有)
│   └── server/       📦 Sync server (私有)
└── apps/
    └── mobile/       📱 Mobile app (未來)
```

### Packages

| Package | Description | Published |
|---------|-------------|-----------|
| `@jimmyliao/leapcode` | Main CLI package | ✅ Public |
| `@jimmyliao/leapcode-core` | Shared types & utilities | ✅ Public |
| `@jimmyliao/leapcode-sync` | WebSocket client | ❌ Private |
| `@jimmyliao/leapcode-server` | Sync server | ❌ Private |

---

## 💻 Development

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Setup

```bash
# Clone repository
git clone https://github.com/jimmyliao/leapcode.git
cd leapcode

# Install dependencies
npm install

# Build all packages
npm run build
```

### Monorepo Structure

This project uses **npm workspaces** for monorepo management.

```bash
# Build all packages
npm run build

# Run tests
npm run test

# Lint code
npm run lint

# Clean build artifacts
npm run clean
```

### Quick Start Script

```bash
# Start Gemini CLI
./quick-start.sh gemini

# Start Claude Code
./quick-start.sh claude

# Start Codex
./quick-start.sh codex
```

---

## 📚 Documentation

- [START_HERE.md](START_HERE.md) - 從這裡開始
- [USAGE_GUIDE.md](USAGE_GUIDE.md) - 完整使用指南
- [DEMO.md](DEMO.md) - 詳細演示
- [README_USAGE.md](README_USAGE.md) - 快速使用指南
- [Architecture Review](.agents/collaboration/architecture-review.md) - 架構設計文檔

---

## 🔧 CLI Commands

```bash
# Start AI tool wrapper
leapcode <aiTool> [options]

Options:
  -s, --server <url>   LeapCode server URL
  --offline            Run without sync (default)
  --api-key <key>      AI API key
  -h, --help           Display help
  -V, --version        Display version

# Configuration management
leapcode config set <key> <value>
leapcode config get <key>
leapcode config list
```

---

## 🔐 Environment Variables

```bash
# AI API Keys
export GEMINI_API_KEY="your-gemini-api-key"
export ANTHROPIC_API_KEY="your-anthropic-api-key"
export OPENAI_API_KEY="your-openai-api-key"

# Optional: Server URL
export LEAPCODE_SERVER="https://api.leapcode.dev"
```

---

## 📦 Publishing

### Publish CLI to npm

```bash
# Dry run
npm publish -w @jimmyliao/leapcode --dry-run

# Publish
npm publish -w @jimmyliao/leapcode --access public
```

### Publish Core to npm

```bash
npm publish -w @jimmyliao/leapcode-core --access public
```

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

---

## 👤 Author

**Jimmy Liao** <jimmyliao@jimmyliao.net>

- GitHub: [@jimmyliao](https://github.com/jimmyliao)

---

## 🙏 Acknowledgments

- Inspired by [Happy Coder](https://github.com/slopus/happy)
- Built for the AI coding community

---

**LeapCode v0.2.0** - Making AI coding tools accessible everywhere! 🚀
