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
    console.log($scope);
    var outing = {};
    outing.movie = $scope.movie.value;
    outing.date = $scope.date.value;
    outing.theater = $scope.theater.value;
    // Look these up in our DB based on theater name?
    // outing.address;
    // outing.city;
    // outing.state;
    // outing.zip;
    outing.invitees = $scope.invitees.value;
    outing.attendees = [];
    outing.creator = $scope.userId;
    console.log(outing);
    // Submit outing object to server. 

    // Clear 'newOutingForm'? $setPristine()?
    $scope.newOutingButtonVisible = true;
    $scope.newOutingFormVisible = false;
  };

  $scope.outingFormCtrl = function($scope) {
    console.log($scope);
  };

  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

});