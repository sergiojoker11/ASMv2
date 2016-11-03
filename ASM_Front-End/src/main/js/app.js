'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'asm.homeController',
  'asm.view1Controller'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'menu/home.html',
            controller: 'homeController'
        })
        .when('/view1', {
            templateUrl: 'menu/view1.html',
            controller: 'view1Controller'
        })
        .otherwise({redirectTo: '/home'});
        
        // enable html5Mode for pushstate ('#'-less URLs)
    $locationProvider.html5Mode(true);
}]);
