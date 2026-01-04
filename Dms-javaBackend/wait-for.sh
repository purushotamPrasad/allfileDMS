#!/bin/sh

set -e

if [ -z "$WAIT_FOR" ]; then
  exec "$@"
fi

for host in $(echo $WAIT_FOR | tr "," " "); do
  service=$(echo $host | cut -d: -f1)
  port=$(echo $host | cut -d: -f2)

  echo "Waiting for $service:$port..."
  while ! nc -z $service $port; do
    sleep 2
  done
done

echo "All dependencies are available. Starting app..."
exec "$@"

