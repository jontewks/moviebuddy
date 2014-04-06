'use strict';

var app = angular.module('moviebuddyApp');

app.controller('loginController', function ($scope, $rootScope, $http, $window) {
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

  $rootScope.isLoggedIn = function() {
    console.log( !!$rootScope.Facebook.getAuth());
  };

});
