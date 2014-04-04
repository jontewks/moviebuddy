function UserCtrl(
  $scope,
  $FB) {

  $scope.$watch(function() {
    return $FB.isLoaded()
  },function(value){

    console.log("VALUE",value);
    // It needs authentication, this won't work.
    if(value){
      $scope.facebook_friends = $FB.api('/friend_list', function(response) {
        $scope.facebook_friends = response.data;
      });
    }
  },true);


  $scope.$watch(function() {
    return $FB.isAuthenticated()
  },function(value){

    console.log("VALUE isAuthenticated",value);
    // YEP, this will work.
    if(value){
      $scope.facebook_friends = $FB.api('/me/friends', function(response) {
        $scope.facebook_friends = response.data;
        console.log("FRIENDS",response);
      });
    }
  },true);
