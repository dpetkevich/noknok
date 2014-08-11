angular.module('noknok.controllers', ['noknok.services.thread','noknok.services.camera'])

.controller('inboxController', function($scope,$state,thread,camera) {
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

	
	thread.getInbox().then(onSuccess,onError);

	function onSuccess(results){
		for (var i=0;i<results.length;i++)
  			{
  				$scope.threads[i]={ 
  					id:results[i].id, 
  					sender:results[i].get('sender').get('phone'), 
  					recipient:results[i].get('recipient'), 
  					read:results[i].get('read'), 
  					known: results[i].get('known'), 
  					sentAs:results[i].get('sentAs'), 
  					senderName: results[i].get('senderName'), 
  					recipientName: results[i].get('recipientName')
  				}
  			}

	}
	function onError(error){
		alert('There was an error:' + error);
	}
	
	/*
	$scope.getPhoto = function(){
		camera.capturePhoto()
              .then(function(imageSrc){
              	 $state.go('capture')

                 thread.draft.imageURL=imageSrc;
              },
              function(error){
                alert('error was '+error);
              })	
	}
	*/



/*
  var received = new Parse.Query("Thread");
  var sent = new Parse.Query("Thread");

  received.equalTo("recipient",'2812362023');

  sent.equalTo('sender',Parse.User.current())


  var mainQuery = Parse.Query.or(received, sent);
	
	mainQuery.find({
  		success: function(results) {

  			for (var i=0;i<results.length;i++)
  			{
  				$scope.threads[i]={ id:results[i].id, sender:results[i].get('sender').get('phone'), recipient:results[i].get('recipient'), read:results[i].get('read'), know: results[i].get('known'), sentAs:results[i].get('sentAs'), senderName: results[i].get('senderName'), recipientName: results[i].get('recipientName')}
  				if (results[i].get('read')==false)
  				{
  					$scope.threads[i].link='#/guess/'+results[i].id;

  				}
  				else{
  					$scope.threads[i].link='#/capture/'+results[i].id;
  				}
  				//page types
  				/*
  				view incoming photo -  read==false
  									   read==false 

  				send new photos -  read=true
				
  			}	
  			$scope.$apply()
  		},
  		error: function(error) {
    		// There was an error.
  		}
	});
	*/
})


.controller('captureController',function($scope,$rootScope,$state,thread){
	
	$scope.loaded=false;

    $scope.getPhoto = function(){

    	$scope.loaded=false;
    	
    	navigator.CustomCamera.getPicture(
        	function(imageURL){
        		if(imageURL !=''){
	        		var random = Math.random()*100;

	        		$scope.$apply(
	        			function(){
	        				$scope.imageSrc=imageURL+"?cb="+random;
	        				$scope.loaded=true;
	        			});
        		}
        		else{
        			$scope.loaded=false;
        			$state.go('inbox')
        		}

        	},
        	function(error){
        		alert('error was '+error);
        	}

      	); 


    /*
      camera.capturePhoto()
          .then(function(imageURL){
          	 alert("iamge")
             $scope.imageSrc=imageURL;
          },
          function(error){
            alert('error was '+error);
          })
    */
    }
    $scope.getPhoto()
	
})

.controller('sendToController',function($scope,$filter,$rootScope,$state){


	$scope.filterFunction = function(element){
		 return element.name.formatted.match(/^[a-zA-Z0-9\s]{1}.*$/) ? true : false;
	}

	function onSuccess(contacts) {
	    $rootScope.contacts=contacts
	    $rootScope.$apply();
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
  


})

.controller('guessController',function($scope,$state,$stateParams,$rootScope){
	

	$scope.pullPicture = function() {
			$rootScope.selectedThread={id: '', sender:'', imageData:''};
			$rootScope.selectedThread.id=$stateParams.threadId
			var Thread = Parse.Object.extend("Thread");
			var query = new Parse.Query(Thread);
			query.include("sender");
			query.get($stateParams.threadId, {
			  success: function(thread) {
			  	$rootScope.selectedThread.imageData=thread.get('image').url()
			  	$rootScope.selectedThread.sender=thread.get('sender').get('phone')
			  	thread.set('read',true)
			  	thread.save()
			  	$rootScope.$apply()
			  },
			  error: function(object, error) {
			    alert('error')
			  }
			});
	}
	$scope.pullPicture();


})

.controller('selectGuessController',function($scope,$rootScope,$ionicGesture,$state){
	
	//var element = angular.element(document.getElementsByClassName('.guessRow'));

	//$ionicGesture.on('hold', test(), element)

	$scope.data = {
    	selectedContact: ''
  	};

	function onSuccess(contacts) {
	    $scope.contacts=contacts
	    $scope.$apply();
	};

	function onError(contactError) {
	    alert('onError!');
	};


	$scope.test= function(contact){
	
		var Thread = Parse.Object.extend("Thread");
		var query = new Parse.Query(Thread);

		if (contact.phoneNumbers[0].value == $rootScope.selectedThread.sender)
		{
			//updae in db
			
			query.get($rootScope.selectedThread.id, {
			  success: function(thread) {
			  	thread.set("known",true)
			  	thread.save()
			  },
			  error: function(object, error) {
			    // The object was not retrieved successfully.
			    // error is a Parse.Error with an error code and description.
			  }
			});
			$state.go('correct');
		}
		else{
			$state.go('wrong');
		};
		
	}

	$scope.getContacts = function(){

	var fields = ["displayName","phoneNumbers"];
	var options = new ContactFindOptions();
	options.filter="";          // empty search string returns all contacts
	options.multiple=true;  
	navigator.contacts.find(fields, onSuccess, onError, options);

	}
	

	document.addEventListener("deviceready", onDeviceReady, false);


	function onDeviceReady() {
		$scope.getContacts();
	}
	


});








// Status are:
//sender_known:boolean
//read_status: boolean


