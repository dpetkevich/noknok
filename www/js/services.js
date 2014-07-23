angular.module('noknok.services', [])

.factory('camera', function($q){
  var service={};
  var deferred=$q.defer();

  service.getPhoto = function(){
      navigator.camera.getPicture(
        captureSuccess,
        captureError,
        {
         quality: 5 ,
         destinationType: Camera.DestinationType.DATA_URL,
         sourceType: Camera.PictureSourceType.CAMERA,
        }
      );   

      return deferred.promise;  
  }

  function captureSuccess(imageData) {
          //scope.imageSrc="data:image/jpeg;base64,"+imageData;
          imageSrc="data:image/jpeg;base64,"+imageData;
          deferred.resolve(imageSrc)
        }


	function captureError(error) {
	  var msg = 'An error occurred during capture: ' + error.code;
	  alert('there was an error')
	  deferred.reject(msg);
	}




 return service;
});