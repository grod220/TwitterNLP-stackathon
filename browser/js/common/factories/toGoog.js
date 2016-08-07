app.factory('toGoog', function ($http) {
    return {
        postReq: function(content) {
            var toPost = {
                'content': content
            };
        return $http.post('/api/theBrain', toPost);
        }
    };

});


