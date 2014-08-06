/*
angular.module('noknok.directives', ['noknok.services.camera'])

.directive('camera', function(camera) {
   return {
      restrict: 'A',
      link: function link(scope, element, attrs){

      scope.$on('retakePhoto',function(){
              scope.imageSrc=''
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

      }

   };
});
*/