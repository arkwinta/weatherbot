var util = require('util');
var path = require('path');
var fs = require('fs');
var Bot = require('slackbots');
const settings = {
  token: 'xoxb-156514060722-U89Xtj3m48cHv9m5pcVeIGYF',
  name: 'weatherB'
};
var location = "";

class weatherBot extends Bot{
  constructor(settings){
    this.settings = settings;
    this.settings.name = this.settings.name || 'weatherbot';
    this.user = null;
  }
}


util.inherits(weatherBot, Bot);
module.exports = weatherBot;

weatherBot.prototype.run = function () {
  new weatherBot.super_.call(this, this.settings);

  this.on('start', this._onStart);
  this.on('message', this._onMessage);
}

weatherBot.prototype._onStart = function () {
  this.loadBotUser();
  this.welcome();
};

weatherBot.prototype._loadBotUser = function () {
  const self = this;
  this.user = this.users.filter(user => user.name === self.name)[0];
};

weatherBot.prototype._welcome = function() {
  this.postMessageToChannel(this.channels[0].name, 'Where are you located?',
  {as_user: true});
};

weatherBot.prototype._onMessage = function (message){
  if(this._isChatMessage(message) && this._isChannelConversation(message) && !this._isFromWeatherBot(message) && this._isAskingWeatherBot(message)){
    this._replyWithWeather(message);
  }
}

weatherBot.prototype._isChatMessage = message => message.type === 'message' && Boolean(message.text);

weatherBot.prototype._isChannelConversation = message => typeof message.channel === 'string' && message.channel[0] === 'C';

weatherBot.prototype._isFromWeatherBot = function(message){
  return message.user === this.user.id;
};

weatherBot.prototype._isAskingWeatherBot = message => message.text.toLowerCase().includes('weather');

weatherBot.prototype._replyWithWeather = function(originalMessage){
  const self = this;
  const channel = self._getChannelById(originalMessage.channel);
  location = originalMessage.body;
  self.postMessageToChannel(channel.name, 'It is sunny or rainy or some shit', {as_user: true});
};

weatherBot.prototype._getChannelById = function (channelId){
  return this.channels.filter(item => item.id === channelId)[0];
};
