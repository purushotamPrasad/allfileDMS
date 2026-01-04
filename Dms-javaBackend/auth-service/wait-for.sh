#!/bin/sh
set -e
if [ -n "$WAIT_FOR" ]; then
  echo "Waiting for services: $WAIT_FOR"
  for hostport in $(echo $WAIT_FOR | tr ',' ' '); do
    host=$(echo $hostport | cut -d: -f1)
    port=$(echo $hostport | cut -d: -f2)
    echo "Waiting for $host:$port..."
    until nc -z "$host" "$port"; do
      sleep 1
    done
  done
fi
exec "$@"
