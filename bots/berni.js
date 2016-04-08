'use strict';

var config = require('./../config');
var slackClient = require('slack-client');
var RtmClient = slackClient.RtmClient;
var RTM_EVENTS = slackClient.RTM_EVENTS;
var CLIENT_EVENTS = slackClient.CLIENT_EVENTS.RTM;
var token = 'xoxb-33093322389-R6FufLMkMixrkwwA8G66k8Ad';

var rtm = new RtmClient(token);

rtm.on(CLIENT_EVENTS.RTM_CONNECTION_OPENED, function handleRtmMessage() {});

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {

    var channelId = message.channel;
    var dice = Math.floor(Math.random() * 12) + 1;

    if (dice % 12 === 0){

        rtm.sendMessage('Minchia <@' + message.user + '>, ti spacco!', message.channel);

    }

if (message.subtype=='message_changed') {
       

    }else{

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
