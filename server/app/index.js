'use strict';
var path = require('path');
var express = require('express');
var app = express();
var rp = require('request-promise');
var request = require('request');
let Promise = require('bluebird');

var clientId = '78af32af57f447788cfb962016deb809';
var clientSecret = 'f64e985685b04991be590099d445f625';
var redirectUri = 'http://localhost:1337/code';
var accessToken;

module.exports = function (db) {

    // Pass our express application pipeline into the configuration
    // function located at server/app/configure/index.js
    require('./configure')(app, db);

    // Routes that will be accessed via AJAX should be prepended with
    // /api so they are isolated from our GET /* wildcard.
    app.use('/api', require('./routes'));


    /*
     This middleware will catch any URLs resembling a file extension
     for example: .js, .html, .css
     This allows for proper 404s instead of the wildcard '/*' catching
     URLs that bypass express.static because the given file does not exist.
     */
    app.use(function (req, res, next) {

        if (path.extname(req.path).length > 0) {
            res.status(404).end();
        } else {
            next(null);
        }

    });

    app.get('/authInsta', function (req, res) {
        res.redirect('https://api.instagram.com/oauth/authorize/?client_id=' + clientId + '&redirect_uri=' + redirectUri + '&response_type=code&scope=public_content+follower_list');
    });

    app.get('/code', function (req, res) {
      var options = {
          method: 'POST',
          uri: 'https://api.instagram.com/oauth/access_token',
          form: {
              client_id: clientId,
              client_secret: clientSecret,
              grant_type: 'authorization_code',
              redirect_uri: redirectUri,
              code: req.query.code
          },
          json: true, // Automatically stringifies the body to JSON
          simple: false
      };
      rp(options)
          .then(function (parsedBody) {
            accessToken = parsedBody.access_token;
            res.redirect('https://api.instagram.com/v1/locations/89875161/media/recent?access_token=' + accessToken);
          })
          .catch(function (err) {
              res.send(err);
          });


    });

    app.get('/*', function (req, res) {
        res.sendFile(app.get('indexHTMLPath'));
    });

    // Error catching endware.
    app.use(function (err, req, res, next) {
        console.error(err);
        console.error(err.stack);
        res.status(err.status || 500).send(err.message || 'Internal server error.');
    });

    return app;

};

