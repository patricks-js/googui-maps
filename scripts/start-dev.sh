#!/usr/bin/env bash

concurrently -n @maps/server,@maps/desktop -c cyan,magenta \
  "pnpm --filter @maps/server run dev" \
  "pnpm --filter @maps/desktop run dev"
