'use strict';


const AWS = require('aws-sdk');
const qs = require('querystring');
var http = require('http');

const kmsEncryptedToken = process.env.kmsEncryptedToken;
let token = "qHZVBlN8O3TxMpkyDm4bHBj4and";



function processEvent(json, param, callback) {
    var weatherReport = '';
    const requestToken = 'qHZVBlN8O3TxMpkyDm4bHBj4and';

    if (requestToken !== token) {
        console.error(`Request token (${requestToken}) does not match expected`);
        return callback(token + 'and it should be ' + requestToken);
    }
    weatherReport = 'There is currently ' + json.weather[0].description + ' in ' + json.name + '. '; //builds the weather report
    for(var i = 1; i < param.length; i++){
        if(param[i].includes('humid')){
            weatherReport += 'The humidity is ' + json.main.humidity + '%. ';
        }
        if(param[i].includes('temp') || param[i].includes('hot') || param[i].includes('cold')){
            var tempC = json.main.temp - 273;
            weatherReport += 'The temperature is ' + tempC.toFixed(0) + ' degrees C. ';

        }
    }

    callback(null, weatherReport);
}


exports.handler = (event, context, callback) => {
    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? (err.message || err) : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (token) {
        const params = qs.parse(event.body);
        const commandText = params.text;
        const user = params.user_name;
        const command = params.command;
        const channel = params.channel_name;

        var commandTextArray = [];
        if(commandText.indexOf(' ') === -1){
            commandTextArray[0] = commandText
        } else {
            commandTextArray = commandText.split(' ')
     }

    var urlPath = '/data/2.5/weather?q=' + commandTextArray[0] + '&APPID=eac230265e235140bee76bd47da1f05f'; //query weather api
    http.get({
	  	host: 'api.openweathermap.org',
	  	path: urlPath,
	}, function(res){
	    var body = '';
	  	res.on('data', function(d){
	    	body += d;
	  	});
	  	res.on('end', function() {
		    var parsed = JSON.parse(body);
	    processEvent(parsed, commandTextArray, done);

	  	});
	});

    } else if (kmsEncryptedToken && kmsEncryptedToken !== '<kmsEncryptedToken>') {

        const cipherText = { CiphertextBlob: new Buffer(kmsEncryptedToken, 'base64') }; //aws encryption
        const kms = new AWS.KMS();
        kms.decrypt(cipherText, (err, data) => {
            if (err) {
                console.log('Decrypt error:', err);
                return done(err);
            }
            token = data.Plaintext.toString('ascii');

            console.log('lol its in the else if statement dumbass');
                 const params = qs.parse(event.body);
                const commandText = params.text;

        var commandTextArray = [];
        if(commandText.indexOf(' ') === -1){
            commandTextArray[0] = commandText //if just city
        } else {
            commandTextArray = commandText.split(' ') //takes city and other weather params
     }

    var urlPath = '/data/2.5/weather?q=' + commandTextArray[0] + '&APPID=eac230265e235140bee76bd47da1f05f';
    http.get({
	  	host: 'api.openweathermap.org',
	  	path: urlPath,
	}, function(res){
	    var body = '';
	  	res.on('data', function(d){
	    	body += d;
	  	});
	  	res.on('end', function() {
		    var parsed = JSON.parse(body); //get the api query and convert to json

	    	 processEvent(parsed, commandTextArray, done); //pass data to process event, along with slack command

	  	});
	});






        });
    } else {
        done('Token has not been set.');
    }
};
