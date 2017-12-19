#!/usr/bin/env bash
set -o errexit #abort if any command fails
me=$(basename "$0")

run_build() {
  bundle exec middleman build --clean
}

run_build
