'use strict';

var nextLimit = function () {

    return parseInt((Math.random() * 5) + 5, 10);

};

var config = require('./../config');
var slackClient = require('slack-client');
var RtmClient = slackClient.RtmClient;
var RTM_EVENTS = slackClient.RTM_EVENTS;
var RTM_MESSAGE_SUBTYPES = slackClient.RTM_MESSAGE_SUBTYPES;
var token = 'xoxb-31735152998-FyaXBNNVWzJ02aqkbqpWtp5t';

var rtm = new RtmClient(token);
var messagesLimit = nextLimit();
var messageCount = 0;

//messaggi
rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {

    var channelId = message.channel;

    if (message.subtype === RTM_MESSAGE_SUBTYPES.MESSAGE_CHANGED) {

        var dice = Math.floor(Math.random() * 24) + 1;

        if (dice % 24 === 0){
            rtm.sendMessage('Pecchè hai mudificato il testoo? Non capisco...', channelId);
        }

    } else {

        //messaggi personali
        if (message.text.indexOf('<@U0XMM4GVC>') !== -1) {

            if (message.text.indexOf('lunedì') !== -1) {
                
                rtm.sendMessage('Buon lunedì, stronzi!', config.channels.general);

            } else {

                var randomValue = nextLimit();

                var timeoutValue = Math.floor((Math.random() * 5000) + 1001);

                setTimeout(function () {
                    switch (randomValue % 5) {
                        case 0:
                            rtm.sendMessage('<@' + message.user + '>comu sini?', channelId);
                            break;

                        case 1:
                            rtm.sendMessage('pito!', channelId);
                            rtm.sendMessage('minchia...', channelId);
                            break;

                        case 2:
                            rtm.sendMessage('kitinnipari? <@' + message.user + '>', channelId);
                            break;

                        case 3:
                            rtm.sendMessage('mi presti neuru e nta pausa pranzu tu tonnu?', channelId);
                            break;

                        default:
                            rtm.sendMessage('in bokka al lupo per la vita', channelId);

                    }
                }, timeoutValue);

            }


        }

        //risposte varie
        if (message.text.toLowerCase().indexOf('bye') !== -1) {
            rtm.sendMessage('in gambissima, byeeee', channelId);

        }

        if (message.text.toLowerCase().indexOf('ciao') !== -1) {
            rtm.sendMessage('Ciau', channelId);

        }

        if (message.text.toLowerCase().indexOf('suca modena') !== -1) {
            rtm.sendMessage('Suca modena', channelId);

        }

    }


    if (channelId === config.channels.general) {
        messageCount++;

        if (messageCount === messagesLimit) {
            messageCount = 0;
            messagesLimit = nextLimit();
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
