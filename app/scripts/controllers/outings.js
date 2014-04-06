'use strict';
/* global angular */

var app = angular.module('moviebuddyApp');

// Pull from the DB outings that are visible to the user.
app.service('getOutings', function($http) {
  this.getVisibleOutings = function(userId) {
    return $http({
      method: 'GET',
      url: '/api/outings/' + userId
    });
  };
});

app.controller('outingsController', function ($scope, getOutings) {

  getOutings.getVisibleOutings('1234') // *** User ID parameter should be dynamic. ***
  .then(function(data) {
    angular.forEach(data.data, function(outing) {
      $scope.testMovie     = outing.movie;
      $scope.testDate      = outing.date;
      $scope.testTheater   = outing.theater;
      $scope.testAddress   = outing.address;
      $scope.testCity      = outing.city;
      $scope.testState     = outing.state;
      $scope.testZip       = outing.zip;
      $scope.testInvitees  = outing.invitees;
      $scope.testAttendees = outing.attendees;
      $scope.testCreator   = outing.creator;
    });
  });

  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

});