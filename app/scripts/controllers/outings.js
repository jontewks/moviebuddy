'use strict';
/* global angular */

var app = angular.module('moviebuddyApp');

app.controller('OutingsController', function ($scope, $http) {

  var newOutingButtonVisible = true;
  var newOutingFormVisible = false;

  // Function to create new 'outing' object from form and user.
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

  // Define empty object to hold 'new outing' form data.
  $scope.form = {};

  $scope.showNewOutingButton = function() {
    return newOutingButtonVisible;
  };

  $scope.showNewOutingForm = function() {
    return newOutingFormVisible;
  };

  // Function to hide 'new outing' button, show 'new outing' form.
  $scope.newOuting = function() {
    newOutingButtonVisible = false;
    newOutingFormVisible = true;
  };

  // Function to hide 'new outing' form; show 'new outing' button.
  $scope.cancelNewOuting = function() {
    newOutingFormVisible = false;
    newOutingButtonVisible = true;
  };

  // Function to process 'new outing' form.
  $scope.processOutingForm = function() {
    var outing = createOuting($scope.form, $scope.userId || 1234);
    $http({
      method: 'POST',
      url: '/api/outings/',
      data: outing
    })
    .success(function(data) {
      console.log('Successfully posted:', data);
      // *** Temporarily push to local array until DB is up.
      $scope.outings.push(outing);
      // Hide the 'new outing' form, show the 'new outing' button.
      newOutingFormVisible = false;
      newOutingButtonVisible = true;
    })
    .error(function(data, status, headers, config) {
      console.log('Error processing "new outing" form:', data, status, headers, config);
      // *** Throw an 'error' object?
    });
  };

  // Function to pull from DB 'outings' for user.
  $scope.getOutings = function(userId) {
    userId = userId || 1234;
    console.log('In getOutings()', $scope.outings);
    // *** Temporarily return only dummy data until DB is up.
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
    return $scope.outings || [{
      outingId:      5678,
      movie:         'Ride Along',
      date:          '2014-04-12',
      theater:       'Kabuki',
      address:       '1881 Post St',
      city:          'San Francisco',
      state:         'CA',
      zip:           94115,
      invitees:      [1234, 1111, 2222], // User IDs (foreign keys).
      attendees:     [1234, 1111], // User IDs (foreign keys).
      creator:       1234 // A user ID (foreign key).
    }, {
      outingId:      8765,
      movie:         'Divergent',
      date:          '2014-04-19',
      theater:       'Metreon',
      address:       '135 4th St #3000',
      city:          'San Francisco',
      state:         'CA',
      zip:           94103,
      invitees:      [], // User IDs (foreign keys).
      attendees:     [], // User IDs (foreign keys).
      creator:       4321 // A user ID (foreign key).
    }];
  };

  // Initialize list of outings.
  $scope.outings = $scope.getOutings($scope.userId);

});