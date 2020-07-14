#!/bin/bash
set -e

find /usr/share/nginx/html -name '*.js' | xargs sed -i "s PLACEHOLDER_API_HOST $PLACEHOLDER_API_HOST g"
find /usr/share/nginx/html -name '*.js' | xargs sed -i "s PLACEHOLDER_CLIENT_ID $PLACEHOLDER_CLIENT_ID g"
find /usr/share/nginx/html -name '*.js' | xargs sed -i "s PLACEHOLDER_CLIENT_SECRET $PLACEHOLDER_CLIENT_SECRET g"
find /usr/share/nginx/html -name '*.js' | xargs sed -i "s PLACEHOLDER_STATIC_RESOURCES_URL $PLACEHOLDER_STATIC_RESOURCES_URL g"

exec "$@"
