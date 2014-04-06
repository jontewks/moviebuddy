'use strict';

var app = angular.module('moviebuddyApp');

app.controller('loginController', function ($scope, $rootScope, $http, $location, $q, authentication) {
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

    $scope.login = function() {
      authentication.fbLogin();
    };

    $scope.logout = function(){
      authentication.fbLogout();
    };

  });
