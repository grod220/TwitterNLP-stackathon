app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeController'
    });
});


app.controller('HomeController', function ($scope, toGoog, $log, toTwit, $rootScope) {
  $scope.result = null;
  $scope.addThisGuy = null;
  $scope.bool = false;
  $scope.formShow = true;
  $scope.polText;
  $scope.magText;

  $scope.hitMe = function() {
    $scope.addThisGuy = !$scope.addThisGuy ? 'transform-active' : null;
    $scope.bool = !$scope.bool;
  };


  $scope.sendToTwit = function(username) {
    $scope.bool = !$scope.bool;
    $scope.formShow = !$scope.formShow;
    toTwit.getTweets(username)
    .then(function(result) {
      $scope.profileUrl = result.data.profilePhoto;
      toGoog.postReq(result.data.tweets)
      .then(function(sentimentObj) {
        $scope.bool = !$scope.bool;
        $scope.formShow = false;
        setTimeout(function() {
          $scope.result = sentimentObj;
          $scope.polStyle = {"color":toTwit.getPolText(sentimentObj.data.documentSentiment.polarity)[1]};
          $scope.polText = toTwit.getPolText(sentimentObj.data.documentSentiment.polarity)[0];
          $scope.magStyle = {"color":toTwit.getMagText(sentimentObj.data.documentSentiment.magnitude)[1]};
          $scope.magText = toTwit.getMagText(sentimentObj.data.documentSentiment.magnitude)[0];
          $rootScope.$digest();
        }, 1000);
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

  $scope.toReturn = function() {
    $scope.result = false;
    $scope.userName = '';
    setTimeout(function() {
      $scope.formShow = true;
      $rootScope.$digest();
    }, 500);
  };
});
