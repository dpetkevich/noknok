angular.module('noknok.directives', [])

.directive('camera', function() {
   return {
      restrict: 'A',
      link: function link(scope, element, attrs){

      document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady() {
            getPhoto();
        };

        function getPhoto() {
          navigator.camera.getPicture(
            captureSuccess,
            captureError,
            {
             quality: 5 ,
             destinationType: Camera.DestinationType.DATA_URL,
             sourceType: Camera.PictureSourceType.CAMERA,
            }
          );  
        }

        function captureSuccess(imageData) {
          //scope.imageSrc="data:image/jpeg;base64,"+imageData;
          scope.imageSrc="data:image/jpeg;base64,"+imageData;
          scope.$apply()
        }


        function captureError(error) {
          var msg = 'An error occurred during capture: ' + error.code;
          alert('there was an error')
        }

      }
   };
});