#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

PORT="${PORT:-3000}"
URL="http://localhost:${PORT}"

if [ ! -d node_modules ]; then
  echo "→ Installing dependencies..."
  npm install
fi

echo "→ Starting Next.js dev server on ${URL}"
npm run dev -- --port "${PORT}" &
SERVER_PID=$!

cleanup() {
  echo
  echo "→ Stopping dev server (pid ${SERVER_PID})"
  kill "${SERVER_PID}" 2>/dev/null || true
  wait "${SERVER_PID}" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

echo "→ Waiting for server to be ready..."
for _ in $(seq 1 60); do
  if curl -sSf -o /dev/null "${URL}"; then
    break
  fi
  sleep 0.5
done

BRAVE_BIN="$(command -v brave || command -v brave-browser || command -v brave-browser-stable || true)"
if [ -n "${BRAVE_BIN}" ]; then
  echo "→ Opening ${URL} in Brave"
  "${BRAVE_BIN}" "${URL}" >/dev/null 2>&1 &
else
  echo "⚠ Brave not found on PATH. Open ${URL} manually."
fi

wait "${SERVER_PID}"
