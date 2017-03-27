'use strict';
const WebClient = require('@slack/client').WebClient;
const https = require('https');
const Templates = require('./templates.js');




module.exports.event = (event, context, callback) => {
	var jsonBody = JSON.parse(event.body);

  var response = {
		statusCode: 200,
    token: 'iJ0RpQxbkpzwFULWwXUTb2zz',
	};


	switch (jsonBody.type) {
		case 'url_verification':
			response.headers = {
				'Content-Type': 'application/x-www-form-urlencoded',

			};
			response.body = jsonBody.challenge;

			break;

		case 'event_callback':
			OAuth.retrieveAccessToken(jsonBody.team_id)
				.then(botAccessToken => handleEvent(jsonBody.event, botAccessToken))
				.catch(error => console.log(error));
			break;
	}

	callback(null, response);
};

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  module.exports.authorized = (event, context, callback) => {
    const code = event.queryStringParameters.code;

    https.get('https://slack.com/api/oauth.access?client_id=35436369973.159044565042&client_secret=ebb5655496641d8aa8f5632f2bbfde89&code=' + code), response =>{
      var body = '';
      response.on('data', chunk => body += chunk);
      response.on('end', () => {
        const jsonBody = JSON.parse(body);
        OAuth.storeAccessToken(jsonBody.team_id, jsonBody.bot.bot_access_token)
          .catch(error => console.log(error));
      });
    });
    callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html'
      },
      body: Templates.authorized()
    });
  };

  module.exports.install = (event, context, callback) => {
    callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html'
      },
      body: Templates.install(client.id)
    })
  }

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

/*
This function handles a Slack slash command and echoes the details back to the user.

Follow these steps to configure the slash command in Slack:

  1. Navigate to https://<your-team-domain>.slack.com/services/new

  2. Search for and select "Slash Commands".

  3. Enter a name for your command and click "Add Slash Command Integration".

  4. Copy the token string from the integration settings and use it in the next section.

  5. After you complete this blueprint, enter the provided API endpoint URL in the URL field.


  To encrypt your secrets use the following steps:

  1. Create or use an existing KMS Key - http://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html

  2. Click the "Enable Encryption Helpers" checkbox

  3. Paste <COMMAND_TOKEN> into the kmsEncryptedToken environment variable and click encrypt

Follow these steps to complete the configuration of your command API endpoint

  1. When completing the blueprint configuration select "Open" for security
     on the "Configure triggers" page.

  2. Enter a name for your execution role in the "Role name" field.
     Your function's execution role needs kms:Decrypt permissions. We have
     pre-selected the "KMS decryption permissions" policy template that will
     automatically add these permissions.

  3. Update the URL for your Slack slash command with the invocation URL for the
     created API resource in the prod stage.
*/
