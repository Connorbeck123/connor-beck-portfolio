#!/bin/sh
# Starts the local dev server using the Node bundled in .tools (no system install needed).
cd "$(dirname "$0")"
export PATH="$PWD/.tools/node/bin:$PATH"

if [ ! -d node_modules ]; then
  npm install
fi

npm run dev
