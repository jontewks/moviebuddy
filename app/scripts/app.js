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
  // $rootScope.Facebook = Facebook;
  $rootScope.loggedIn = false;

  $rootScope.$watch('loggedIn', function(){
    console.log('watching logged in');
    if ($rootScope.loggedIn === true) {
      console.log('lets go to dash');
      $location.path('/dash');
    } else {
      console.log('lets go to login');
      $location.path('/login');
    }
  });

  // $rootScope.$on( "$routeChangeStart", function(event, next, current) {
  //   console.log('hitting auth');
  //   if (authentication.loggedIn) {

  //     $location.path('/dash');
  //   } else {
  //     $location.path('/');
  //   }
  // });
});

app.service('authentication', function($rootScope) {

  this.fbLogin = function(){
    return FB.login(function(response){
      if (response.authResponse){
        FB.api('/me', function(response){
          $rootScope.me = response;

        });
        $rootScope.loggedIn = true;
      }
    });
  };

  this.fbLogout = function(){
    FB.logout(function() {
      console.log('hitting the logout baby');
      $rootScope.loggedIn = false;
    });
  };

  
});



// app.factory('Facebook', function($location) {
//   var self = this;

//   return {
//     auth : null,
//     loggedIn : false,
//     getAuth: function() {
//       return self.auth;
//     },
//     login: function(callback) {
//       FB.login(function(response) {
//         if (response.authResponse) {
//           this.auth = response.authResponse;
//           this.loggedIn = true;
//           // console.log('in login success callback, response = ', response);
//           // console.log('self = ', self); 
//           // FB.api('/me', function(response){
//           //   console.log('me object = ',response);
//           //   /*
//           //   FIX MEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
//           //    */
//           // });
//         } else {
//           console.log('Facebook login failed', response);
//         }
//       }, {scope: 'basic_info, email, user_location'});

//     },
//     logout: function() {
//       FB.logout(function(response) {
//         if (response) {
//           self.auth = null;
//         } else {
//           console.log('Facebook logout failed.', response);
//         }
//       });
//     }
//   };
// });

window.fbAsyncInit = function() {
  FB.init({
    appId: '1391051064505902'
  });
};

// Load the SDK Asynchronously
(function(d){
  var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = '//connect.facebook.net/en_US/all.js';
  ref.parentNode.insertBefore(js, ref);
}(document));

