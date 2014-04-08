'use strict';
/* global angular */


var app = angular.module('moviebuddyApp');

app.controller('OutingsController', function ($scope, $rootScope, $http, getMoviesData) {

// console.log(getMoviesData.allMovies);
// console.log($rootScope.user);

  var newOutingButtonVisible = true;
  var newOutingFormVisible = false;

  // Rewrite using angular.forEach()?
  var clearOutingForm = function() {
    $scope.form.movie = '';
    $scope.form.date = '';
    $scope.form.theater = '';
    $scope.form.invitees = '';
  };

  // Function to create new 'outing' object from form and user.
  var createOuting = function(form, userId) {
    var outing = {};
    outing.movie = form.movie;
    outing.date = form.date;
    outing.theater = form.theater;
    // In lieu of Fandango, look up below values in our DB based on theater name?
    // outing.address;    // outing.city;    // outing.state;    // outing.zip;
    outing.invitees = form.invitees;
    outing.attendees = [];
    outing.creator = userId;
    return outing;
  };

  // Define empty object to hold form data.
  $scope.form = {};

  $scope.showNewOutingButton = function() {
    return newOutingButtonVisible;
  };

  $scope.showNewOutingForm = function() {
    return newOutingFormVisible;
  };

  // Function to hide 'new outing' button & show 'new outing' form.
  $scope.newOuting = function() {
    newOutingButtonVisible = false;
    newOutingFormVisible = true;
  };

  // Function to hide 'new outing' form & show 'new outing' button.
  $scope.cancelNewOuting = function() {
    newOutingFormVisible = false;
    newOutingButtonVisible = true;
  };

  // Function to process 'new outing' form.
  $scope.processOutingForm = function() {
    // *** TO-DO: Remove '1234'.
    var outing = createOuting($scope.form, $scope.userId || 1234);
    $http({
      method: 'POST',
      url: '/api/outings/',
      data: outing
    })
    .success(function(data) {
      console.log('POST Success:', data);
      // Clear form values.
      clearOutingForm();
      // Hide 'new outing' form, show 'new outing' button.
      newOutingFormVisible = false;
      newOutingButtonVisible = true;
      // Refresh the 'outings' display.
      $scope.getOutings($scope.userId);
    })
    .error(function(data, status, headers, config) {
      console.log('POST Error:', data, status, headers, config);
    });
  };

  // Function to pull from DB 'outings' for user.
  $scope.getOutings = function(userId) {
    // *** TO-DO: Remove '1234'.
    userId = userId || 1234;
    $http({
      method: 'GET',
      url: '/api/outings/' + userId
    })
    .success(function(data) {
      console.log('GET Success:', data);
      $scope.outings = data;
    })
    .error(function(data, status, headers, config) {
      console.log('GET Error:', data, status, headers, config);
    });
  };

  // Initialize display of outings.
  $scope.getOutings($scope.userId);

});