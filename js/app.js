'use strict';

var notebird = angular.module('notebird',['ionic', 'ngAnimate','ngStorage','ng.group','ngCookies']); //'ngCordova'

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

}]);

notebird.config([ '$stateProvider', '$urlRouterProvider', '$httpProvider',  function ($stateProvider, $urlRouterProvider, $httpProvider) {
    
    $httpProvider.defaults.cache = true;
    $stateProvider
 
  	.state('splash', {
      	url: '/',
      	templateUrl: 'templates/splash.html',
  		  controller: 'SplashCtrl',
        onEnter: function($state, $localStorage){

          if($localStorage.verified){
             $state.go('app.dashboard');
          }
        }
	})

	.state('signup', {
      	url: '/signup',
      	templateUrl: 'templates/signup.html',
  		controller: 'SignupCtrl',
      onEnter: function($state, $localStorage){
          if($localStorage.verified){
             $state.go('app.dashboard');
          }
        }
	})

	.state('verify', {
      	url: '/verify',
      	templateUrl: 'templates/verify.html',
  		controller: 'VerifyController',
      onEnter: function($state, $localStorage){
          if($localStorage.verified){
             $state.go('app.dashboard');
          }
        }
	})

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'DashboardCtrl'
  })
 

  //subscribers
  .state('app.subscribers', {
      url: "/subscribers/:catId",
      views: {
        'menuContent': {
          templateUrl: "templates/subscribers.html",
          controller: 'SubscriberCtrl'
        }
      }
  })
 
  //Dashboard
  .state('app.dashboard', {
      url: "/dashboard",
      views: {
        'menuContent': {
          templateUrl: "templates/dashboard.html",
          controller: 'DashboardCtrl'
        }
      }
  })

  .state('app.category', {
      url: "/category",
      views: {
        'menuContent': {
          templateUrl: "templates/category.html",
          controller: 'CategoryCtrl'
        }
      }
  })
 
  .state('app.notifications', {
      url: "/notifications",
      views: {
        'menuContent': {
          templateUrl: "templates/notifications.html",
          controller: 'NotificationCtrl'
        }
      }
  });

  $urlRouterProvider.otherwise('/');

}]);

function myMsgClickHandler(msg){
  window.location.href="/notifications";
}