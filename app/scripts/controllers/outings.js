'use strict';
/* global angular */

var app = angular.module('moviebuddyApp');

// app.factory('userName', ['facebookId', function userNameFactory($http, facebookId) {
//   return $http({
//     method: 'GET',
//     url: '/api/user/' + facebookId
//   });
// }]);

// var GetAllUsers = function($http) {
//   this.allUsers = $http({
//     method: 'GET',
//     url: '/api/user'
//   });
// };
// app.service('getAllUsers', ['$http', GetAllUsers]);

// app.service('getAllUsers', function($http) {
//   this.getAllUsers2 = function() {
//     return $http({
//       method: 'GET',
//       url: '/api/user'
//     });
//   };
// });

// This service returns 'Users' from the DB.
// app.service('getUsers', function($http) {
//   this.getUser = function(facebookId) {
//     return $http({
//       method: 'GET',
//       url: '/api/user/' + facebookId
//     });
//   };
// });

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
    // In lieu of Fandango, look up below values in our DB based on theater name?
    // outing.address;    // outing.city;    // outing.state;    // outing.zip;
    // outing.invitees = form.invitees;
    outing.attendees = [];
    // *** TO-DO: Access by userId instead of userName.
    outing.creator = userName;
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
    // *** TO-DO: Access by userId instead of userName.
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
      $scope.getOutings(userId);
    })
    .error(function(data, status, headers, config) {
      console.log('POST Error:', data, status, headers, config);
    });
  };

  // Function to pull from DB 'outings' for user.
  $scope.getOutings = function(userId) {
    if(userId === undefined) {
      throw new Error('Insufficient input for function.');
    }
    $http({
      method: 'GET',
      url: '/api/outings'
    })
    .success(function(data) {
      console.log('GET Success:', data);
      $scope.outings = data;
      // $scope.users = getAllUsers;
      // console.log('userNameFactory', userNameFactory(userId));
      // console.log('$scope.users:', $scope.users);
      // console.log('getAllUsers', getAllUsers);
      // console.log('getAllUsers', getAllUsers.getAllUsers2());
      // getUsers.getUser(userId).then(function() { console.log('data', data); }); // Logs an array of all outings. 
      // console.log('data',data);
    })
    .error(function(data, status, headers, config) {
      console.log('GET Error:', data, status, headers, config);
    });
  };

  // $scope.getUserName = function(userId) {
  //   // if(userId === undefined) {
  //   //   throw new Error('getUserName() must receive a user ID.');
  //   // }
  //   // $http({
  //   //   method: 'GET',
  //   //   url: '/api/user/' + userId
  //   // })
  //   // .success(function(data) {
  //   //   console.log('GET Success:', data);
  //   //   return data;
  //   // })
  //   // .error(function(data, status, headers, config) {
  //   //   console.log('GET Error:', data, status, headers, config);
  //   // });
  //   getUsers.getUser(userId).then(function(data) {
  //     console.log('data.data.name', data.data.name);
  //     return data.data.name;
  //   });
  // };

  // Initialize display of outings.
  $scope.getOutings($rootScope.user.facebookId);
  // console.log('$rootScope:', $rootScope);
}]);

// app.directive('outingCreator', function() {
//   return {
//     template: 'outings2 {{outings.name}}'
//   };
// });

// app.directive('outingCreator', function() {
//   return {
//     scope: {
//       outing: '='
//     },
//     template: 'outings2 {{outings.name}}'
//   };
// });

// app.directive('getOutingUserName', ['$scope', '$http', 'userId', function($scope, $http, userId) {
//   var answer = x;
//   scope.$watch(attrs.getUserName, function() {
//     answer = 'test';
//   }
//   return answer;
// }]);