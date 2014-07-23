angular.module('noknok.directives', ['noknok.services'])

.directive('camera', function(camera) {
   return {
      restrict: 'A',
      link: function link(scope, element, attrs){

      document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady() {

          getPhoto()
          
        };

      scope.$on('retakePhoto',function(){
              getPhoto()
      });

        getPhoto = function(){
          camera.getPhoto()
              .then(function(imageSrc){
                 scope.imageSrc=imageSrc;
              },
              function(error){
                alert('error was '+error);
              })
        }

      }

   };
});