angular.module('noknok.services.thread', [])

.factory('thread', function($q){
  var service={
    draft:
      {
        imageURL:''
      }
  };
  var deferred=$q.defer();
 
  //instantiate query variables
  var received = new Parse.Query("Thread");
  var sent = new Parse.Query("Thread");

  //set query filters
  received.equalTo("recipient",'2812362023');
  sent.equalTo('sender',Parse.User.current())

  // instantiate compound query
  var mainQuery = Parse.Query.or(received, sent); 

  // BEGIN: getInbox

  service.getInbox= function(){
    mainQuery.find(onSuccess,onError);
    return deferred.promise;
  };
  
  // compound query callback functions

  function onSuccess(results){
    deferred.resolve(results)
  }

  function onError(error){
    deferred.resolve(error)
  }

  // END getInbox

  // BEGIN: 

  return service

});