'use strict';

var weatherBot = require('./index');

var token = process.env.BOT_API_KEY;
var name = process.env.BOT_NAME;
var settings = {
  token: 'xoxb-156514060722-U89Xtj3m48cHv9m5pcVeIGYF',
  name: 'weatherB'
};


var weatherbot = new weatherBot(settings).bind(this);

weatherbot.run();
