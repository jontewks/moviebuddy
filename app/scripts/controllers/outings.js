'use strict';
/* global angular */

var app = angular.module('moviebuddyApp');

app.controller('OutingsController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

  var newOutingButtonVisible = true;
  var newOutingFormVisible = false;

  // Rewrite using angular.forEach()?
  var clearOutingForm = function() {
    $scope.form.movie = '';
    $scope.form.date = '';
    $scope.form.theater = '';
    // $scope.form.invitees = '';
  };

  // Function to create new 'outing' object from form and user.
  var createOuting = function(form, userId, userName) {
    if(form === undefined || userId === undefined || userName === undefined) {
      throw new Error('Insufficient input for function.');
    }
    var outing = {};
    outing.movie = form.movie;
    outing.date = form.date;
    outing.theater = form.theater;
    // Look up below values via TMS or Fandango API or app DB.
    // outing.address;    // outing.city;    // outing.state;    // outing.zip;
    // Postpone invitation funcationality for post-MVP.
    // outing.invitees = form.invitees;
    outing.attendees = {};
    outing.attendees[userId] = { name: userName };
    // Remove two dummy attendees below before deployment.
    outing.attendees[1001] = { name: 'Alice' };
    outing.attendees[1002] = { name: 'Bob' };
    outing.organizers = {};
    outing.organizers[userId] = { name: userName };
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
    var form = $scope.form;
    var userId = $rootScope.user.facebookId;
    var userName = $rootScope.user.name;
    var outing = createOuting(form, userId, userName);
    $http({
      method: 'POST',
      url: '/api/outings',
      data: outing
    })
    .success(function(data) {
      console.log('POST Success:', data);
      clearOutingForm();
      // Hide 'new outing' form, show 'new outing' button.
      newOutingFormVisible = false;
      newOutingButtonVisible = true;
      // Refresh the 'outings' display.
      $scope.getOutings();
    })
    .error(function(data, status, headers, config) {
      console.log('POST Error:', data, status, headers, config);
    });
  };

  // Function to pull all 'outings' from DB for user.
  $scope.getOutings = function() {
    $http({
      method: 'GET',
      url: '/api/outings'
    })
    .success(function(data) {
      console.log('GET Success:', data);
      $scope.outings = data;
    })
    .error(function(data, status, headers, config) {
      console.log('GET Error:', data, status, headers, config);
    });
  };

  $scope.showJoinButton = function() {
    var userId = $rootScope.user.facebookId;
    var outing = this.outing;
    for(var attendeeId in outing.attendees) {
      if(Number(attendeeId) === Number(userId)) {
        return false;
      }
    }
    return true;
  };

  $scope.joinOuting = function() {

    var userId = $rootScope.user.facebookId;
    var userName = $rootScope.user.name;
    var outing = this.outing;
    var outingId = this.outing._id;

    outing.attendees[userId] = { name: userName };

    $http({
      method: 'PUT',
      url: '/api/outings/' + outingId,
      data: outing
    })
    .success(function(data) {
      console.log('PUT Success:', data);
      $scope.getOutings();
    })
    .error(function(data, status, headers, config) {
      console.log('PUT Error:', data, status, headers, config);
    });

  };

  $scope.showBailButton = function() {
    var userId = $rootScope.user.facebookId;
    var outing = this.outing;
    for(var attendeeId in outing.attendees) {
      if(Number(attendeeId) === Number(userId)) {
        return true;
      }
    }
    return false;
  };

  var chooseNewOrganizers = function(outing) {
    var newOrganizers = {};
    for(var attendeeId in outing.attendees) {
      // For MVP, simply promote all remaining attendees to organizers.
      newOrganizers[attendeeId] = outing.attendees[attendeeId];
    }
    return newOrganizers;
  };

  $scope.cancelOuting = function() {
    var outingId = this.outing._id;
    return $http({
      method: 'DELETE',
      url: '/api/outings/' + outingId
    });
  };

  $scope.bailOuting = function() {
    var userId = $rootScope.user.facebookId;
    var outing = this.outing;
    var outingId = this.outing._id;

    delete outing.attendees[userId];
    delete outing.organizers[userId];

    // Check if bailing user was only organizer.
    if(Object.keys(outing.organizers).length <= 0) {

      // Check if no other attendees.
      if(Object.keys(outing.attendees).length <= 0) {

        console.log('No one attending; canceling outing.');
        $scope.cancelOuting();
        return;

      } else {

        console.log('No one organizing; prompting user for new organizers.');
        outing.organizers = chooseNewOrganizers(outing);

        $http({
          method: 'PUT',
          url: '/api/outings/' + outingId,
          data: outing
        })
        .success(function(data) {
          console.log('PUT Success:', data);
          $scope.getOutings();
        })
        .error(function(data, status, headers, config) {
          console.log('PUT Error:', data, status, headers, config);
        });

      }
    }
  };

  $scope.showEditButton = function() {
    var userId = $rootScope.user.facebookId;
    var outing = this.outing;
    for(var organizerId in outing.organizers) {
      if(Number(organizerId) === Number(userId)) {
        return true;
      }
    }
    return false;
  };

  $scope.editOuting = function() {
    var outing = this.outing;
    var outingId = this.outing._id;
    return $http({
      method: 'PUT',
      url: '/api/outings/' + outingId,
      data: outing
    });
  };

  // Initialize display of outings.
  $scope.getOutings();

}]);
