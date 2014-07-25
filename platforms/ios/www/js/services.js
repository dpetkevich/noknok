angular.module('noknok.services', [])

.factory('camera', function($q){
  var service={};
  var deferred=$q.defer();

  service.capturePhoto = function(){
      
      navigator.CustomCamera.getPicture(
        captureSuccess,
        captureError 
      );   
      
      return deferred.promise;
  
  }

  function captureSuccess(imageURL) {
          //alert('imageURl is' + imageURL)
          var imageSrc=imageURL;
          deferred.resolve(imageSrc)
        }


	function captureError() {
	  var msg = 'An error occurred during capture';
	  alert('there was an error')
	  deferred.reject(msg);
	}




 return service;
});