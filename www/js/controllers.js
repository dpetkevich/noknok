angular.module('noknok.controllers', [])

.controller('inboxController', function($scope,$state) {

  $scope.threads = [
    { sender: 'Wenzel Juice', recepient:'blank', read:false, sender_known:false, incoming:true  },
    { sender: "Kap'n Crunch", recepient:'blank', read:false, sender_known:false, incoming:true  },
    { sender: 'Zola Quao', recepient:'blank', read:true, sender_known:false, incoming:false  },
    { sender: 'Paul Zamsky', recepient:'blank', read:false, sender_known:false, incoming:false  },
    { sender: 'Kevin Ho', recepient:'blank', read:false, sender_known:true, incoming:false  },
    { sender: 'Pat Blute', sender_codename:'Strongbad', recepient:'blank', read:false, sender_known:true, incoming:true  },
  ];


})


.controller('captureController',function($scope){

	$scope.getPhoto = function() {
		navigator.camera.getPicture(captureSuccess,captureError,
			{  quality: 100, destinationType: Camera.DestinationType.DATA_URL, targetWidth: 430, targetHeight: 1120 });	
	}

	  function captureSuccess(imageData) {
	        var image = document.getElementById('myImage');
	        image.style.display = 'block';

   		    image.src =  "data:image/jpeg;base64," + imageData;


	    }


	function captureError(error) {
	    var msg = 'An error occurred during capture: ' + error.code;
	    navigator.notification.alert(msg, null, 'Uh oh!');
	}
	

	document.addEventListener("deviceready", onDeviceReady, false);

	function onDeviceReady() {
		$scope.getPhoto()
	}


})

.controller('sendToController',function($scope){




})

.controller('guessController',function($scope){




})






;








// Status are:
//sender_known:boolean
//read_status: boolean


