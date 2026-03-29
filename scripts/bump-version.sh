#!/usr/bin/env bash
set -e

BUMP_TYPE=${1:-patch}

if [[ "$BUMP_TYPE" != "patch" && "$BUMP_TYPE" != "minor" && "$BUMP_TYPE" != "major" ]]; then
  echo "Error: Invalid bump type. Use patch, minor, or major."
  exit 1
fi

echo "Bumping $BUMP_TYPE version..."

# Use npm version to update package.json version and create a git commit + tag
# Ensure we are in the web directory if package.json is there, otherwise adjust
if [ -f "package.json" ]; then
  npm version "$BUMP_TYPE" -m "chore(release): bump version to %s"
elif [ -f "web/package.json" ]; then
  cd web
  npm version "$BUMP_TYPE" -m "chore(release): bump version to %s"
else
  echo "Error: package.json not found."
  exit 1
fi

echo "Version bumped successfully."
echo "Remember to push tags: git push origin --tags"
