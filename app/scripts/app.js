'use strict';
/* global FB */

var app = angular.module('moviebuddyApp', ['ngRoute', 'ngCookies']);

app.config(function ($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'loginController',
      resolve: {
        checkLogin: function(authentication){
          return authentication.auth();
        }
      }
    })
    .when('/dash', {
      templateUrl: 'views/dashboard.html',
      controller: 'dashController',
      resolve: {
        checkLogin: function(authentication){
          return authentication.auth();
        }
      }
    })
    .otherwise({
      redirectTo: '/',
      templateUrl: 'views/login.html',
      controller: 'loginController'
    });
});

app.run(function($rootScope, $location) {
 // Fun Stuff
});


// authentication service, handles login and logout
app.service('authentication', function($rootScope, $location) {
  this.auth = function(){
    if (!window.document.cookie) {
      $location.path('/');
    } else {
      $location.path('/dash');
    }
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

