'use strict';

var app = angular.module('moviebuddyApp');

app.controller('DashController', ['$scope', '$http','$rootScope','$q', 'authentication','getLocation', 'getTheaterData', function ($scope, $http, $rootScope, $q, authentication, getLocation, getTheaterData) {
	$scope.logout = function() {
    authentication.fbLogout();
  };

  getLocation.getZip()
  .then(function(currentZip){
    getTheaterData.getTheaters(currentZip)
    .then(function(theaters){
      $rootScope.theaters = theaters.data;
      for (var i = 0; i < $rootScope.theaters.length; i++) {
        console.log('rootscope ID: ', $rootScope.theaters[i].theatreId);
        getTheaterData.getTheaterShowtimes($rootScope.theaters[i].theatreId);
      }
    });
  });

}]);
