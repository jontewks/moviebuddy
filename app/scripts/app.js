'use strict';

var app = angular.module('moviebuddyApp', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/dashboard.html',
      controller: 'dashController'
    })
    .otherwise({
      redirectTo: '/login',
      templateUrl: 'views/login.html',
      controller: 'loginController'
    });
});

app.run(function($rootScope, Facebook) {
  $rootScope.Facebook = Facebook;
});

app.factory('Facebook', function() {
  var self = this;
  this.auth = null;

  return {
    getAuth: function() {
      return self.auth;
    },
    login: function() {
      FB.login(function(response) {
        if (response.authResponse) {
          self.auth = response.authResponse;
          console.log("in login success callback, response = ", response);
          console.log("self = ", self);
          FB.api('/me', function(response){
            console.log("me object = ",response);
            /*

            FIX MEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
             */
          });
        } else {
          console.log('Facebook login failed', response);
        }
      }, {scope: "basic_info, email, user_location"});
    },
    logout: function() {
      FB.logout(function(response) {
        if (response) {
          self.auth = null;
        } else {
          console.log('Facebook logout failed.', response);
        }
      });
    }
  };
});

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
  js.src = "//connect.facebook.net/en_US/all.js";
  ref.parentNode.insertBefore(js, ref);
}(document));

