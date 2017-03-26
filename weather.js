var request = require('request');
var http = require('http');


http.get({
  host: 'api.openweathermap.org',
  path: '/data/2.5/weather?q=reno&APPID=eac230265e235140bee76bd47da1f05f'
}, function(res){
  var body = '';
  res.on('data', function(d){
    body += d;
  });
  response.on('end', function() {
    var parsed = JSON.parse(body);
    console.log(parsed);
  });
});









// request('http://api.openweathermap.org/data/2.5/weather?q=newark&APPID=eac230265e235140bee76bd47da1f05f', function(error, response, body){
//   if(!error && response.statusCode == 200){
//     var jsonBody = JSON.parse(body);
//     console.log("nice");
//     console.log(jsonBody);
//     console.log('heres a fucking break');
//     console.log(jsonBody.main);
//     console.log(jsonBody.main.temp);
//     console.log(jsonBody.weather[0]);
//     console.log(jsonBody.weather[0].description);
//
//   } else {
//     console.log(error);
//
//   }
// });

module.exports.weather = (event, context, callback) => {
  callback(null, {body: 'Hello World!'});
}
