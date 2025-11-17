#!/bin/bash

CONTAINER_NAME="shopware-app"

echo "📥 Importing demo plugin and data"

docker exec -i $CONTAINER_NAME sh -c "
  apk add git > /dev/null &&
  rm -rf /var/www/html/custom/plugins/SwagPlatformDemoData
"

OUTPUT=$(docker exec -i --user www-data "$CONTAINER_NAME" sh -c '
  cd /var/www/html &&
  git clone https://github.com/shopware/SwagPlatformDemoData.git custom/plugins/SwagPlatformDemoData >/dev/null 2>&1 &&
  php bin/console plugin:refresh >/dev/null 2>&1 &&
  php bin/console plugin:install --activate SwagPlatformDemoData 2>&1
') 

#if plugin is installed successfully or is already installed
PATTERN='1 plugins, 1 installed, 1 active , 0 upgradeable
Plugin "SwagPlatformDemoData" is already installed
Plugin "SwagPlatformDemoData" has been installed and activated successfully.'

PATTERN_ONELINE=$(echo "$PATTERN" | paste -sd "|" -)

if echo "$OUTPUT" | grep -qE "$PATTERN_ONELINE"; then
  echo "✅ Demo plugin successfully installed!"
else
  echo "❌ Demo plugin install failed!"
  echo "$OUTPUT"
  exit 1
fi
