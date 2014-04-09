'use strict';

var app = angular.module('moviebuddyApp', ['ngRoute', 'ngCookies', 'xeditable']);

app.config(function ($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'LoginController',
      resolve: {
        checkLogin: function(authentication){
          return authentication.auth();
        }
      }
    })
    .when('/dash', {
      templateUrl: 'views/dashboard.html',
      controller: 'DashController',
      resolve: {
        checkLogin: function(authentication){
          return authentication.auth();
        }
      }
    })
    .otherwise({
      redirectTo: '/',
      templateUrl: 'views/login.html',
      controller: 'LoginController',
      resolve: {
        checkLogin: function(authentication){
          return authentication.auth();
        }
      }
    });
});

app.run(function($rootScope, $location) {
 // Fun Stuff
});


// authentication service, handles login and logout
app.service('authentication', function($rootScope, $location, $http) {
  var cookieParser = function(cookie) {
    var splitCookie = cookie.split(';');
    for (var i = 0; i < splitCookie.length; i++){

      var leftSide = splitCookie[i].split('=')[0];
      var rightSide = splitCookie[i].split('=')[1];

      if (rightSide === 'undefined') {
        console.log(JSON.stringify(leftSide));
        // console.log('left side parser: ', JSON.parse(leftSide));
      }

      if( leftSide === ' moviebuddy') {
        console.log('this is the right side: '+ rightSide);
        return JSON.parse(rightSide);
      }

    }
  };

  this.auth = function(){
    return $http({
      method: 'GET',
      url: '/auth/isLoggedIn'
    })
    .then(function(response){
      if (response.data === 'false') {
        $location.path('/');
      }
      if (window.document.cookie !== '') {
        console.log(window.document.cookie);
        var userObj = cookieParser(window.document.cookie);
        console.log('userObj: ', userObj);
        $rootScope.user = userObj;
      }
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

