'use strict';

angular
  .module('moviebuddyApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .directive('fb', ['$FB', function($FB) {
    return {
      restrict: "E",
      replace: true,
      template: "<div id='fb-root'></div>",
      compile: function(tElem, tAttrs) {
        return {
          post: function(scope, iElem, iAttrs, controller) {
            var fbAppId = iAttrs.appId || '';
            var fb_params = {
              appId: iAttrs.appId || "",
              cookie: iAttrs.cookie || true,
              status: iAttrs.status || true,
              xfbml: iAttrs.xfbml || true
            };

            // Setup the post-load callback
            window.fbAsyncInit = function() {
              $FB._init(fb_params);
              if('fbInit' in iAttrs) {
                  iAttrs.fbInit();
              }
            };

            (function(d, s, id, fbAppId) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id; js.async = true;
              js.src = "//connect.facebook.net/en_US/all.js";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk', fbAppId));
          }
        };
      }
    };
  }])
  .factory('$FB', ['$rootScope', function($rootScope) {
    var fbLoaded = false;

    // Our own customisations
    var _fb =  {
      loaded: fbLoaded,
      isLoaded : function(){
          return this.loaded;
      },
      authenticated : false,
      isAuthenticated : function(){
          return this.authenticated;
      },
      _init: function(params) {
        var self = this;
        if(window.FB) {

          // FIXME: Ugly hack to maintain both window.FB
          // and our AngularJS-wrapped $FB with our customisations
          angular.extend(window.FB, this);
          angular.extend(this, window.FB);

          // Set the flag
          this.loaded = true;

          // Initialise FB SDK
          window.FB.init(params);
          window.FB.Event.subscribe('auth.authResponseChange', function(response) {
            if (response.status === 'connected') {
              self.authenticated = true;
            }
          });

          if(!$rootScope.$$phase) {
            $rootScope.$apply();
          }
        }
      }
    };

    return _fb;
  }]);
