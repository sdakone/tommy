'use strict';

var slackClient = require('slack-client');
var RtmClient = slackClient.RtmClient;
var RTM_EVENTS = slackClient.RTM_EVENTS;

var messagesLimit = parseInt((Math.random() * 10) + 5, 10);
console.log('Next message in ' + messagesLimit);
var channels = {
    tombot:  'C0XNDQLE7',
    general: 'C0WS5Q31N'
};

var token = process.env.SLACK_API_TOKEN || 'xoxb-31735152998-FyaXBNNVWzJ02aqkbqpWtp5t';
var rtm = new RtmClient(token);
rtm.start();

var messageCount = 0;
rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {

    var channelId = message.channel;

    if (channelId === channels.general){
        messageCount++;

        if (messageCount === messagesLimit) {

            messageCount = 0;
            messagesLimit = parseInt((Math.random() * 10) + 5, 10);
            console.log('Next message in ' + messagesLimit);
            rtm.sendMessage('Non ho capito! :/', channelId);

        }

    }

});

rtm.on(RTM_EVENTS.REACTION_ADDED, function handleRtmReactionAdded() {
    //console.log('Reaction added:', reaction);
});

rtm.on(RTM_EVENTS.REACTION_REMOVED, function handleRtmReactionRemoved() {
    //console.log('Reaction removed:', reaction);
});