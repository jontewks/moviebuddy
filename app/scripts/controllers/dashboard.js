'use strict';

var dash = angular.module('moviebuddyApp');

dash.controller('dashController', function ($scope) {

		$scope.testUser = 'Josh Gman';
		$scope.testHometown = 'New York City';
		$scope.testFavMovie = 'Big Lebowski';
		$scope.testFavGenre = 'Comedy';
		$scope.testAge = '23';
		$scope.testFavTheater = 'Kabuki';
		$scope.testCurrentCity = 'San Francisco';
		$scope.testFavActor = 'Christian Bale';

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
