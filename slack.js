'use strict';

var config = require('./config');

for (var bot in config.bots) {

    if (config.bots.hasOwnProperty(bot)) {

        var rtmBot = require('./bots/' + bot);

        rtmBot.start();

    }
}