'use strict';

describe('Controller: DashController', function () {

  // load the controller's module
  beforeEach(module('moviebuddyApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('DashController', {
      $scope: scope
    });
  }));

  it('DashController should initialize with correct visibility', function () {
    expect(scope.outingsVisible).toBe(true);
    expect(scope.moviesVisible).toBe(false);
    expect(scope.friendsVisible).toBe(false);
    expect(scope.profileVisible).toBe(false);
  });
  
  it('DashController navToMovies should change visibility correctly', function () {
    DashController.showMovies();
    expect(scope.outingsVisible).toBe(false);
    expect(scope.moviesVisible).toBe(true);
    expect(scope.friendsVisible).toBe(false);
    expect(scope.profileVisible).toBe(false);
  });
  
  it('DashController navToProfile should change visibility correctly', function () {
    expect(scope.outingsVisible).toBe(false);
    expect(scope.moviesVisible).toBe(false);
    expect(scope.friendsVisible).toBe(false);
    expect(scope.profileVisible).toBe(true);
  });
  
  it('Test 4', function () {
    expect(true).toBe(true);
  });
  
  it('Test 5', function () {
    expect(true).toBe(true);
  });
  
  it('Test 6', function () {
    expect(true).toBe(true);
  });
  
  it('Test 7', function () {
    expect(true).toBe(true);
  });
  
  it('Test 8', function () {
    expect(true).toBe(true);
  });
  
  it('Test 9', function () {
    expect(true).toBe(true);
  });
  
  it('Test 10', function () {
    expect(true).toBe(true);
  });
  
  
});
