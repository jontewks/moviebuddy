'use strict';
/* global FB */

var app = angular.module('moviebuddyApp', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'loginController'
    })
    .when('/dash', {
      templateUrl: 'views/dashboard.html',
      controller: 'dashController'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'loginController'
    })
    .otherwise({
      redirectTo: '/',
      templateUrl: 'views/login.html',
      controller: 'loginController'
    });
});

app.run(function($rootScope, $location) {
  $rootScope.loggedIn = false;

  window.fbAsyncInit = function() {
    FB.init({
      appId: '1391051064505902'
    });
  };

  $rootScope.$watch('loggedIn', function(){
    console.log('rootscope.loggedin: ' + $rootScope.loggedIn);
    if ($rootScope.loggedIn === true) {
      $location.path('/dash');
    } else {
      $location.path('/');
    }
  });
});

app.service('authentication', function($rootScope) {

  this.fbLogin = function(){
    FB.login(function(response){
      if (response.authResponse){
        FB.api('/me', function(response){
          $rootScope.me = response;
          $rootScope.loggedIn = true;
          $rootScope.$apply();
        });
      }
    });
  };

  this.fbLogout = function(){
    FB.logout(function() {
      console.log('hitting the logout baby');
      $rootScope.loggedIn = false;
      $rootScope.$apply();
    });
  };

});


// Load the SDK Asynchronously
(function(d){
  var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = '//connect.facebook.net/en_US/all.js';
  ref.parentNode.insertBefore(js, ref);
}(document));

