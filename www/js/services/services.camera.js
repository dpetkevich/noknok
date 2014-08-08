angular.module('noknok.services.camera', [])

.factory('camera', function($q,$state){
  var service={};
  var deferred= $q.defer();


  service.capturePhoto = function(){
      alert('deferred.promise' + deferred.promise)

      navigator.CustomCamera.getPicture(
        captureSuccess,
        captureError 
      );   
      return deferred.promise;
  }

  function captureSuccess(imageURL) {
          if(imageURL != ''){
            var imageSrc=imageURL;
            deferred.resolve(imageSrc)

          }
          else{
            $state.go('inbox')
          }
        }

	function captureError() {
	  var msg = 'An error occurred during capture';
	  alert('there was an error')
	  deferred.reject(msg);
	}

 

 return service;

});

