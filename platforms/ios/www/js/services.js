angular.module('noknok.services', [])

.factory('camera', function($q){
  var service={};
  var deferred=$q.defer();

  service.capturePhoto = function(){
      //alert('infunction');
      
      navigator.CustomCamera.getPicture(
        captureSuccess,
        captureError 
      );   
      
  
  }

  function captureSuccess(imageURL) {
          //scope.imageSrc="data:image/jpeg;base64,"+imageData;
          imageSrc=imageData;
          deferred.resolve(imageSrc)
        }


	function captureError() {
	  var msg = 'An error occurred during capture';
	  alert('there was an error')
	  deferred.reject(msg);
	}




 return service;
});