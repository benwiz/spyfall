#!/bin/bash

yarn release
filename=$(jq '.[0]["output-name"]' js/compiled/manifest.json)
filename="${filename%\"}" # strip first quote
filename="${filename#\"}" # strip last quote
echo "new filename is: $filename"
sed -i "s/main\..*\.js/$filename/" index.html # for mac inset `.bak` after the `-i`
cat index.html
git add "js/compiled/$filename"
git add "index.html"
git commit -m "release $filename"
