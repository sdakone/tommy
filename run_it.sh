echo “kill node”
killall node

echo “git pull”
git pull

echo “node slack”
node slack.js
