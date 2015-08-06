'use strict';

var notebird = angular.module('notebird',['ionic','ngAnimate','ngStorage','ng.group','ngCookies']);

notebird.config([ '$stateProvider', '$urlRouterProvider', '$httpProvider',  function ($stateProvider, $urlRouterProvider, $httpProvider) {
    
    $httpProvider.defaults.cache = true;
    $stateProvider
 
  	.state('splash', {
      	url: '/',
      	templateUrl: 'templates/splash.html',
  		controller: 'SplashCtrl'
	})

	.state('signup', {
      	url: '/signup',
      	templateUrl: 'templates/signup.html',
  		controller: 'SignupCtrl'
	})

	.state('verify', {
      	url: '/verify',
      	templateUrl: 'templates/verify.html',
  		controller: 'VerifyController'
	})
  .state('subscribers', {
        url: '/subscribers/:catId',
        templateUrl: 'templates/subscribers.html',
      controller: 'SubscriberCtrl'
  })
  .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'templates/dashboard.html',
      controller: 'DashboardCtrl'
  })
  .state('category', {
        url: '/category',
        templateUrl: 'templates/category.html',
        controller: 'CategoryCtrl'
  });
 

    $urlRouterProvider.otherwise('/');

}])