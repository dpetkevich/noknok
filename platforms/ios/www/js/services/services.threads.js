angular.module('noknok.services.threads', [])

.factory('threads', function($q){

  var deferred=$q.defer();
 
  //instantiate query variables
  var received, sent = new Parse.Query("Thread");

  //set query filters
  received.equalTo("recipient",'2812362023');
  sent.equalTo('sender',Parse.User.current())

  // instantiate compound query
  var mainQuery = Parse.Query.or(received, sent); 

  // compound query 

  service.getInbox= function(){
    mainQuery.find(onSuccess,onError);
    return deferred.promise;
  });
  
  // compound query callback functions

  function onSuccess(results){
    deferred.resolve(results)
  }

  function onError(error){
    deferred.resolve(error)
  }


});