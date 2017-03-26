module.exports.install = (clientId) =>
`<!DOCTYPE html>
<html>
  <head>
    <title> WeatherBot!!!11! </title>
  </head>
  <body>
    <h1> Weatherbot hell yeah </h1>
    <p> Click the button, get the weather </p>
    <a href="https://slack.com/oauth/authorize?scope=bot&client_id=${clientId}">
				<img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"/>
		</a>
  </body>
</html>`;

module.exports.authorized = () =>
`<!DOCTYPE html>
<html>
  <head>
    <title> Weatherbot </title>
  </head>
  <body>
    <h1> Weatherbot </h1>
    <p> Totally installed. Kickass! </p>
  </body>
</html>`;
