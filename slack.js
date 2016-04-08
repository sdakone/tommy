var http = require('http');

var server = http.createServer(function(req, res) {

}).listen(process.env.PORT || 5000);

'use strict';

var config = require('./config');

for (var bot in config.bots) {

    if (config.bots.hasOwnProperty(bot)) {

        try {

            var rtmBot = require('./bots/' + bot);

            rtmBot.start();

        } catch (error) {

            console.log('bot ' + bot + ' not found');

        }

    }
}
