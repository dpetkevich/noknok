// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

/*
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
*/

Parse.initialize("GrHnBRu3j0eOTwDH7JwncoQQQpTnAyBNqoQRZWVM", "nUmLuM9usXJi9pNjBaLnZESjeVL2GAz6gZDLMOgL");


angular.module('noknok', ['ionic',"ui.router",'noknok.controllers'])

.config(function($stateProvider,$urlRouterProvider) {

  $urlRouterProvider.otherwise("/signUp1")

  $stateProvider
  .state("inbox", {
    url: "/inbox",
    templateUrl: "partials/inbox.html",
    controller: 'inboxController'
  })

  .state("capture", {
    url: "/capture",
    templateUrl: "partials/capture.html",
    controller: 'captureController'
  })

  .state("guess", {
    url: "/guess",
    templateUrl: "partials/guess.html",
    controller: 'guessController'
  })

  .state("selectGuess", {
    url: "/selectGuess",
    templateUrl: "partials/selectGuess.html"
  })

  .state("sendTo", {
    url: "/sendTo",
    templateUrl: "partials/sendTo.html",
    controller: 'sendToController'
  })
  // sign up views
  .state("signUp1", {
    url: "/signUp1",
    templateUrl: "partials/signUp/signUp1.html",
    controller: "signUp1Controller"
  });

//$urlRouterProvider.otherwise('inbox');
  
});