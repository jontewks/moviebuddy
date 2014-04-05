'use strict';

var dash = angular.module('moviebuddyApp');

dash.controller('loginController', function ($scope, $rootScope, $http) {
    $scope.updateDB = function() {
      FB.api('/me', function(response){
        $http({
          url: 'http://localhost:8080/user',
          method: 'POST',
          data: { info: response }
        });
      });
    };

    $scope.getMyInfo = function() {
      FB.api('/me', function(response){
        return response;
      });
    };

    $rootScope.isLoggedIn = function() {
      console.log( !!$rootScope.Facebook.getAuth());
    };

  });
