app.factory('toTwit', function ($http) {
    return {
        getTweets: function(username) {
            var toPost = {
                'userName': username
            };
          return $http.post('/api/twitter', toPost);
        }
    };
});
