'use strict';

var express = require('express');
var SlackClient = require('slack-client');


var tommy = function () {

    var slackClient = new SlackClient('xoxb-31735152998-FyaXBNNVWzJ02aqkbqpWtp5t');

    var bot; // Track bot user .. for detecting messages by yourself

    slackClient.on('loggedIn', function (user, team) {
        bot = user;
        console.log('Logged in as ' + user.name + ' of ' + team.name + ', but not yet connected');
    });

    slackClient.on('open', function () {
        console.log('Connected');
    });

    slackClient.on('message', function (message) {
        if (message.user === bot.id) {
            return;
        } // Ignore bot's own messages

        var channel = slackClient.getChannelGroupOrDMByID(message.channel);
        channel.send('Io non ho capito!');

        // More goes here later..
    });

    slackClient.login();

};


var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var cors = require('cors');
var corsOptions = {
    origin:         '*',
    exposedHeaders: ['totalItems'],
    methods:        ['GET', 'PUT', 'POST', 'DELETE']
};

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '15mb'}));


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.listen(port, ipaddress, function() {
    tommy();
});
