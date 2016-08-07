app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('about', {
        url: '/about',
        controller: 'AboutController',
        templateUrl: 'js/about/about.html'
    });

});

app.controller('AboutController', function ($scope, toGoog, $log, toTwit) {
  $scope.result = null;

  $scope.sendToTwit = function(username) {
    toTwit.getTweets(username)
    .then(function(result) {
      toGoog.postReq(result.data)
      .then(function(sentimentObj) {
        $scope.result = sentimentObj;
      });
    })
    .catch(function(err) {
      $log.err;
    });
  };

  $scope.sendToGoog = function(content) {
    toGoog.postReq(content)
    .then(function(result) {
      $scope.result = result;
    })
    .catch(function(err) {
      $log.err;
    });
  };
});
