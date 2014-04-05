'use strict';

var app = angular.module('moviebuddyApp');

app.service('getFriends', function($http){
	this.getFriendsData = function(){
		return $http({
			method: 'GET',
			url: '',
			params: 'obj'
		});
	};
});

app.controller('friendsController', function ($scope, $rootScope,getFriends) {
		$scope.friends = [];

		// getFriends to be used
		

		var richard = {
			imgPath: '../images/mainManRich.jpg',
			name: 'Richard Branson'
		};

		$scope.friends.push(richard);


    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
