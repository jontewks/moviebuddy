'use strict';
/* global angular, $ */

var app = angular.module('moviebuddyApp');

app.controller('OutingsController', function ($scope, $http) {

  var newOutingButtonVisible = true;
  var newOutingFormVisible = false;

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

  // Create a new 'outing' object.
  // var createOuting = function() {
  //   window.alert('In createOuting()');
  //   var outing = {};
    // outing.movie = $scope.movie.value;
    // outing.date = $scope.date.value;
    // outing.theater = $scope.theater.value;
    // Look these up in our DB based on theater name?
    // outing.address;    // outing.city;    // outing.state;    // outing.zip;
    // outing.invitees = $scope.invitees.value;
    // outing.attendees = [];
    // outing.creator = $scope.userId;
    // window.alert('In createOuting() outing =', outing);
    // return outing;
  // };

  $scope.outing = {};

  // Process the 'new outing' form.
  $scope.processOutingForm = function() {
    window.alert('In processOutingForm()');
    // *** TO-DO: Bind 'outing' to the creating user below.
    // $http.post('/api/outings', $scope.outing)
    // $http({
    //   method: 'POST',
    //   *** TO-DO: Bind 'outing' to the creating user below.
    //   url: '/api/outings/',
    //   // Pass in 'data' as strings.
    //   data: $.param($scope.outing),
    //   // Set the 'headers' so Angular passes info as form data (not request payload).
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // })
    // .success(function(data) {
    //   window.alert('In processOutingForm(), $http().success(), data =', data);
    //   if(!data.success) {
    //     // If not successful, bind errors to error variables.
    //     $scope.errorMovie = data.errors.movie;
    //     $scope.errorDate = data.errors.date;
    //     $scope.errorTheater = data.errors.theater;
    //     $scope.errorInvitees = data.errors.invitees;
    //   } else {
    //     // If successful, bind success message to 'message'.
    //     $scope.message = data.message;
    //   }
    // });
    // Hide the 'new outing' form, show the 'new outing' button.
    $scope.newOutingFormVisible = false;
    $scope.newOutingButtonVisible = true;
  };

  // getOutings.getVisibleOutings('1234') // *** User ID parameter should be dynamic. ***
  // .then(function(data) {
  //   angular.forEach(data.data, function(outing) {
  //     $scope.testMovie     = outing.movie;
  //     $scope.testDate      = outing.date;
  //     $scope.testTheater   = outing.theater;
  //     $scope.testAddress   = outing.address;
  //     $scope.testCity      = outing.city;
  //     $scope.testState     = outing.state;
  //     $scope.testZip       = outing.zip;
  //     $scope.testInvitees  = outing.invitees;
  //     $scope.testAttendees = outing.attendees;
  //     $scope.testCreator   = outing.creator;
  //   });
  // });

  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

});

// Pull from the DB outings that are visible to the user.
// app.service('getOutings', function($http) {
//   this.getVisibleOutings = function(userId) {
//     return $http({
//       method: 'GET',
//       url: '/api/outings/' + userId
//     });
//   };
// });