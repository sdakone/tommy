'use strict';

var config = require('./../config');
var slackClient = require('slack-client');
var RtmClient = slackClient.RtmClient;
var RTM_EVENTS = slackClient.RTM_EVENTS;
var CLIENT_EVENTS = slackClient.CLIENT_EVENTS.RTM;
var token = process.env.SLACK_BOT_BERNI_TOKEN;

var rtm = new RtmClient(token);

rtm.on(CLIENT_EVENTS.RTM_CONNECTION_OPENED, function handleRtmMessage() {});

function checkMilano(message) {

    var text = null;
    var regexp = new RegExp('([A-Za-z]*?)mi(\\s|$)');
    var textMatch = message.text.match(regexp);

    if (textMatch && textMatch.length > 1) {

        text = textMatch[1] + 'milano' + ' :trollface:';

    }

    return text;

}

function checkShit(message) {

    var text = null;
    var problem = new RegExp('problem');
    var bug = new RegExp('bug');
    var textMatch = problem.test(message.text) || bug.test(message.text);

    if (textMatch) {

        text = 'meeeeeeerda!';

    }

    return text;

}

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {

    var channelId = message.channel;
    var dice = Math.floor(Math.random() * 24) + 1;

    if (dice % 24 === 0 || (message.text && message.text.indexOf('berniTest') !== -1)) {

        var text = 'Minchia <@' + message.user + '>, ti spacco!';

        if (message.text && message.text.length) {

            var milano = checkMilano(message);

            text = milano || text;

        }

        rtm.sendMessage(text, message.channel);

    }

    var shit = checkShit(message);

    if (shit) {
        rtm.sendMessage(shit, message.channel);
    }

    if (message.subtype !== 'message_changed') {

        if (message.text.indexOf('suca modena') !== -1) {
            rtm.sendMessage('Suca modena', channelId);

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
