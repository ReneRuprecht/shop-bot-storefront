#!/bin/bash

echo "▶️  Starting containers";
OUTPUT=$(docker-compose -f docker/docker-compose.yaml --env-file docker/.env up -d 2>&1);
if [ $? -eq 0 ]; then
    echo "✅ Containers started";
else
    echo "❌ Failed to start containers! Output:";
    echo "$OUTPUT";
    exit 1;
fi
