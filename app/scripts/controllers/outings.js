'use strict';

var app = angular.module('moviebuddyApp');

app.controller('OutingsController', ['$scope', '$rootScope', '$http', 'sendAlert', function ($scope, $rootScope, $http, sendAlert) {
  var newOutingButtonVisible = true;
  var newOutingFormVisible = false;

  $scope.clearOutingForm = function() {
    $scope.form.movie = '';
    $scope.form.date = '';
    $scope.form.theater = '';
    // $scope.form.invitees = '';
  };

  // Function to create new outing object from form and user.
  $scope.createOuting = function(form, userId, userName) {
    if (form === undefined || userId === undefined || userName === undefined) {
      throw new Error('Insufficient input for function.');
    }

    var outing = {};
    outing.movie = $rootScope.currentMovie;
    outing.date = form.date+'T07:00:00Z'; // Add 7 hours so angular shows correct date in THIS TIME ZONE ONLY omg fix this guyz.
    outing.theater = form.theater;
    // Look up below values via TMS or Fandango API or app DB.
    // outing.address;    // outing.city;    // outing.state;    // outing.zip;
    // Postpone invitation funcationality for post-MVP.
    // outing.invitees = form.invitees;
    outing.attendees = {};
    outing.attendees[userId] = { name: userName };
    outing.organizers = {};
    outing.organizers[userId] = { name: userName };

    sendAlert.email();

    return outing;
  };

  $scope.showNewOutingButton = function() {
    return newOutingButtonVisible;
  };

  $scope.showNewOutingForm = function() {
    return newOutingFormVisible;
  };

  // Hides 'new outing' button & show 'new outing' form.
  $scope.newOuting = function() {
    newOutingButtonVisible = false;
    newOutingFormVisible = true;
  };

  // Hides 'new outing' form & show 'new outing' button.
  $scope.cancelNewOuting = function() {
    newOutingFormVisible = false;
    newOutingButtonVisible = true;
  };

  // Pulls all 'outings' from DB for user.
  $scope.getOutings = function() {
    $http({
      method: 'GET',
      url: '/api/outings'
    })
    .success(function (data) {
      $rootScope.outings = data;
    })
    .error(function (data, status, headers, config) {
      console.log('GET Error:', data, status, headers, config);
    });
  };

  // Processes 'new outing' form.
  $scope.processOutingForm = function() {
    var form = $scope.form;
    var userId = $rootScope.user.facebookId;
    var userName = $rootScope.user.name;
    var outing = $scope.createOuting(form, userId, userName);
    
    $http({
      method: 'POST',
      url: '/api/outings',
      data: outing
    })
    .success(function (data) {
      $scope.getOutings();
      $scope.clearOutingForm();
      $scope.cancelNewOuting();
    })
    .error(function (data, status, headers, config) {
      console.log('POST Error:', data, status, headers, config);
    });
  };

  $scope.showJoinButton = function() {
    var userId = $rootScope.user.facebookId;
    var outing = this.outing;

    for (var attendeeId in outing.attendees) {
      if (Number(attendeeId) === Number(userId)) {
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
    .success(function (data) {
      $scope.getOutings();
    })
    .error(function (data, status, headers, config) {
      console.log('PUT Error:', data, status, headers, config);
    });
  };

  $scope.showBailButton = function() {
    var userId = $rootScope.user.facebookId;
    var outing = this.outing;

    for (var attendeeId in outing.attendees) {
      if (Number(attendeeId) === Number(userId)) {
        return true;
      }
    }

    return false;
  };

  var chooseNewOrganizers = function(outing) {
    var newOrganizers = {};

    for (var attendeeId in outing.attendees) {
      // For MVP, simply promote all remaining attendees to organizers.
      newOrganizers[attendeeId] = outing.attendees[attendeeId];
    }

    return newOrganizers;
  };

  var cancelOuting = function(outing) {
    $http({
      method: 'DELETE',
      url: '/api/outings/' + outing._id
    })
    .success(function () {
      $scope.getOutings();
    })
    .error(function (data, status, headers, config) {
      console.log('DELETE Error:', data, status, headers, config);
    });
  };

  $scope.bailOuting = function() {
    var userId = $rootScope.user.facebookId;
    var outing = this.outing;
    var outingId = this.outing._id;

    delete outing.attendees[userId];
    delete outing.organizers[userId];

    // Check if bailing user was only organizer.
    if (Object.keys(outing.organizers).length <= 0) {

      // Check if no other attendees.
      if (Object.keys(outing.attendees).length <= 0) {
        cancelOuting(outing);
        return;
      } else {
        outing.organizers = chooseNewOrganizers(outing);

        $http({
          method: 'PUT',
          url: '/api/outings/' + outingId,
          data: outing
        })
        .success(function (data) {
          $scope.getOutings();
        })
        .error(function (data, status, headers, config) {
          console.log('PUT Error:', data, status, headers, config);
        });
      }
    }
  };

  $scope.showEditButton = function() {
    var userId = $rootScope.user.facebookId;
    var outing = this.outing;

    for (var organizerId in outing.organizers) {
      if (Number(organizerId) === Number(userId)) {
        return true;
      }
    }

    return false;
  };

  $scope.editOuting = function() {
    var outing = this.outing;
    var outingId = this.outing._id;

    $http({
      method: 'PUT',
      url: '/api/outings/' + outingId,
      data: outing
    });
  };

  $scope.getOutings(); // Initialize display of outings.
  $scope.form = {}; // Define empty object to hold form data.
}]);
