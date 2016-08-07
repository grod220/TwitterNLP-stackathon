'use strict';
var router = require('express').Router();
module.exports = router;
var Twitter = require('twitter');
var rp = require('request-promise');

// var options = {
//     method: 'POST',
//     uri: 'https://api.twitter.com/oauth2/token',
//     form: {
//         grant_type: 'client_credentials'
//     },
//     headers: {
//       Authorization: 'Basic OEJYUTJsQkRvUlJETFFFOWFXbzR3VmVPbzpqMkVhQXFUTnNSVE5TWHEzZnRmMXJiOUY3Z01kQ2lBb053YmZORGllUHg2Q2ZRWUh2Mw==Content-Type: application/x-www-form-urlencoded;charset=UTF-8',
//     },
//     json: true // Automatically stringifies the body to JSON
// };

// var client = new Twitter({
//   consumer_key: '8BXQ2lBDoRRDLQE9aWo4wVeOo',
//   consumer_secret: 'j2EaAqTNsRTNSXq3ftf1rb9F7gMdCiAoNwbfNDiePx6CfQYHv3',
//   bearer_token: parsedBody.access_token
// });

var client = new Twitter({
  consumer_key: '8BXQ2lBDoRRDLQE9aWo4wVeOo',
  consumer_secret: 'j2EaAqTNsRTNSXq3ftf1rb9F7gMdCiAoNwbfNDiePx6CfQYHv3',
  access_token_key: '26320171-lZD1vuX3jgmnLL9jUJYgvAWm0nsT3YtN3u5f6rLER',
  access_token_secret: 'Usaz8KUyPPv98BHKTZn5faqjCey5n0dzdsKD31Jl6g0Au'
});

router.post('/', function(req,res) {
  client.get('/statuses/user_timeline.json', {screen_name: req.body.userName, count: 200}, function(error, tweets, response) {
    var holder = '';
    for (var i=0; i<tweets.length; i++) {
      holder += tweets[i].text;
    }
    var b = holder.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
    res.send(b);
  });
});
