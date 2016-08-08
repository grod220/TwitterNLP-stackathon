app.factory('toTwit', function ($http) {
    return {
        getTweets: function(username) {
            var toPost = {
                'userName': username
            };
            return $http.post('/api/twitter', toPost)
            .then(function(result) {
              return result;
            });
        },
        getPolText: function(num) {
            if (num < -.75) {return ['Very Negative', '#ca0e05']; }
            if (num < -.3) {return ['Negative', '#cb3731']; }
            if (num < -.05) {return ['Slightly Negative', '#cd5c57']; }
            if (num < .05) {return ['Neutral', '#e7e7e7']; }
            if (num < .3) {return ['Slightly Positive', '#55ac63']; }
            if (num < .75) {return ['Positive', '#2a963c']; }
            if (num <= 1) {return ['Very Positive', '#00b01d']; }
        },
        getMagText: function(num) {
            if (num < 2) {return ['Very Low','#fff5ed']; }
            if (num < 5) {return ['Low','#ffe0c7']; }
            if (num < 10) {return ['Medium','#ffc392']; }
            if (num < 15) {return ['Medium-high','#ffab67']; }
            if (num < 25) {return ['High','#ff8b2d']; }
            if (num < 100) {return ['Very High','#ff7200']; }
        }
    };
});
