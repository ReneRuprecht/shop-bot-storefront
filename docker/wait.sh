#!/bin/bash

CONTAINER_NAME="shopware-app"
TOTAL_STEPS=25
INTERVAL=10

echo "⏳ Waiting for $CONTAINER_NAME to become healthy"

for STEP in $(seq 1 $TOTAL_STEPS); do
  HEALTH=$(docker inspect --format='{{.State.Health.Status}}' $CONTAINER_NAME)
  echo -ne "\tStep $STEP/$TOTAL_STEPS - Status: $HEALTH\r"

  if [ "$HEALTH" == "healthy" ]; then
    echo ""
    echo "✅ Container is healthy!"
    exit 0
  fi
  sleep $INTERVAL
done

echo "❌ Container is not healthy after $TOTAL_STEPS steps!"
exit 1
