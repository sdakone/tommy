'use strict';

var nextLimit = function () {

    return parseInt((Math.random() * 5) + 5, 10);

};

var config = require('./../config');
var slackClient = require('slack-client');
var RtmClient = slackClient.RtmClient;
var RTM_EVENTS = slackClient.RTM_EVENTS;
var CLIENT_EVENTS = slackClient.CLIENT_EVENTS.RTM;
var token = 'xoxb-31735152998-FyaXBNNVWzJ02aqkbqpWtp5t';

var rtm = new RtmClient(token);

var messagesLimit = nextLimit();
var messageCount = 0;

rtm.on(CLIENT_EVENTS.RTM_CONNECTION_OPENED, function handleRtmMessage() {

    rtm.sendMessage('Next message in. ' + messagesLimit + ' :+1::skin-tone-3:', config.channels.tombot);

});

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {

    var channelId = message.channel;

    if (message.text.indexOf('<@U0XMM4GVC>') !== -1) {

        var randomValue = nextLimit();

        if (randomValue % 2 === 0) {
            
            rtm.sendMessage('<@' + message.user + '> comu sini?', channelId);
            
        } 
        // else {
        //    
        //     rtm.sendMessage('<@' + message.user + '> pito', channelId,function(){
        //
        //         rtm.sendMessage('<@' + message.user + '> minchia', channelId);
        //        
        //     });
        //    
        // }
        
    }

    if (channelId === config.channels.general) {
        messageCount++;

        if (messageCount === messagesLimit) {

            messageCount = 0;
            messagesLimit = nextLimit();
            rtm.sendMessage('Next message in.... ' + messagesLimit + ' :+1::skin-tone-2:', config.channels.tombot);
            rtm.sendMessage('Non ho capito! :confused:', channelId);

        }

    }

});

rtm.on(RTM_EVENTS.REACTION_ADDED, function handleRtmReactionAdded() {
    //console.log('Reaction added:', reaction);
});

rtm.on(RTM_EVENTS.REACTION_REMOVED, function handleRtmReactionRemoved() {
    //console.log('Reaction removed:', reaction);
});

module.exports = rtm;
