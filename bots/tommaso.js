'use strict';

var nextLimit = function () {

    return parseInt((Math.random() * 30) + 30, 10);

};

var config = require('./../config');
var slackClient = require('slack-client');
var RtmClient = slackClient.RtmClient;
var RTM_EVENTS = slackClient.RTM_EVENTS;
var RTM_MESSAGE_SUBTYPES = slackClient.RTM_MESSAGE_SUBTYPES;
var token = process.env.SLACK_BOT_TOMMASO_TOKEN;



var rtm = new RtmClient(token);

//messaggi
rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {

    var channelId = message.channel;
    var dice = 0;

    if (message.subtype === RTM_MESSAGE_SUBTYPES.MESSAGE_CHANGED) {

        dice = Math.floor(Math.random() * 80) + 1;

        if (dice % 80 === 0) {
            rtm.sendMessage('Pecchè hai mudificato il testoo? Non capisco...', channelId);
        }

    } else {

        //messaggi personali
        if (message.text && message.text.indexOf('<@U0XMM4GVC>') !== -1) {

            if (message.text.indexOf('ripeti') !== -1) {
                var str = message.text;
                var n = str.lastIndexOf('ripeti');
                var result = str.substring(n + 6);

                rtm.sendMessage( result, config.channels.general);

            } else
            if (message.text.indexOf('lunedì') !== -1) {

                rtm.sendMessage('Buon lunedì, stronzi!', config.channels.general);

            } else {

                var randomValue = nextLimit();

                var timeoutValue = Math.floor((Math.random() * 5000) + 1001);

                setTimeout(function () {
                    switch (randomValue % 5) {
                        case 0:
                            rtm.sendMessage('<@' + message.user + '> comu sini?', channelId);
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

        dice = Math.floor(Math.random() * 80) + 1;

        if (dice % 80 === 0) {

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
