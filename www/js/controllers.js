angular.module('noknok.controllers', [])

.controller('inboxController', function($scope,$state,$rootScope) {
	/*
  $scope.threads = [
    { sender:7136645896, recepient:2812362023, read:false, known:false, sentAs:'Wenzel Juice', senderName:'', recipientName:''},
    { sender:7136645896, recepient:2812362023, read:true, known:false, sentAs:"Kap'n Crunch", senderName:'', recipientName:'' },
    { sender:2812362023, recepient:7136645896, read:true, known:false, sentAs:"Something", senderName:'', recipientName:'Zola Quao' },
    { sender:2812362023, recepient:7136645896, read:false, known:false, sentAs:"Something", senderName:'', recipientName:'Paul Zamsky' },
    { sender:2812362023, recepient:7136645896, read:true, known:true, sentAs:"Something", senderName:'', recipientName:'Kevin Ho' },
    { sender:7136645896, recepient:2812362023, read:true, known:true, sentAs:"StrongBad", senderName:'Pat Blute', recipientName:'' },
  ];
*/
  $scope.threads = [];
  var received = new Parse.Query("Thread");
  var sent = new Parse.Query("Thread");




  //received.equalTo("recipient",Parse.User.current().get('phone'));
  received.equalTo("recipient",'2812362023');

  sent.equalTo('sender',Parse.User.current())


  var mainQuery = Parse.Query.or(received, sent);
	
	mainQuery.find({
  		success: function(results) {
  			for (var i=0;i<results.length;i++)
  			{
  				$scope.threads[i]={ id:results[i].get('objectId'), sender:results[i].get('sender').get('phone'), recipient:results[i].get('recipient'), read:results[i].get('read'), know: results[i].get('known'), sentAs:results[i].get('sentAs'), senderName: results[i].get('senderName'), recipientName: results[i].get('recipientName')}
  			}	
  			$scope.$apply()
  		},
  		error: function(error) {
    		// There was an error.
  		}
	});
})


.controller('captureController',function($scope,$rootScope,$state,$document){

	
	$scope.getPhoto = function() {

		navigator.camera.getPicture(captureSuccess,captureError,
			{  quality: 10, destinationType: Camera.DestinationType.DATA_URL });	
	}
	
	//file uri function
	/*
	$scope.getPhoto = function() {
		navigator.camera.getPicture(captureSuccess,captureError,
			{  quality:50, destinationType: Camera.DestinationType.FILE_URI });	
			//targetWidth: 320, targetHeight: 1120
	}
	
	*/
	  function captureSuccess(imageData) {

	        var image = document.getElementById('myImage');

	       // $rootScope.imgSrc='';
   		    $rootScope.data=imageData;
   		   	$rootScope.imgSrc =  "data:image/jpeg;base64," + imageData;
			$rootScope.$apply()		
	    }
	
	 /*

	function captureSuccess(imageURI) {
	        var image = document.getElementById('myImage');
	        image.style.display = 'block';
	        image.style.width = '320px'

   		    
   		   	$rootScope.imgSrc = imageURI
   		   	$rootScope.$apply()
   		   	alert($rootScope.imgSrc)
		
	    }
	 */

	function captureError(error) {
	    var msg = 'An error occurred during capture: ' + error.code;
	    alert('there was an error')
	}

	
	

	document.addEventListener("deviceready", onDeviceReady, false);


	function onDeviceReady() {
		$document.ready(function() {
			$scope.getPhoto();
		  });
		
		

	}


})

.controller('sendToController',function($scope,$filter,$rootScope,$state){


	function onSuccess(contacts) {
	    $scope.contacts=contacts
	    $scope.$apply();
	};

	function onError(contactError) {
	    alert('onError!');
	};


	

	$scope.getContacts = function(){

	var fields = ["displayName","phoneNumbers"];
	var options = new ContactFindOptions();
	options.filter="";          // empty search string returns all contacts
	options.multiple=true;  
	navigator.contacts.find(fields, onSuccess, onError, options);

	}

	$scope.selectedCount = 0;
    $scope.selected = function(contact){
    	
    	if(contact.contactBox){
    		$scope.selectedCount++;

    	}
    	else{
    		$scope.selectedCount--;

    	};
      $scope.$apply();
      
    };

    $scope.createThread = function(contacts){

		var selectedContacts=$filter('filter')(contacts,{contactBox:true});
		for(var i=0;i<selectedContacts.length;i++)
		{	
			var Thread = Parse.Object.extend("Thread");
			var thread = new Thread();
			
			var image = new Parse.File('photo.jpg', { base64: $rootScope.data });

   		    image.save().then(function() {
   		    	alert('image saved')
			}, function(error) {
				alert(error + 'not saved');
			});
			
			thread.set('sender',Parse.User.current())
			thread.set('recipient', selectedContacts[i].phoneNumbers[0].value)
			thread.set('read',false)
			thread.set('known',false)
			thread.set('sentAs','Mr. Higgins')
			thread.set('senderName','')
			thread.set('recipientName',selectedContacts[i].displayName)
			thread.set('image',image)


 
			thread.save(null, {
			  success: function(thread) {
			    // Execute any logic that should take place after the object is saved.
			    alert('New object created with objectId: ' + thread.id);
			  },
			  error: function(thread, error) {
			    // Execute any logic that should take place if the save fails.
			    // error is a Parse.Error with an error code and description.
			    alert('Failed to create new object, with error code: ' + error.message);
			  }
			});
		}
		//$rootScope.data=''
		$state.go('inbox')


    };

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


