'use strict';

angular.module('moviebuddyApp')
  .controller('MainCtrl', function ($scope, $FB) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.$watch(function() {
      return $FB.isLoaded()
    },function(value){

      if(value){
        $scope.facebook_friends = $FB.api('/me/friends', function(response) {
          $scope.facebook_friends = response.data;
        });
      }
    },true);

    $scope.$watch(function() {
      return $FB.isAuthenticated()
    },function(value){

      if(value){
        $scope.facebook_friends = $FB.api('/me/friends', function(response) {
          $scope.facebook_friends = response.data;
          console.log("FRIENDS",response);
        });
      }
    },true);

    $scope.login = function(){
      $FB.login(function(){}, {scope: "friends_about_me"});
    };

    $scope.logout = function(){
      $FB.logout(function(){});
    };
  });
