'use strict';

var app = angular.module('moviebuddyApp');


app.service('getFriends', function ($http) {
	this.friendsData = function (facebookId) {
		$http({
			method: 'GET',
			url: 'http://localhost:8080/api/friends/' + facebookId
		}).success(function(result) {
      console.log(result);
    });
	};
});

app.controller('friendsController', function ($scope, $rootScope, getFriends) {
  // getFriends.friendsData($rootScope.userInfo.id);
  // console.log($scope.friends);
});
