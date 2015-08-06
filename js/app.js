'use strict';

var notebird = angular.module('notebird',['ionic','ngAnimate','ngStorage','ng.group','ngCookies']);

notebird.config([ '$stateProvider', '$urlRouterProvider', '$httpProvider',  function ($stateProvider, $urlRouterProvider, $httpProvider) {
    
    $httpProvider.defaults.cache = true;
    $stateProvider
 
  	.state('splash', {
      	url: '/',
      	templateUrl: 'templates/splash.html',
  		  controller: 'SplashCtrl',
        onEnter: function($state, Auth){
          if(!Auth.isLoggedIn()){
             $state.go('dashboard');
          }
        }
	})

	.state('signup', {
      	url: '/signup',
      	templateUrl: 'templates/signup.html',
  		controller: 'SignupCtrl',
      onEnter: function($state, Auth){
          if(!Auth.isLoggedIn()){
             $state.go('dashboard');
          }
        }
	})

	.state('verify', {
      	url: '/verify',
      	templateUrl: 'templates/verify.html',
  		controller: 'VerifyController',
      onEnter: function($state, Auth){
          if(!Auth.isLoggedIn()){
             $state.go('dashboard');
          }
        }
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

}]);

notebird.run(['$ionicPlatform','$localStorage','PushNotificationsService', function($ionicPlatform,$localStorage,PushNotificationsService) {
  
  $ionicPlatform.on("deviceready", function(){
    
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
 
  });

  $ionicPlatform.on("resume", function(){
    
      var tagName = (typeof $localStorage.phone != 'undefined') ? $localStorage.phone : false;

      if(tagName)
      {
        PushNotificationsService.register(tagName);
      }
  });

}])