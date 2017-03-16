// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var example = angular.module('starter', ['ionic','ngSanitize','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

example.controller("ExampleController", function($scope){
    
   $scope.myHTML = 'This website has been created in Ionic framework.Check more about ionic <a href = "https://ionicframework.com/docs/">here.</a>'; 
});

example.controller("batController", function($scope, $rootScope, $ionicPlatform, $cordovaBatteryStatus) {
 
    $ionicPlatform.ready(function() {
        $rootScope.$on("$cordovaBatteryStatus:status", function(event, args) {
            if(args.isPlugged) {
                alert("Charging -> " + args.level + "%");
            } else {
                alert("Battery -> " + args.level + "%");
            }
        });
    });
 
});
