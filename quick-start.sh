#!/bin/bash

# LeapCode CLI 快速啟動腳本 (Monorepo Version)
# 使用方式: ./quick-start.sh [gemini|claude|codex]

set -e

# 顏色定義
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 項目路徑
CLI_DIR="$HOME/workspace/jimmyliao/leapcode/packages/cli"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🚀 LeapCode CLI 快速啟動 (Monorepo)${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 檢查 CLI 目錄
if [ ! -d "$CLI_DIR" ]; then
    echo -e "${RED}❌ 找不到 CLI 目錄: $CLI_DIR${NC}"
    exit 1
fi

cd "$CLI_DIR"

# 檢查是否已構建
if [ ! -f "dist/cli.js" ]; then
    echo -e "${YELLOW}⚠️  尚未構建，正在構建...${NC}"
    cd ../..
    npm install
    npm run build
    cd "$CLI_DIR"
    echo -e "${GREEN}✅ 構建完成${NC}"
    echo ""
fi

# 獲取 AI 工具參數
AI_TOOL=${1:-gemini}

echo -e "${BLUE}📦 AI 工具: $AI_TOOL${NC}"
echo ""

# 檢查環境變數
case $AI_TOOL in
    gemini)
        if [ -z "$GEMINI_API_KEY" ]; then
            echo -e "${YELLOW}⚠️  未設置 GEMINI_API_KEY 環境變數${NC}"
            echo -e "${YELLOW}   請使用: export GEMINI_API_KEY=\"your-key\"${NC}"
            echo ""
        else
            echo -e "${GREEN}✅ GEMINI_API_KEY 已設置${NC}"
            echo ""
        fi
        ;;
    claude)
        if [ -z "$ANTHROPIC_API_KEY" ]; then
            echo -e "${YELLOW}⚠️  未設置 ANTHROPIC_API_KEY 環境變數${NC}"
            echo -e "${YELLOW}   請使用: export ANTHROPIC_API_KEY=\"your-key\"${NC}"
            echo ""
        else
            echo -e "${GREEN}✅ ANTHROPIC_API_KEY 已設置${NC}"
            echo ""
        fi
        ;;
    codex)
        if [ -z "$OPENAI_API_KEY" ]; then
            echo -e "${YELLOW}⚠️  未設置 OPENAI_API_KEY 環境變數${NC}"
            echo -e "${YELLOW}   請使用: export OPENAI_API_KEY=\"your-key\"${NC}"
            echo ""
        else
            echo -e "${GREEN}✅ OPENAI_API_KEY 已設置${NC}"
            echo ""
        fi
        ;;
esac

# 啟動 LeapCode CLI
echo -e "${GREEN}🎬 啟動 LeapCode CLI...${NC}"
echo ""

node dist/cli.js "$AI_TOOL" --offline
