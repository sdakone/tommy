echo “kill node”
killall node

echo “git pull”
 cd /var/lib/openshift/5704e6312d527173c50000d5/app-deployments/testapp/tommy
 git pull 

echo “node slack”
node /var/lib/openshift/5704e6312d527173c50000d5/app-deployments/testapp/tommy/slack.js
