'use strict';

var slackClient = require('slack-client');
var RtmClient = slackClient.RtmClient;
var RTM_EVENTS = slackClient.RTM_EVENTS;

var channels = {
    tombot: 'C0XNDQLE7'
};

var token = process.env.SLACK_API_TOKEN || 'xoxb-31735152998-FyaXBNNVWzJ02aqkbqpWtp5t';
var rtm = new RtmClient(token, {logLevel: 'debug'});
rtm.start();

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {

    console.log('Message:', message);
    console.log(message.channel === channels.tombot);

    if (message.channel === channels.tombot) {
        console.log('sending message');
        var channel = rtm.getChannelGroupOrDMByID(message.channel);
        console.log(channel);
        channel.send('Non ho capito! :/');
    }
});

rtm.on(RTM_EVENTS.REACTION_ADDED, function handleRtmReactionAdded(reaction) {
    //console.log('Reaction added:', reaction);
});

rtm.on(RTM_EVENTS.REACTION_REMOVED, function handleRtmReactionRemoved(reaction) {
    //console.log('Reaction removed:', reaction);
});