angular.module('noknok.routes', [,"ui.router",'noknok.controllers'])

.config(function($stateProvider,$urlRouterProvider) {

  currentUser = Parse.User.current();
    if(currentUser) {
      $urlRouterProvider.otherwise("/wrong")
    }
    else {
      $urlRouterProvider.otherwise("/login")
    }

  
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
    url: "/guess/:threadId",
    templateUrl: "partials/guess.html",
    controller: 'guessController'
  })

  .state("selectGuess", {
    url: "/selectGuess",
    templateUrl: "partials/selectGuess.html",
    controller:'selectGuessController'
  })

  .state("sendTo", {
    url: "/sendTo",
    templateUrl: "partials/sendTo.html",
    controller: 'sendToController'
  })

  .state("login", {
    url: "/login",
    templateUrl: "partials/login.html",
    controller: "loginController"
  })

  .state("home", {
    url: "/login",
    templateUrl: "partials/login.html",
    controller: "loginController"
  })

  .state("correct", {
    url: "/correct",
    templateUrl: "partials/correct.html",
   // controller: "loginController"
  })

  .state("wrong", {
    url: "/wrong",
    templateUrl: "partials/wrong.html",
   // controller: "loginController"
  })

  // sign up views
  .state("signUp1", {
    url: "/signUp1",
    templateUrl: "partials/signUp/signUp1.html",
    controller: "signUp1Controller"
  });

  
});