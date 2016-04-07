cd /var/lib/openshift/5704e6312d527173c50000d5/app-deployments/testapp/tommy && git pull
killall node
echo "launching node" 
node /var/lib/openshift/5704e6312d527173c50000d5/app-deployments/testapp/tommy/slack.js
