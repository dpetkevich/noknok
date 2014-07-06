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

.controller('signUp1Controller',function($scope){

	$scope.user={};
	$scope.submitted = false;
	$scope.signUp1Form={}



    

	$scope.submit = function(form) {

	$scope.emailInvalid = false;
	$scope.passwordInvalid = false;
	$scope.phoneInvalid = false;	
		if (form.$valid) {
		    alert('wazzow')
			/*
    		var user = new Parse.User();
			user.set("username", $scope.user.email);
			user.set("email", $scope.user.email);
			user.set("password", $scope.user.password);
			user.set("phone", $scope.user.phone);
			 
			 
			user.signUp(null, {
			  success: function(user) {
			  	alert('signup worked')
				  },
			  error: function(user, error) {
			    // Show the error message somewhere and let the user try again.
			    //cover case when username is already taken
			    alert("Error: " + error.code + " " + error.message);
			  }
			});
			*/
    	}
    	if (!form.email.$valid) {
      		$scope.emailInvalid = true;
    	} 
    	
    	if (!form.password.$valid) {
      		$scope.passwordInvalid = true;
    	}  
    	if( !form.phone.$valid) {
      		$scope.phoneInvalid = true;

    	};  
    	
    }


});








// Status are:
//sender_known:boolean
//read_status: boolean


