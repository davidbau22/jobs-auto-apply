#!/bin/sh
PROJECT_ROOT=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
export PATH="$PROJECT_ROOT/.tools/node/bin:$PROJECT_ROOT/.tools/gh/bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH="$PROJECT_ROOT/.local/browsers"
export npm_config_cache="$PROJECT_ROOT/.local/npm-cache"
export GH_CONFIG_DIR="$PROJECT_ROOT/.local/gh"
cd "$PROJECT_ROOT" || exit 1
