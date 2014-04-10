'use strict';

var app = angular.module('moviebuddyApp');

// refactor authentication out 
app.controller('LoginController', function ($scope, $rootScope, $http, $window, authentication) {

  $scope.updateDB = function() {
    FB.api('/me', function(response){
      console.log(response);
      $http({
        url: 'http://localhost:8080/api/user',
        method: 'POST',
        data: { info: response }
      });
    });
  };

  $scope.getMyInfo = function() {
    FB.api('/me', function(response){
      $rootScope.userInfo = response;
    });
  };

  // refactor out later 
  $scope.login = function() {
    authentication.fbLogin();
  };

  // refactor logout out
  $scope.logout = function(){
    authentication.fbLogout();
  };

  $rootScope.isLoggedIn = function() {
    console.log( !!$rootScope.Facebook.getAuth());
  };

});
