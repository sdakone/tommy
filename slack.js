'use strict';

var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function () {}).listen(process.env.PORT || 5000);

var botsDir = path.join(__dirname, './bots');

console.log('bot dir ', botsDir);

fs.readdir(botsDir, function (error, files) {

    for (var i = 0; i < files.length; i++) {

        var bot = files[i];
        var rtmBot = require('./bots/' + bot);

        rtmBot.start();
        console.log('Starting ', bot, ' bot...');

    }

});
