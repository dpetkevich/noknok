angular.module('noknok.directives', ['noknok.services'])

.directive('camera', function(camera) {
   return {
      restrict: 'A',
      link: function link(scope, element, attrs){

      //document.addEventListener("deviceready", onDeviceReady, false);


          
        

      scope.$on('retakePhoto',function(){
              getPhoto()
      });

        getPhoto = function(){
          camera.capturePhoto()
              .then(function(imageSrc){
                 scope.imageSrc=imageSrc;
              },
              function(error){
                alert('error was '+error);
              })
        }

        getPhoto()


      }

   };
});