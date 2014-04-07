'use strict';
/* global angular */

var app = angular.module('moviebuddyApp');

app.controller('OutingsController', function ($scope, $http) {

  var newOutingButtonVisible = true;
  var newOutingFormVisible = false;
  $scope.form = {};

  $scope.showNewOutingButton = function() {
    return newOutingButtonVisible;
  };

  $scope.showNewOutingForm = function() {
    return newOutingFormVisible;
  };

  // Hide the 'new outing' button; show the 'new outing' form.
  $scope.newOuting = function() {
    newOutingButtonVisible = false;
    newOutingFormVisible = true;
  };

  // Hide the 'new outing' form; show the 'new outing' button.
  $scope.cancelNewOuting = function() {
    newOutingFormVisible = false;
    newOutingButtonVisible = true;
  };

  // Create a new 'outing' object from passed form and user.
  var createOuting = function(form, userId) {
    var outing = {};
    outing.movie = form.movie;
    outing.date = form.date;
    outing.theater = form.theater;
    // Look these up in our DB based on theater name?
    // outing.address;    // outing.city;    // outing.state;    // outing.zip;
    outing.invitees = form.invitees;
    outing.attendees = [];
    outing.creator = userId;
    return outing;
  };

  // Process the 'new outing' form.
  $scope.processOutingForm = function() {
    var outing = createOuting($scope.form, $scope.userId || 1234);
    $http({
      method: 'POST',
      url: '/api/outings/',
      data: outing
    })
    .success(function(data) {
      console.log('Successfully posted:', data);
      // Hide the 'new outing' form, show the 'new outing' button.
      newOutingFormVisible = false;
      newOutingButtonVisible = true;
      // *** Call a 'displayOutings' or 'refreshOutings' or 'appendOuting' function?
    })
    .error(function(data, status, headers, config) {
      console.log('Error processing "new outing" form:', data, status, headers, config);
      // *** Throw an 'error' object?
    });
  };

  // Pull from the DB outings that are visible to the user.
  var getOutings = function(userId) {
    return $http({
      method: 'GET',
      url: '/api/outings/' + (userId || '1234')
    })
    .success(function(data, status, headers, config) {
      console.log('Success getting outings from DB:', data, status, headers, config);
      // *** Call a 'displayOutings' or 'refreshOutings' or 'appendOuting' function?
    })
    .error(function(data, status, headers, config) {
      console.log('Error getting outings from DB:', data, status, headers, config);
      // *** Throw an 'error' object?
    });
  };

  getOutings($scope.userID || '1234')
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