#!/bin/bash
echo "🧹 Cleaning containers and volumes";
OUTPUT=$(docker-compose -f docker/docker-compose.yaml --env-file docker/.env down -v > /dev/null 2>&1);

if [ $? -eq 0 ]; then 
    echo "✅ Cleaning complete";
else
    echo "❌ Failed to clean containers and volumes, Output:";
    echo "$OUTPUT";
    exit 1;
fi
