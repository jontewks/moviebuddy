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
  $scope.getOutings = function(userId) {
    userId = userId || 1234;
    console.log('In getOutings(), userId is', userId);
    // return $http({
    //   method: 'GET',
    //   url: '/api/outings/' + userId
    // })
    // .success(function(data, status, headers, config) {
    //   console.log('Success getting outings from DB:', data, status, headers, config);
    //   // *** Call a 'displayOutings' or 'refreshOutings' or 'appendOuting' function?
    // })
    // .error(function(data, status, headers, config) {
    //   console.log('Error getting outings from DB:', data, status, headers, config);
    //   // *** Throw an 'error' object?
    // });
    // *** Returning only dummy data below.
    return [{
      outingId:      5678,
      movie:         'Ride Along',
      date:          '2014-04-12',
      theater:       'Kabuki',
      address:       '1881 Post St',
      city:          'San Francisco',
      state:         'CA',
      zip:           94115,
      invitees:      [],
      attendees:     [],
      creator:       1234 // A user id (foreign key).
    }, {
      outingId:      8765,
      movie:         'Divergent',
      date:          '2014-04-19',
      theater:       'Metreon',
      address:       '135 4th St #3000',
      city:          'San Francisco',
      state:         'CA',
      zip:           94103,
      invitees:      [],
      attendees:     [],
      creator:       4321 // A user id (foreign key).
    }];
  };

  $scope.outings = $scope.getOutings($scope.userId);

  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

});