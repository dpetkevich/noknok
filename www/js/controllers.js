angular.module('noknok.controllers', [])

.controller('inboxController', function($scope,$state) {

  $scope.threads = [
    { sender:7136645896, recepient:2812362023, read:false, known:false, sentAs:'Wenzel Juice', senderName:'', recipientName:''},
    { sender:7136645896, recepient:2812362023, read:true, known:false, sentAs:"Kap'n Crunch", senderName:'', recipientName:'' },
    { sender:2812362023, recepient:7136645896, read:true, known:false, sentAs:"Something", senderName:'', recipientName:'Zola Quao' },
    { sender:2812362023, recepient:7136645896, read:false, known:false, sentAs:"Something", senderName:'', recipientName:'Paul Zamsky' },
    { sender:2812362023, recepient:7136645896, read:true, known:true, sentAs:"Something", senderName:'', recipientName:'Kevin Ho' },
    { sender:7136645896, recepient:2812362023, read:true, known:true, sentAs:"StrongBad", senderName:'Pat Blute', recipientName:'' },

   /*
    { sender: 'Paul Zamsky', recepient:'blank', read:false, sender_known:false, incoming:false  },
    { sender: 'Kevin Ho', recepient:'blank', read:false, sender_known:true, incoming:false  },
    { sender: 'Pat Blute', sender_codename:'Strongbad', recepient:'blank', read:false, sender_known:true, incoming:true  },
  */
  ];


})


.controller('captureController',function($scope,$rootScope,$state){

	$scope.getPhoto = function() {
		navigator.camera.getPicture(captureSuccess,captureError,
			{  quality:100, allowEdit:false, destinationType: Camera.DestinationType.DATA_URL, targetWidth: 320, targetHeight: 1120 });	
	}

	  function captureSuccess(imageData) {
	        var image = document.getElementById('myImage');
	        image.style.display = 'block';

	        $rootScope.data=imageData
   		    $rootScope.imgSrc =  "data:image/jpeg;base64," + imageData;
   		    $rootScope.$apply();
   		    
   		    
   		    
	    }


	function captureError(error) {
	    var msg = 'An error occurred during capture: ' + error.code;
	    navigator.notification.alert(msg, null, 'Uh oh!');
	}

	$scope.sendTo = function(){

			var parseFile = new Parse.File('photo.jpg', { base64: $rootScope.data });

   		    parseFile.save().then(function() {
			}, function(error) {
				alert(error + 'not saved');
			});

			var image = new Parse.Object("Image");
			image.set("user", Parse.User.current());
			image.set("data", parseFile);
			image.save();
			$state.go('sendTo');
			

	}
	

	document.addEventListener("deviceready", onDeviceReady, false);


	function onDeviceReady() {

		if ($rootScope.imgSrc==''){
			$scope.getPhoto()
		}
		

	}


})

.controller('sendToController',function($scope){

	function onSuccess(contacts) {
    alert('Found ' + contacts.length + ' contacts.' + contacts[0].displayName);
	};

	function onError(contactError) {
	    alert('onError!');
	};


	

	$scope.getContacts = function(){

	var fields = [""];
	var options = new ContactFindOptions();
	options.filter="";          // empty search string returns all contacts
	options.multiple=true;  
	navigator.contacts.find(fields, onSuccess, onError, options);

	}

	document.addEventListener("deviceready", onDeviceReady, false);


	function onDeviceReady() {

		$scope.getContacts()
	
	}


})

.controller('signUp1Controller',function($scope,$state){

	$scope.user={};
	$scope.submitted = false;
	$scope.signUp1Form={}



    

	$scope.submit = function(form) {

	$scope.emailInvalid = false;
	$scope.passwordInvalid = false;
	$scope.phoneInvalid = false;	
		if (form.$valid) {
			
    		var user = new Parse.User();
			user.set("username", $scope.user.email);
			user.set("email", $scope.user.email);
			user.set("password", $scope.user.password);
			user.set("phone", $scope.user.phone);
			 
			 
			user.signUp(null, {
			  success: function(user) {
			  	alert('signup worked')
			  	$state.go('inbox') 
				  },
			  error: function(user, error) {
			    // Show the error message somewhere and let the user try again.
			    //cover case when username is already taken
			    alert("Error: " + error.code + " " + error.message);
			  }
			});
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
})

.controller('loginController',function($scope,$state){
	$scope.user={};

	$scope.submit = function() {
		Parse.User.logIn($scope.user.email, $scope.user.password, {
  			success: function(user) {

  				$state.go('inbox')
 		 	},
  			error: function(user, error) {
    			alert('invalid credentials')
  			}
		});




	}
  


});








// Status are:
//sender_known:boolean
//read_status: boolean


