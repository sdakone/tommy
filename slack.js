var slackClient = require('slack-client');
var WebClient = slackClient.WebClient;
var events = slackClient.CLIENT_EVENTS;

var token = process.env.SLACK_API_TOKEN || 'xoxb-31735152998-FyaXBNNVWzJ02aqkbqpWtp5t';
var web = new WebClient(token);

console.log(events);

web.team.info(function teamInfoCb(err, info) {
    if (err) {
        console.log('Error:', err);
    } else {
        console.log('Team Info:', info);
    }
});