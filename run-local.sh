#!/bin/sh
. "$(dirname -- "$0")/scripts/env.sh"
case "${1:-help}" in
  help) exec node src/cli.js --help ;;
  check) exec node scripts/check-install.js ;;
  login) exec node scripts/login-linkedin.js ;;
  npm) shift; exec npm "$@" ;;
  gh) shift; exec gh "$@" ;;
  *) exec node src/cli.js "$@" ;;
esac
