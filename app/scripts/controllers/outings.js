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

  var newOutingButtonVisible = true;
  var newOutingFormVisible = false;

  $scope.showNewOutingButton = function() {
    return newOutingButtonVisible;
  };

  $scope.showNewOutingForm = function() {
    return newOutingFormVisible;
  };

  $scope.newOuting = function() {
    newOutingButtonVisible = false;
    newOutingFormVisible = true;
  };

  $scope.cancelNewOuting = function() {
    newOutingButtonVisible = true;
    newOutingFormVisible = false;
  };

  $scope.createOuting = function() {
    // Create outing object.
    
    // Submit outing object to server. 
    // Clear 'newOutingForm'?
    $scope.newOutingButtonVisible = true;
    $scope.newOutingFormVisible = false;
  };

  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

});