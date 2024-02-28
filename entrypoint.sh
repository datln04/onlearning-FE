#!/bin/sh

ENV_JS_DIR="/usr/share/nginx/html/static/js"

replaceholder()
{
  file=$1
  echo $file
  while read -r line || [ -n "$line" ];
  do
    if printf '%s\n' "$line" | grep -q -e '='; then
      varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    fi
    value=$(eval "echo \"\$$varname\"")
    [ -z $value ] && value=${varvalue}
    sed -i s,\${$varname},$value,g $file
    echo "Found environment variable $varname: \"$value\""
  done < .pattern-env
}

for file in "$ENV_JS_DIR"/*.js /usr/share/nginx/html/index.html; do
  replaceholder $file
done

echo "Start NGINX server."
nginx -g "daemon off;"
