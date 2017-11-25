'use strict';

/* Controllers */
var musicApp = angular.module("musicApp");


(function () {


var MediaCtrl = function($scope,$http,$log,$sce,$timeout,JukeBoxServiceTwo,$route,$window, $q,$filter,$base64,$cookies,$location,$rootScope, $modal,Notification,datfactory,$interval,SocketFactory,_){
 
 
 //time out flag to control add remove in slick slider flag is also set in http calls
 $timeout(function(){
 $scope.albumcollectionchange =true;
 }, 500);
 
 
 $timeout(function(){
 $scope.getspud =true;
 }, 500);
 
 
	  
  $scope.spud =[];
  
  $scope.getUserData = function(paramUserId,paramIndex) {
	  $scope.getspud =false;
	  delete $scope.spud[paramIndex];
	
	datfactory.getlistTwo('/MakeAlbum/userAlbums/',paramUserId)
			.then(function(arrItems){   
			
			
			$scope.spud[paramIndex] = arrItems;
			
			$scope.getspud =true;
			 
			$('.slick-media').slick('unslick').slick('reinit');
			 
			
			
	})
			delete $scope.spud[paramIndex];
  };
  
 

//socket notifications for when users 
//receive albums,play tracks, play albums
SocketFactory.on('notificationSendAlbum', function(data) {
	 console.log('SocketFactory.on notificationSendAlbum called');
     console.log(data);
	 console.log('SocketFactory.on notificationSendAlbumcalled'); 
  
  for (var x=0;x<data.usersSent.length;x++){
     if (data.usersSent[x].uid==$scope.myCurrentUser._id){
		
          var albumSentByName = JukeBoxServiceTwo.GetUserName($scope.myUsersListTwo.users,'_id',data.sentBy);

		  Notification.success({message: data.sentType.message + " " + data.albumInfoSent.listname + " by " + albumSentByName, positionX: 'center',delay:10000});
	
	 }
	
	
	};
	 
	
		$scope.myUsersListTwo.users = [];
		$scope.getUsersTwo();
		$scope.sl2Updated = false;
		$scope.songListsTwo = [];
		$scope.receivedSongLists=[];
		$scope.allSongLists=[];
        $scope.myNotifications=[]; 
		$scope.getServerData();
	
	 
}); 
 
 
//
//
//
 
 //
 //Playing Track From Album
 //
 SocketFactory.on('notificationUPT', function(data) {
     
	 //console.log('notificationUPT');
     //console.log(data);
	 //console.log('notificationUPT');
	
	   var userPlayingAlbumName = JukeBoxServiceTwo.GetUserName($scope.myUsersListTwo.users,'_id',data.receivedBy);
	   var albumCreatedByName = JukeBoxServiceTwo.GetUserName($scope.myUsersListTwo.users,'_id',data.sentBy);
	  
	  
	  Notification.success({message: userPlayingAlbumName + ' Playing Track ' + data.albumInfoSent.trackInfo.title + ' From ' + data.albumInfoSent.albumInfo.listname + ' created by ' + albumCreatedByName , positionX: 'center',delay:10000});
	    
		$scope.sl2Updated = false;
		$scope.songListsTwo = [];
		$scope.receivedSongLists=[];
		$scope.allSongLists=[];
        $scope.myNotifications=[]; 
		$scope.getServerData();
	 
 }); 
  //
    // playing track from album
 //
 
  //
   //Playing  Album
 //
 SocketFactory.on('notificationUPA', function(data) {
     
	 //console.log('notificationUPA');
     //console.log(data);
	 //console.log('notificationUPA');
	
	  var userPlayingAlbumName = JukeBoxServiceTwo.GetUserName($scope.myUsersListTwo.users,'_id',data.receivedBy);
	  var albumCreatedByName = JukeBoxServiceTwo.GetUserName($scope.myUsersListTwo.users,'_id',data.sentBy);
	  //console.log('userPlayingAlbum');
	  //console.log(userPlayingAlbum);
	  //console.log('userPlayingAlbum');
	  Notification.success({message: userPlayingAlbumName  + ' Playing ' + data.albumInfoSent.albumInfo.listname + ' created by ' + albumCreatedByName, positionX: 'center',delay:10000});
	  
	    
		$scope.sl2Updated = false;
		$scope.songListsTwo = [];
		$scope.receivedSongLists=[];
		$scope.allSongLists=[];
        $scope.myNotifications=[]; 
		$scope.getServerData();
	 
 }); 
  //
   //Playing  Album
 //
 
 
 
  //
   // notificationShareAlbum
 // 
 
SocketFactory.on('notificationShareAlbum', function(data) {
	 
    //console.log('$scope.myUsersList.users.length' );
	//console.log($scope.myUsersList);
	//console.log($scope.myUsersList.users.length);
	//console.log('$scope.myUsersList.users.length' );
	

          var albumSharedByName = JukeBoxServiceTwo.GetUserName($scope.myUsersListTwo.users,'_id',data.sharedBy);

		   Notification.success({message:albumSharedByName + ' Shared To Public Collection ' + data.albumInfoSent.listname, positionX: 'center',delay:10000});
    

        $scope.sl2Updated = false;
		$scope.songListsTwo = [];
		$scope.receivedSongLists=[];
		$scope.allSongLists=[];
        $scope.myNotifications=[];
		$scope.getServerData();
	 
}); 
 
  //
   //notificationShareAlbum
 // 
 
 
 
  //
 //Playing Track From Album
 //
 SocketFactory.on('notificationVoteAlbum', function(data) {
     
	 //console.log('notificationVoteAlbum');
     //console.log(data);
	 //console.log('notificationVoteAlbum');
	    
	    var userVotingAlbumName = JukeBoxServiceTwo.GetUserName($scope.myUsersListTwo.users,'_id',data.votedBy);
	   
	   var albumCreatedByName = JukeBoxServiceTwo.GetUserName($scope.myUsersListTwo.users,'_id',data.albumInfoSent.createdBy);
	  
	  
	 
	  
	  
	  Notification.success({message: userVotingAlbumName + ' Voted On Album ' + data.albumInfoSent.listname + ' created by ' + albumCreatedByName , positionX: 'center',delay:10000});
	    $scope.myUsersListTwo.users = [];
		$scope.getUsersTwo();
		$scope.sl2Updated = false;
		$scope.songListsTwo = [];
		$scope.receivedSongLists=[];
		$scope.allSongLists=[];
        $scope.myNotifications=[]; 
		$scope.getServerData();
	    
 }); 
  //
   // playing track from album
 //
 
 
 //
   //notificationAddedAlbum
 //
 SocketFactory.on('notificationAddedAlbum', function(data) {
     
	 //console.log('notificationAddedAlbum');
     //console.log(data);
	 //console.log('notificationAddedAlbum');
	    
	    var userCreatingAlbumName = JukeBoxServiceTwo.GetUserName($scope.myUsersListTwo.users,'_id',data.addedBy);
	   
	 
	  
	  Notification.success({message: userCreatingAlbumName + ' Created Album ' , positionX: 'center',delay:10000});
	  
	  
	  
	    $scope.myUsersListTwo.users = [];
		$scope.getUsersTwo();
		$scope.sl2Updated = false;
		$scope.songListsTwo = [];
		$scope.receivedSongLists=[];
		$scope.allSongLists=[];
        $scope.myNotifications=[]; 
		$scope.getServerData();
	    
		var searchQuerry;
		if (typeof $scope.formSearch.query !== 'undefined' && $scope.formSearch.query.length > 0){
			searchQuerry=$scope.formSearch.query;
		}
		else{
			searchQuerry = "the beatles";
		}
			
		
		$scope.search(searchQuerry);
		
 }); 
  //
   // notificationAddedAlbum
 //
 
 
 

$scope.JBSIsInArray=JukeBoxServiceTwo.isInArray;

 
$scope.JBSGetUserName =JukeBoxServiceTwo.GetUserName;

$scope.JBSfindIfExists =JukeBoxServiceTwo.findIfExists;

$scope.DFcheckVideoStatus = datfactory.checkVideoStatus;

// for math related function in controller and view 
$scope.Math = $window.Math;	
 
 
    	var onAlbumsGetCompleted = function(response){	
			
			
    	}
	

	
		var initPlayer = function () {
			
		// check if there is query in url
		// and fire search in case its value is not empty
		console.log('!!!!!!$scope.initPlayer= function()!!!!!');
	
    var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	
		
		 console.log('XXXX $scope.youtube is XXXX');
		  
		 console.log('XXXX $scope.youtube is XXXX');
		
	
   
};


    
		initPlayer();
	    $scope.myCurentSongTrack = JukeBoxServiceTwo.getCurrentVideo;
		
		 var myTestUserTwo = {
			uname:'slonder',
			_id:'5815dc4142c683284751c534'
		};	
		var onError = function (error) {
            $scope.error = error.data;
        };
		
		
	
 	

     $scope.hide = function(){
         jq('#hideme').addClass('hidden');   

       }
		
		
		   
	
	    //
		// removeNotificationServer
		//
		$scope.removeNotificationServer = function(paramIndex,paramNotif,paramNotifMessage) {
        
		//console.log('the paramNotif in removeNotif');
		//console.log(paramNotif );
		//console.log('the paramNotif in removeNotif');
		
		
		var myCurrentUserId = $scope.myCurrentUser._id;
		var myCurrentNotifId = paramNotif.id_ ;
	    //console.log('myCurrentNotifId');
		//console.log(myCurrentNotifId );
		//console.log('myCurrentNotifId');
		
	  var myNotificationParamIndex = JukeBoxServiceTwo.findIndexByKeyValue(
      $scope.myNotifications,'id_',myCurrentNotifId);
	  
	  //console.log('myNotificationParamIndex');
	  //console.log(myNotificationParamIndex);
	  //console.log('myNotificationParamIndex');
	
$http.delete('/MakeAlbum/deleteNotification/' + myCurrentUserId + '/' + myCurrentNotifId, {params: {userId:myCurrentUserId,notifId:myCurrentNotifId}})

		.success(function(data) {
         //console.log("Deleted Notification successfully");
		 //console.log("The server data is");
		 //console.log(data)
        }).error(function(data) {
            //console.error("error in posting");
        })
	
	   
		
		$scope.myNotifications.splice(myNotificationParamIndex, 1);
		
		};
	    //
		// removeNotificationServer
		//
	   
	  
		   
//
// FOR NOTIFICATION SYSTEM INTERACTION
//
 $scope.primary = function() {
        Notification('Primary notification');
    };

    $scope.error = function() {
        Notification.error('Error notification');
    };

    $scope.success = function() {
        Notification.success('Success notification');
    };

    $scope.info = function() {
        Notification.info('Information notification');
    };

    $scope.warning = function() {
        Notification.warning('Warning notification');
    };

 

    $scope.primaryTitle = function() {
        Notification({message: 'Primary notification', title: 'Primary notification'});
    };
	
	$scope.primaryTitleTwo = function(paramMessage,ParamTtile) {
        Notification({message: 'Primary notification', title: 'Primary notification'});
    };

  
    $scope.errorTime = function() {
        Notification.error({message: 'Error notification 1s', delay: 1000});
    };
    $scope.errorNoTime = function() {
        Notification.error({message: 'Error notification (no timeout)', delay: null});
    };

    $scope.successTime = function() {
        Notification.success({message: 'Success notification 20s', delay: 20000});
    };

   

    $scope.errorHtml = function() {
        Notification.error({message: '<b>Error</b> <s>notification</s>', title: '<i>Html</i> <u>message</u>'});
    };

    $scope.successHtml = function() {
        Notification.success({message: 'Success notification<br>Some other <b>content</b><br><a href="https://github.com/alexcrack/angular-ui-notification">This is a link</a><br><img src="https://angularjs.org/img/AngularJS-small.png">', title: 'Html content'});
    };

   
    $scope.TopLeft = function() {
        Notification.success({message: 'Success Top Left', positionX: 'left'});
    };

    $scope.BottomRight = function() {
        Notification.error({message: 'Error Bottom Right', positionY: 'bottom', positionX: 'right'});
    };

    $scope.BottomLeft = function() {
        Notification.warning({message: 'warning Bottom Left', positionY: 'bottom', positionX: 'left'});
    };


   

//
// FOR NOTIFICATION SYSTEM INTERACTION
//

	
	$scope.getYouTubeData = function() {
		$http({
        method: 'GET',
        url: '/MakeAlbum/YouTubeData'
      })
      .error(function(data) {
       //console.log(data);
      })
      .success(function(data) {
		 // console.log(data);
        //$scope.user = data;
      });
	};
	
	//
	  //$scope.getUser get user info from server after login uses passport,cookies 
	//
	 $scope.getUser = function(user) {
      $http.defaults.headers.common['eat'] = $cookies.eat;

      $http({
        method: 'GET',
        url: '/user/currentuser'
      })
      .error(function(data) {
       //console.log(data);
      })
      .success(function(data) {
        
		$scope.userName = data.username;
		
		$location.path('/Collector');
      });
	  
	  
    };
	//
	  //$scope.getUser get user info from server after login uses passport,cookies 
	//
	
	
	
	 $scope.getUserTwo = function(user) {
      
	    var myUser = {'uname': 'smith@gmail.com','email':'smith@gmail.com','icon':'mgoogleemailicon.png','password':'mysmith'}
	   
	    $scope.userName = myUser.uname;
	  
    };
	
	   $scope.showDetailsLU=true;
	   $scope.showDetailsCU=false;
	
	  
	   //
	     //show create user form
	   //	
	    $scope.showCreateUserForm = function () {
			
			//console.log('at showCreateUserForm');
		    $scope.showDetailsLU=false;
			$scope.showDetailsCU=true;

    	
		}
	    //	
	      //show create user form	
	    //
	
		//
		  //show login form
		//
		$scope.showLoginForm = function () {
			//console.log('at show Login Form');
		    $scope.showDetailsLU=true;
			$scope.showDetailsCU=false;
		
		}
		//
	     // show login form
	   //
	
	//
	//create user entry
	//
	
	 $scope.newUser = {};
     $scope.newUser.userRegEmail = "";
	 $scope.newUser.userRegPassword = "";
	 
	  
	   $scope.$watch('register.myForm', function(form) {
		
		//use to take a look in side the object you created i.e. register that contains the form components....
		
		//console.log($scope.register.myForm)
	    
	   
	   // $scope.register.myForm.$setPristine();
	   
	   
	   });
	  
	  
	  $scope.createUser = function(user) {
	   
	  
       $scope.newUser.albums = [];
	   $scope.newUser.notifications = [];
	   //$scope.newUser.username = "";
	   $scope.newUser.avatar= ""; 
	   $scope.newUser.bio= "";
	   
           //console.log($scope.newUser);	   
		   //console.log('$scope.createUser');
       $http({
         method: 'POST',
         url: '/user',
         data: $scope.newUser
         })
         .error(function(data) {
          console.log(data);
         })
        .success(function(data) {
        $cookies.eat = data.eat;
	    console.log(data);
	    
	     $window.location.reload();
         });
          };
	
		//
		//create user entry
		//
	
	
	
	$scope.loginSuccess=false;
	
	
	//
	 //$scope.signOut sign user out
	//
	$scope.signOut = function() {
      $cookies.eat = '';
	  $scope.loginSuccess=false;
	  $scope.userName == '';
	  $scope.myCurrentUser =""
	  $scope.myCurrentUserUname="";
	 
	 
	  $route.reload();
	  
      //console.log('signed out')
    };

	//
	 //$scope.signOut sign user out
	//
	  $scope.formLogin = {};
      $scope.formLogin.email = "";
	  $scope.formLogin.password = "";
	  
	  var myLogin;
	  myLogin = false;

	  $scope.JBSfindIndexByKeyValue =JukeBoxServiceTwo.findIndexByKeyValue;
	 
	  
	  //serach nested object in array object
	   function findValue(array, nameWeAreLookingFor) {
          for(var i = 0; i<array.length; i++) {
           if(array[i].basic.email === nameWeAreLookingFor) return i;
           }
         return -1;
          }
	  
	  
	  
	  //
	    //$scope.logIn multiphase login
	  // 
	
	  $scope.logIn = function(paramUserExists,paramCurrentUser) {
		//console.log('paramUserExists');
			//console.log(paramUserExists);
		//console.log('paramUserExists');
	  if(paramUserExists===false){
		  
		  //console.log('myLogin');
		 //console.log(myLogin);
		 //console.log('myLogin'); 
		  
        
		  
		  
		  var myUserIndex = findValue($scope.myUsersList.users,$scope.formLogin.email);
		  //console.log('myUserIndex');
		     //console.log(myUserIndex);
		   //console.log('myUserIndex');
		
	  
	   var myCurrentUser = $scope.myUsersList.users[myUserIndex];
	   
	   
	   
	   //console.log('myCurrentUser');
	    //console.log(myCurrentUser);
	   //console.log('myCurrentUser'); 
	   $scope.myCurrentUser = myCurrentUser;
	   
	   $scope.myCurrentUserUname = myCurrentUser.basic.email;
	   $scope.myCurrentUserIcon = myCurrentUser.avatar;
	  
	  }
	  else { 
	 
	   var myEnteredPassword = $scope.formLogin.password;
	   
	
	 
	      var result;
	
		  $http.defaults.headers.common['Authorization'] = 'Basic: ' + $base64.encode(paramCurrentUser + ':' + myEnteredPassword);
		  
	 
		  angular.element('body').addClass('spinnerOn'); // add Class to body to show spinner 
		   
		  $http.get('/sign_inTwo')
	        
	
			.error(function(data) {
			 // console.log(data);
			 $scope.loginSuccess=false;
			 $scope.serverLoginMsg=data;
			 angular.element('body').removeClass('spinnerOn'); // hide spinner
			 
			 //console.log('loginSuccess');
			 //console.log($scope.loginSuccess);
			 //console.log('loginSuccess');
			 
			
			 
		})
         .success(function(data) {
			$cookies.eat = data.eat;
		
			setTimeout(function() {
				$scope.$apply(function() {
				$scope.loginSuccess=true;
				angular.element('body').removeClass('spinnerOn');
				
					
				})

				}, 1000);
				
				
		
			//console.log(data);
			//console.log('loginSuccess');
			//console.log($scope.loginSuccess);
			//console.log('loginSuccess');
			
         });
		 
	    
		//console.log('myLogin');
		//console.log(myLogin);
		//console.log('myLogin');
	  
	   
	  }
	   
	  
	
    };

      //
	    //$scope.logIn multiphase login
	  // 
	
	
	
    $scope.showDetailsThree = false;
  
    //bind some controller scope variables with 
	//JukeBoxServiceTwo Functions
  
    $scope.JBSE = JukeBoxServiceTwo.ellipsifyTwo;
	$scope.JBSGetFields =JukeBoxServiceTwo.getFields;
	
    $scope.JBSGetFieldsThree =JukeBoxServiceTwo.getFieldsThree;
    $scope.JBSfindByListname = JukeBoxServiceTwo.findByListName;
   
     //bind some controller scope variables with 
	 //JukeBoxServiceTwo Functions
   
     //
	  //create a combination for user click interaction to switch between my collections, collections sent to me, others collections
	 //
	
      $scope.showAlbums = 1;
      $scope.selectedCombination=1;
   
      $scope.toggle =[];
      $scope.toggle[1] = false;
      var myClick;
      myClick == false;
	  $scope.sbc = 'btn btn-default'
	  $scope.combinations = [{combinationId:1,name:'mk'},{combinationId:2,name:'rk'}];
	  $scope.sbcSelected = 'btn-info';
      $scope.SelectedCombination = function (combinationId) {
	  
		 
        $scope.selectedCombination =combinationId;
		//console.log('$scope.selectedCombination');
		//console.log($scope.selectedCombination);
		//console.log('$scope.selectedCombination');
    };
	//
	  //create a combination for user click interaction to switch between my collections, collections sent to me, others collections
	 //
	
 
	
     //when a user clicks on butterfly on empty album taken to search and collect
     $scope.showTriggerElementCollect = function() {
                   
	   $timeout(function() {   
	   angular.element(document.querySelector('#myCollect')).click();
       })
				   
	  }
	   //when a user clicks on butterfly on empty album taken to search and collect
	  
	  
               

  
var mySongLists = [$scope.songlist1,$scope.songlist2,$scope.songlist3,$scope.songlist4];
$scope.songLists = mySongLists;


    var admin = this;
    //var data1 = this;
 
   
 
     //this.admin = this.dataRetrive();

	 var datainfo = this;
	 
	
$scope.songListsTwo = [];
$scope.receivedSongLists=[];
$scope.allSongLists=[];
$scope.myNotifications=[];

$scope.sl2Updated = false;



$scope.getServerData = function() {
	
 
 setTimeout(function () {
	 $scope.$apply(function () {

	
       datfactory.getlistTwo('/MakeAlbum/userAlbums/',$scope.myCurrentUser._id)
			.then(function(arrItems){ 
			
          
			//console.log('..arrItems..');
				//console.log(arrItems);
			//console.log('..arrItems..');
			//
		    //get the albumsMBM from the server
			//
			var listName;
			var myScopeName;
			var data;
			
			for(var n=0;n<arrItems.userNTI.length;n++){
				
			
			data= arrItems.userNTI[n];	
			$scope.myNotifications.push(data);
			//console.log('$scope.myNotifications');
			//console.log($scope.myNotifications);
			//console.log('$scope.myNotifications');
			}	
			
			for(var m=0;m<arrItems.albumsMBM.length;m++){
			 listName = arrItems.albumsMBM[m].listname;	
			 myScopeName = listName;
			 $scope.myScopeName;
			 
			 
			data= arrItems.albumsMBM[m];
			
			
			$scope.myScopeName = data;
			//console.log('$scope.myScopeName');
			//console.log($scope.myScopeName);
			//console.log('$scope.myScopeName');
			
			$scope.songListsTwo.push($scope.myScopeName);
			 
			var container=$scope.songListsTwo;
			var contlength =container.length;
			
			
			
			}
			

             
			
			
			
		
			//console.log('inside datfactory.getlistTwo()');
			//console.log(arrItems);
			//console.log('inside datfactory.getlistTwo()');
			
			//console.log('$scope.listName');
			//console.log($scope.listName);
			//console.log(listName);
			//console.log('$scope.listName');
			
			
			//$scope.myScopeName = dataFour;
			
		
			
			//
		    //get the albumsMBM from the server
			//
			
			//
			//get the albusRBM from the server
			//
			
			
			
			for(var r=0;r<arrItems.albumsRBM.length;r++){
			
		    var listNameRBM = arrItems.albumsRBM[r].listname;	
			 var myScopeNameRBM = listNameRBM;
			 //$scope.myScopeName;
			var dataRBM = arrItems.albumsRBM[r];
		
			$scope.myScopeNameRBM;
			
			$scope.myScopeNameRBM = dataRBM;
			
			$scope.receivedSongLists.push($scope.myScopeNameRBM);
			};
			
			//
			//get the albusRBM from the server
			//
			
			
			
			//
			//get the albusMBP from the server
			//
			
			$scope.sl2Updated = true;
			
			//
			//get the albusMBP from the server
			//

			
			
			
			
			
          });
			
			datfactory.getlistTwo('/MakeAlbum/publicAlbums','')
			.then(function(arrAlbumsAll){ 
			
			//
			//get the albusMBP from the server
			//
			
			
			for(var p=0;p<arrAlbumsAll.albumsMBP.length;p++){
			
			var listNameMBP =arrAlbumsAll.albumsMBP[p].listname;	
			var myScopeNameMBP = listNameMBP;
			var dataMBP = arrAlbumsAll.albumsMBP[p];
		
			$scope.myScopeNameMBP;
			
			$scope.myScopeNameMBP = dataMBP;
			
			$scope.allSongLists.push($scope.myScopeNameMBP);
			};
			
			
			
			//
			//get the albusMBP from the server
			//
			
			
			
			
			
			
			});
			
			
	
			
			
 
 }); 
 	}, 100);
$scope.serverData = $scope.songListsTwo;
$scope.serverDataLength =$scope.songListsTwo.length ;
			
}

$scope.$watch('loginSuccess', function() {
	
if($scope.loginSuccess){
 

$scope.getServerData();	


}
else{
	$scope.getUsersTwo();
	 $scope.getUsers();
	 
	 
}
 
}); 

	


//console.log('ggg $scope.fruits  gggg');
//console.log($scope.fruits ); 
//console.log($scope.songListsTwo);
//console.log($scope.songListsTwo.length);
//console.log(JukeBoxServiceTwo.setLengthAlbums($scope.songListsTwo,'',''));
//console.log(JukeBoxServiceTwo.getLengthAlbums());
//console.log($scope.serverData );
//console.log($scope.serverDataLength);
//console.log('ggg $scope.fruits  gggg');

	


    //console.log('$scope.songListsTwo');
		//console.log($scope.songListsTwo);
	//console.log('$scope.songListsTwo');
	
 
 
 
  
	

	
   	
  
 //$scope.loadData();
 
 //$scope.test = datfactory.getlistTwo();
  //$scope.loadData();
 //console.log('$scope.listName zzzzzz');
 //console.log($scope.test.$$state);
 //console.log($scope.test.$$state.value);
 //console.log($scope.listName);
 //console.log($scope.tom);
 //console.log($scope.test);
 //console.log($scope.items);
 //console.log($scope.serverData);
		//console.log(this.data1);
		//console.log(admin.codeData);
		//console.log(admin.dataRetrive);
 //console.log('$scope.listName zzzzzz');
 
 
 


$scope.myUsersList = {users:''};


//
//get all users from server
//	


//
//$scope.getUsersTwo
//
$scope.myUsersListTwo={};
$scope.getUsersTwo = function() {
     
  $http.get('/users')
  
		.success(function(data) {
  	 
		 $scope.myUsersListTwo.users = data.users;
	
        }).error(function(data) {
            //console.error("error in posting");
        })
			
  
  };	
 

//
//$scope.getUsersTwo
//

	var removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

           arr.splice(i,1);

       }
    }
    return arr;
}


var myUsers;
$scope.getUsers = function() {
     
 	
   //
    // hit the server to get all users
  //
  
  $http.get('/users')
  
  
		.success(function(data) {
         
		  
		 
		 
		  $scope.myUsersList.users = data.users;
		  $scope.addUsersSelect();
		 
		
		   //console.log('the $scope.myUsersList is');
		   //console.log($scope.myUsersList);
		   
		   //console.log('the $scope.myUsersList is');
        }).error(function(data) {
            //console.error("error in posting");
        })
			
  //
  // hit the server to get all users
  //
     
		
  
  };	
 //
//get all users from server
//	 	
	
	
	


$scope.usersListDropDownModel=[];
$scope.usersListDropDownData=[];
$scope.usersListDropDownSettings=[];
$scope.yourUsersListEvents=[];
$scope.usersListCustomTexts = [];

$scope.arrUsersDetails = [];


$scope.usersListDropDownModelRBM=[];
$scope.usersListDropDownDataRBM=[];
$scope.usersListDropDownSettingsRBM=[];
$scope.yourUsersListEventsRBM=[];
$scope.usersListCustomTextsRBM = [];

$scope.arrUsersDetailsRBM = [];

        function findValueUID(array, nameWeAreLookingFor) {
          for(var i = 0; i<array.length; i++) {
           if(array[i].uid === nameWeAreLookingFor) 
			 //console.log('array[i].uid in findValueUID')
		     //console.log(array[i].uid)
			 //console.log('array[i].uid in findValueUID')
		   return i;
           }
         return -1;
         }	

$scope.addUsersSelect = function(paramAlbumListLength) {



for (var ul = 0; ul < $scope.myUsersList.users.length; ul++) {
    //console.log('$scope.myUsersList')
    //console.log($scope.myUsersList)
    //console.log('$scope.myUsersList')
    if($scope.myUsersList.users[ul]._id == '5a15f009ac320714003476db') { 
        continue; 
    }
 	
   $scope.arrUsersDetails.push({
		id: ul,
		//label: $scope.myUsersList.users[ul].username,
		label: $scope.myUsersList.users[ul].basic.email,
		uid: $scope.myUsersList.users[ul]._id
        //key: oFullResponse.results[i].label,
        //sortable: true,
        //resizeable: true
    });
   
		
	
	$scope.arrUsersDetailsRBM.push({
		id: ul,
		//label: $scope.myUsersList.users[ul].username,
		label: $scope.myUsersList.users[ul].basic.email,
		uid: $scope.myUsersList.users[ul]._id
        //key: oFullResponse.results[i].label,
        //sortable: true,
        //resizeable: true
    });
	
	
	
	
	}


    //console.log('$scope.arrUsersDetails')
    //console.log($scope.arrUsersDetails)
    //console.log('$scope.arrUsersDetails')


var myAlbumListLength=JukeBoxServiceTwo.getLengthAlbums();


//console.log('myAlbumListLength');
//console.log(myAlbumListLength);
//console.log('myAlbumListLength');




//console.log('scope.songlists two in users select');
//console.log($scope.songListsTwo);
//console.log($scope.songListsTwo.length);
//console.log($scope.songListsTwo('countrylist').length);
//console.log('scope.songlists two in users select');





for (var sl=0; sl < $scope.songListsTwo.length; sl++){


	
	$scope.usersListDropDownModel.push([]);
	$scope.usersListDropDownData.push($scope.arrUsersDetails);
	$scope.usersListDropDownSettings.push( {externalIdProp: '',idProp: 'label'} );
	$scope.usersListCustomTexts.push({buttonDefaultText: 'Select Users'});
	
	var currUserExistsMBMArr = [];
	var currUserExistsMBM = findValueUID($scope.usersListDropDownData[sl],$scope.myCurrentUser._id);
	
	
	currUserExistsMBMArr.push(currUserExistsMBM);
	if(currUserExistsMBM>=0){
		$scope.usersListDropDownData[sl].splice(currUserExistsMBMArr,1)	 
	};	
		
	
	
	 
	$scope.yourUsersListEvents.push(
		{
	    //'mediaitem': $scope.mediaResultsTwo[m],
	    'album': $scope.songListsTwo[sl],  
		
		onItemSelect: function(item) {
			
		//console.log('onItemSelect');
		//console.log(item);
		//console.log('onItemSelect');
		
		
		//console.log('onItemSelect the current Album');
		//console.log(this.album);
		//console.log(this.album.songs);
		//console.log('onItemSelect the current Album');
		
		
		
		
		
		
		},
		
		onItemDeselect: function(item) {
			
		//console.log('onItemDeselect');
		//console.log(item);
		//console.log('onItemDeselect');
		
		}
		
		
	 
		}

		



		
	 
	) 
	 
	 

	
}




for (var arbm=0; arbm < $scope.receivedSongLists.length; arbm++){


        //console.log('the current myUsersList');
		//console.log($scope.myUsersList);
		//console.log('the current myUsersList');
	  // console.log('the current myUsersList');
		//console.log($scope.myUsersList['users']);
		//console.log('the current myUsersList');
	      
		  //console.log('the current $scope.songListsTwo');
		  //console.log($scope.songListsTwo);
		  //console.log('the current $scope.songListsTwo');
	 
	 
	 //console.log('recByExists');
	 //console.log(recByExists);
	
	  
	 //console.log('recByExists');
	
	
	$scope.usersListDropDownModelRBM.push([]);
	$scope.usersListDropDownDataRBM.push($scope.arrUsersDetailsRBM);
	$scope.usersListDropDownSettingsRBM.push( {externalIdProp: '',idProp: 'label'} );
	$scope.usersListCustomTextsRBM.push({buttonDefaultText: 'Select Users'});
	
	
	



	 
	$scope.yourUsersListEventsRBM.push(
		{
	    //'mediaitem': $scope.mediaResultsTwo[m],
	    'album': $scope.receivedSongLists[arbm],  
		
		onItemSelect: function(item) {
			
		//console.log('onItemSelect');
		//console.log(item);
		//console.log('onItemSelect');
		
		
		//console.log('onItemSelect the current Album');
		//console.log(this.album);
		//console.log(this.album.songs);
		//console.log('onItemSelect the current Album');
		
		
		
		
		
		
		},
		
		onItemDeselect: function(item) {
			
		//console.log('onItemDeselect');
		//console.log(item);
		//console.log('onItemDeselect');
		
		}
		
		
	 
		}

		



		
	 
	) 
	 
	
 
	  
	  
    }


	
//remove createdBy user and myCurrentUser from user drop down list so they cant be sent a duplicate
  
if($scope.loginSuccess){
	
for (var arbm2=0; arbm2 < $scope.receivedSongLists.length; arbm2++){

	$scope.usersListDropDownDataRBM[arbm2] = _.without($scope.usersListDropDownDataRBM[arbm2], _.findWhere($scope.usersListDropDownDataRBM[arbm2], {
	  uid: $scope.receivedSongLists[arbm2].createdBy
	}));
	
   $scope.usersListDropDownDataRBM[arbm2] = _.without($scope.usersListDropDownDataRBM[arbm2], _.findWhere($scope.usersListDropDownDataRBM[arbm2], {
	  uid: $scope.myCurrentUser._id
	}));
 
	
	    
	}
	
}	 





};



$scope.$watch('albumcollectionchange', function() {

if($scope.albumcollectionchange){	
//console.log('$scope.$watch albumcollectionchange')
 
 
//console.log('wrappedResult');
 // console.log(wrappedResult);
//console.log('wrappedResult');

}

});

//
// for multiselect dropdown for user selection
//

$scope.$watch('sl2Updated', function() {
        //alert('hey, myVar has changed!');
		if($scope.sl2Updated){
			
			//console.log('$scope.sl2Updated');
			//console.log('$scope.sl2Updated');
			//console.log('$scope.sl2Updated');
			//console.log('$scope.songListsTwo');
			//console.log($scope.songListsTwo.length);
			//console.log('$scope.songListsTwo');
			//$scope.getUsers();
			//$scope.getUsersTwo();
			$scope.myUsersList.users = [];
			$scope.addUsersSelect();
			
		}
		
    });
		




	 // 
    //for like button to like albums
   //
   $scope.likeAnswer=[];
   $scope.likeClick =[];
   
   
	
      $scope.myCurrentLikedCount = [];
	  $scope.myCurrentLikedCount[0] = 5;
	  $scope.myCurrentLikedCount[1] = 15;
	  $scope.myCurrentLikedCount[2] = 40;
	  var hasLiked =[];
	  var hasVoted =[]
	  
	
	$scope.likeClickTwo =  function(albumParam,indexParam) {
		
		//console.log('the albumParam is');
		//console.log(albumParam);
		//console.log('the albumParam is');
		
		var myCurrentAlbum = albumParam;
		var myCurrentUser = $scope.myCurrentUser;
		var myVoteIncrement = 1;
		
	   $http.put('/MakeAlbum/updateAlbumVotes/' + myCurrentAlbum + '/' + myCurrentUser + '/' + myVoteIncrement, {params: {albumInfo:myCurrentAlbum,userInfo:myCurrentUser,voteInfo:myVoteIncrement}})
			
		.success(function(data) {
         //console.log("Deleted answer successfully");
		// console.log("The server data is");
		 //console.log(data)
		
         }).error(function(data) {
            //console.error("error in posting");
         })
				
		
		
		
	};
	
	
   

			   // console.log('hasLiked');
				//console.log(hasLiked);
				//console.log('hasLiked');
				
				//console.log('likeCount');
				//console.log(likeCount);
				//console.log('likeCount');
				
      
			 
		
			
		//	   console.log('hasLiked');
		//		console.log(hasLiked);
		//		console.log('hasLiked');
				
		//		console.log('likeCount');
		//		console.log(likeCount);
		//		console.log('likeCount');
        //}
		
		//console.log('$scope.likeAnswer[x]');
		//console.log($scope.likeAnswer[indexParam]);
		//console.log('$scope.likeAnswer[x]');
		
   // };
	
  // }
	 // 
     //for like button to like albums
     //  
      
	  
	//
	//$scope.sendAlbum = function()
	//
    $scope.sendAlbum = function(albumIndexParam,albumParam,paramType) {
	
         
		switch(paramType){
		
		case "rbm":
		var myUsersToSend = $scope.usersListDropDownModelRBM[albumIndexParam];
		$scope.usersListDropDownModelRBM[albumIndexParam] =[];
		break;
		
		case "rbmfn":
		//console.log('at switch rbmfn in send album');
		
		var myUsersToSend = [{"id":0,"label":$scope.myCurrentUser.username,"uid":$scope.myCurrentUser._id}]
		
		break;
		
		
						
		case  "mbm":
		var myUsersToSend = $scope.usersListDropDownModel[albumIndexParam];	
		
		
        $scope.usersListDropDownModel[albumIndexParam] =[];
		
		
		var myAlbumObject={ 
			listname: albumParam.listname,
			auid: albumParam.auid,
			status: "private",
			//createdBy: $scope.myCurrentUser._id,
			createdBy: albumParam.createdBy,
			songs: albumParam.songs };
		
		 
		//
	 // make adjustments to usersListDropDown
	 //
	
	
	 
	 //
	 // make adjustments to usersListDropDown
	 //
		
		
		break;
		
		
		case  "mbp":
		
		var myUsersToSend = [{"id":0,"label":$scope.myCurrentUser.username,"uid":$scope.myCurrentUser._id}]
		$scope.usersListDropDownModelRBM[albumIndexParam] =[];		
	
		break;
		}
		
		
		
	//console.log('you are at $scope.sendAlbum = function()');	
	
	//console.log('albumIndexParam');
	//console.log(albumIndexParam);
	//console.log('albumIndexParam');
	
	//console.log('albumParam');
	//console.log(albumParam);
	//console.log('albumParam');
	
	//console.log('myUsersToSend');
	//console.log(myUsersToSend);
	//console.log('myUsersToSend');
	
	//
  // hit the server add the song to record album
  //
   
		
   
    
	var myCurrentUserId = $scope.myCurrentUser._id
  
  $http.post('/MakeAlbum/sendAlbum/' + albumParam + '/' + myUsersToSend + '/' + myCurrentUserId + '/' + paramType, {params: {albumInfo:albumParam,usersInfo:myUsersToSend,createdBy:myCurrentUserId,paramType: paramType}})
			
		.success(function(data) {
         //console.log("Sent Album Successfully");
		 //console.log("The server data is");
		 //console.log(data)
		 
		
		 //
		//send notifications
		//
		
		

		
		
		//
		//send notifications
		//
		 
		 
		 
		 
        }).error(function(data) {
            //console.error("error in posting");
        })
			
  //
  // hit the server add the song to record album
  //	
  
  
	
	
		
		
	}
	//
	//$scope.sendAlbumFA = function()
	//
	 $scope.addAlbumFA = function(albumParam) {
		
		var myAlbumName = albumParam.albumName;
        var mySentBy = "Scotty123"; //will set to user later
	    //console.log('at addAlbumFA() ');
	
	   
	    $scope.receivedSongLists.push(albumParam);
	//console.log('$scope.formInfo');
	//console.log($scope.formInfo)
	//console.log('$scope.formInfo')
	
	
	 
	 
	 //
	 // make adjustments to usersListDropDown
	 //
	   $scope.usersListDropDownModel.push([]);
	   $scope.usersListDropDownData.push($scope.arrUsersDetails);
	   $scope.usersListDropDownSettings.push( {externalIdProp: '',idProp: 'label'} );
	   $scope.usersListCustomTexts.push({buttonDefaultText: 'Select Users'}); 
	 $scope.yourUsersListEvents.push(
		{
	    //'mediaitem': $scope.mediaResultsTwo[m],
	    'album': $scope[myAlbumName],  
		
		onItemSelect: function(item) {
			
		//console.log('onItemSelect');
		//console.log(item);
		//console.log('onItemSelect');
		
		
		//console.log('onItemSelect the current Album');
		//console.log(this.album);
		//console.log('onItemSelect the current Album');
		
		
		},
		
		onItemDeselect: function(item) {
			
		//console.log('onItemDeselect');
		//console.log(item);
		//console.log('onItemDeselect');
		
		}
		
		}

	) 
	 
	 //
	 // make adjustments to usersListDropDown
	 //
	 
	 
	 $http.post('/MakeAlbum/sendAlbumTM/' + albumParam + '/' + mySentBy, {params: {albumInfo:albumParam,usersInfo:mySentBy }})
			
		.success(function(data) {
         console.log("sendAlbumTM successfully");
		 console.log("The server data is");
		 console.log(data)
		 
        }).error(function(data) {
            console.error("error in posting");
        })
			
  //
  // hit the server add the song to record album
  //	
	 
	 
	 
	 }
	 
	//
	// $scope.addAlbumFA = function()
    //

   	
	 
	 
	 
	
//
// $scope.addAlbum = function()
//
    $scope.formInfo = {};
	
	
  var myEntry = $scope.formInfo.albumName;
  
 // test to make sure a new user does not use a email or user name already being used while registering
 $scope.BlackListedUsers = function(value) {
	
  //create a list of the emails from 
  var emails=[];
  for(var x=0;x<$scope.myUsersList.users.length;x++)
  {
	  emails.push($scope.myUsersList.users[x].basic.email);
	  
  }	  

    var blacklistUsers=emails;
	
	return blacklistUsers.indexOf(value)=== -1;	
  			
}
 
 
 // test to make sure a the user name is in existence when logging or signing in 
 $scope.notBlackListedUsers = function(value) {
						
  //create a list of the emails from 
  var emails=[];
  for(var x=0;x<$scope.myUsersList.users.length;x++)
  {
	  emails.push($scope.myUsersList.users[x].basic.email);
	  
  }	  

     var blacklistUsers=emails;
				 
	 return blacklistUsers.indexOf(value) >= 0;
					 
					
}
 
$scope.doesNotExistUsers = function(value) {
                    //var db = ['john.doe@mail.com', 'jane.doe@mail.com'];
					var db =$scope.myUsersCommaSep;
                    // Simulates an asyncronous trip to the server.
                    return $q(function(resolve, reject) {
                            $timeout(function() {
                            if (db.indexOf(value) < 0) {
                                resolve();
                            } else {
                                reject();
                            }
                        }, 500);
                    });
                }; 
 
 
 //check to make sure an album name is not alrady in existence when making a new album
 $scope.notBlackListedAA = function(value) {
 $scope.myAlbumsCommaSep = $scope.JBSGetFieldsThree($scope.allSongLists,'listname');
					 
					$scope.myAlbumsCommaSep = $scope.JBSGetFieldsThree($scope.allSongLists,'listname');
					 
					var blacklist=$scope.myAlbumsCommaSep;
					//console.log('the blacklistin $scope.notBlackListedAA');
					//console.log(blacklist );
					//console.log('the blacklistin $scope.notBlackListedAA');
                    return blacklist.indexOf(value) === -1;
					
				 
                };
				
 
 $scope.notBlackListedRA = function(value) {
 $scope.myAlbumsCommaSep = $scope.JBSGetFieldsThree($scope.receivedSongLists,'listname');
					 
					$scope.myAlbumsCommaSep = $scope.JBSGetFieldsThree($scope.receivedSongLists,'listname');
					 
					var blacklist=$scope.myAlbumsCommaSep;
					//console.log('the blacklistin $scope.notBlackListedRA');
					//console.log(blacklist );
					//console.log('the blacklistin $scope.notBlackListedRA');
                    return blacklist.indexOf(value) === -1;
					
					 
					 
                };
				
 
 
 
 
  
  $scope.notBlackListed = function(value) {
                   
					 $scope.myAlbumsCommaSep = $scope.JBSGetFieldsThree($scope.songListsTwo,'listname');
					 
					 
					 
					var blacklist=$scope.myAlbumsCommaSep;
					//console.log('the blacklistin $scope.notBlackListed');
					//console.log(blacklist );
					//console.log('the blacklistin $scope.notBlackListed');
                    return blacklist.indexOf(value) === -1;
					
					
					 
                };
				
                $scope.doesNotExist = function(value) {
                    //var db = ['john.doe@mail.com', 'jane.doe@mail.com'];
					var db =$scope.myAlbumsCommaSep;
                    // Simulates an asyncronous trip to the server.
                    return $q(function(resolve, reject) {
                            $timeout(function() {
                            if (db.indexOf(value) < 0) {
                                resolve();
                            } else {
                                reject();
                            }
                        }, 500);
                    });
                };
  
  
	
	
	   

    $scope.addAlbum = function() {
		
		
		var myCurrentUserId = $scope.myCurrentUser._id
		
    //console.log('at addAlbum() ');
	//console.log('$scope.formInfo');
	//console.log($scope.formInfo)
	//console.log('$scope.formInfo')
	var myAlbumName = $scope.formInfo.albumName;
	var myCreatedBy = myCurrentUserId; //will set to user later
	
	var myCurrentUserId = $scope.myCurrentUser._id
	
	
	
	$scope[myAlbumName] = {
	listname: myAlbumName,
	songs: [],
	createdBy: myCurrentUserId,
	status: "private"
	}
	 
	$scope.formInfo.albumName="";
		 
	
	//
	//http post
	//
	$http.post('/MakeAlbum/addAlbum',{albumText:myAlbumName,createdBy:myCreatedBy,userId:myCurrentUserId})
		
		   .success(function(data) {
            
			//console.log("posted successfully");
			//console.log(data)
			
	          
		     //$scope.formInfo.albumName="";
			
              
            }).error(function(data) {
             //console.error("error in posting");
			
            })
	//
	//http post
	//	    
	
if($scope.arrSongLists){	
	if ($scope.arrSongLists.length>0){
		//console.log('$scope.arrSongLists');
		//console.log($scope.arrSongLists);
		//console.log('$scope.arrSongLists');

	}
	else {}

}	
	
	 
	 //
	 // make adjustments to usersListDropDown
	 //
	   $scope.usersListDropDownModel.push([]);
	   $scope.usersListDropDownData.push($scope.arrUsersDetails);
	   $scope.usersListDropDownSettings.push( {externalIdProp: '',idProp: 'label'} );
	   $scope.usersListCustomTexts.push({buttonDefaultText: 'Select Users'}); 
	 $scope.yourUsersListEvents.push(
		{
	    //'mediaitem': $scope.mediaResultsTwo[m],
	    'album': $scope[myAlbumName],  
		
		onItemSelect: function(item) {
			
		//console.log('onItemSelect');
		//console.log(item);
		//console.log('onItemSelect');
		
		
		//console.log('onItemSelect the current Album');
		//console.log(this.album);
		//console.log('onItemSelect the current Album');
			
		},
		
		onItemDeselect: function(item) {
			
		//console.log('onItemDeselect');
		//console.log(item);
		//console.log('onItemDeselect');
		
		}
		
		}
		

	) 
	 
	 //
	 // make adjustments to usersListDropDown
	 //

 
    

			//$scope.search(myAlbumName);
	
    };	
	
	

	
	
//
// $scope.addAlbum = function()
//	



//
//$scope.addAlbumRBM
//
$scope.addAlbumRBM = function (albumIndexParam,albumParam) {

//console.log('albumParam at addAlbumRBM');
//console.log(albumParam);
//console.log(albumParam.songs);
//console.log('albumParam at addAlbumRBM');

var createdBy='slonder@gmail.com';
// created by will be myself
//console.log('XXX the $scope.receivedSongLists is before push currently XXX');
//console.log($scope.receivedSongLists);
//console.log('XXX the $scope.receivedSongLists is before push currently XXX');

$scope.receivedSongLists.push(albumParam);

//console.log('XXX the $scope.receivedSongLists is after push currently XXX');
//console.log($scope.receivedSongLists);
//console.log('XXX the $scope.receivedSongLists is after push currently XXX');





//do http to server and enter into DB


var messageObj = {
	
 data: albumParam,
 message: 'received', 
 stamp: createdBy	
};
$scope.notifications.receivedSongs.push(messageObj);


  Notification.success({message: 'Received ' +albumParam.listname, positionX: 'left'});




};


//
//$scope.addAlbumRBM
//


//
//$scope.addAlbumAA
//
$scope.addAlbumAA = function (albumIndexParam,albumParam) {

//console.log('albumParam at addAlbumAA');
//console.log(albumParam);
//console.log(albumParam.songs);
//console.log('albumParam at addAlbumAA');

var createdBy='slonder@gmail.com';
var myCurrentAlbum = albumParam;

//console.log('XXX the $scope.allSongLists is before push currently XXX');
//console.log($scope.allSongLists);
//console.log('XXX the $scope.allSongLists is before push currently XXX');

$scope.allSongLists.push(albumParam);

//console.log('XXX the $scope.allSongLists is after push currently XXX');
//console.log($scope.allSongLists);
//console.log('XXX the $scope.allSongLists is after push currently XXX');

    
	var myCurrentUserId = $scope.myCurrentUser._id
	$http.put('/MakeAlbum/updateAlbumStatusTwo/' + myCurrentAlbum.listname + '/' + myCurrentUserId+ '/' + myCurrentAlbum, {params: {albumId:myCurrentAlbum.listname,userId:myCurrentUserId,albumInfo: myCurrentAlbum}})
	
	
		.success(function(data) {
         //console.log("Deleted album successfully");
		 //console.log("The server data is");
		 //console.log(data)
		
        }).error(function(data) {
            //console.error("error in posting");
        })
  


};


//
//$scope.addAlbumAA
//





//
// $scope.removeAlbum = function()
//	
	$scope.removeAlbum = function(albumIndexParam,albumParam) {
	   
	 $scope.albumcollectionchange=false;  
	   
	   delete $scope.selectedModel;
       delete $scope.mediaResultsTwo;
       delete $scope.songListDropDownModel;
       delete $scope.songListDropDownData;
       delete $scope.songListDropDownSettings;
       delete $scope.yourEvents;	
	
	
	
	var myCurrentAlbumIndex = albumIndexParam;
	//console.log('myCurrentAlbumIndex');
	//console.log(myCurrentAlbumIndex);
	//console.log('myCurrentAlbumIndex');
	var myCurrentAlbum = albumParam;
	//console.log('myCurrentAlbum');
	//console.log(myCurrentAlbum);
	//console.log('myCurrentAlbum');
	
	
	 function functiontofindIndexByKeyValue(     arraytosearch, key, valuetosearch) {
     if(arraytosearch){	  
     for (var i = 0; i < arraytosearch.length; i++) {
     if (arraytosearch[i][key] == valuetosearch) {
     return i;
     }
     }
     return null;
     }
  
      }
    
 
  
 if($scope.mediaResultsTwo){
	 
 for (var m=0; m < $scope.mediaResultsTwo.length; m++) {
	 
	
   
   var myArraySongListParamIndex =  functiontofindIndexByKeyValue($scope.songListDropDownData[m],'label',myCurrentAlbum.listname);
 
   
   
   //console.log('myArraySongListParamIndex at remove');
   //console.log(myArraySongListParamIndex);
   //console.log('myArraySongListParamIndex at remove');
   
   //console.log('$scope.arrSongLists');
   //console.log($scope.songListDropDownData[m]);
   //console.log('$scope.arrSongLists');
   
   //console.log('$scope.arrSongLists');
   //console.log($scope.songListDropDownData[m][1] );
   
   
  var removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

           arr.splice(i,1);

       }
    }
    return arr;
}

 //change the model to reflect any songs no loger checked as a result of record album deletion
  
  //when delete album if it has been selected for use by a current song from the MediaResults shown in the  $scope.songListDropDownModel[m] as selected unselect that song by deleting it from the $scope.songListDropDownModel[m]
   
    
   
   var selectedFromAlbum;
  //console.log('m counter is');
  //console.log(m);
  //console.log('m counter is');
       //console.log('the $scope.songListDropDownModel[m]' );
	   //console.log($scope.songListDropDownModel[m]);
	   //console.log('the $scope.songListDropDownModel[m]' );
	  

   
   for( var sa=0; sa<$scope.songListDropDownModel[m].length; sa++){
	   
		   
		   removeByAttr($scope.songListDropDownModel[m], 'label', myCurrentAlbum.listname);
		   
		   
		   
			//console.log('myCurSong');
			//console.log(myCurSong);
			//console.log('myCurSong');
			
			
 
		   
		   
		   //console.log('the $scope.songListDropDownModel[m] after remove by attribute is' );
	   //console.log($scope.songListDropDownModel[m]);
	   //console.log('the $scope.songListDropDownModel[m] after remove by attribute is' );
	   }
	   
	   
	   
  

for(var asl=0;asl<$scope.arrSongLists.length;asl++){  
          //delete $scope.arrSongLists[asl];  	  
	   //console.log('$scope.arrSongLists[asl]');
	   //console.log($scope.arrSongLists[asl]);
	   //console.log('$scope.arrSongLists[asl]');
	}


  //delete album 
  removeByAttr($scope.songListDropDownData[m], 'label', myCurrentAlbum.listname);
  var myArraySongListParamIndex =  functiontofindIndexByKeyValue($scope.arrSongLists,'label',myCurrentAlbum.listname);
  
  
   
  removeByAttr($scope.arrSongLists, 'label', myCurrentAlbum.listname);
		
   
   
   //console.log('$scope.arrSongLists');
   //console.log($scope.songListDropDownData[m]);
   //console.log('$scope.arrSongLists');
   
  
 
 }   
	
 }	
	//delete $scope[myCurrentAlbum];
  $scope.songListsTwo.splice(myCurrentAlbumIndex, 1);
  
 
  
  
	//problem after deletion of album can not uncheck to remove delete song can click remove
	
	
	
    
	
	var myCurrentUserId = $scope.myCurrentUser._id;
	
	$http.delete('/MakeAlbum/deleteAlbum/' + myCurrentAlbum.listname + '/' + myCurrentUserId, {params: {albumId:myCurrentAlbum.listname,userId:myCurrentUserId}})
	
	
		.success(function(data) {
         console.log("Deleted album successfully");
		 console.log("The server data is");
		 console.log(data);
		 
		 $scope.albumcollectionchange=true;
		 
		 
        }).error(function(data) {
            console.error("error in posting");
        })
	
	   
	};
	
	
	
	

	//
// $scope.removeAlbum = function()
//	  
	
//
// 	$scope.removeAlbumRBM
//
$scope.removeAlbumRBM = function(albumIndexParam,albumParam) {
    
	var myCurrentAlbumIndex = albumIndexParam;
	//console.log('myCurrentAlbumIndex');
	//console.log(myCurrentAlbumIndex);
	//console.log('myCurrentAlbumIndex');
	var myCurrentAlbum = albumParam;
	//console.log('myCurrentAlbum');
	//console.log(myCurrentAlbum);
	//console.log('myCurrentAlbum');
	$scope.receivedSongLists.splice(myCurrentAlbumIndex, 1);
	
	
	
    
	
	var myCurrentUserId = $scope.myCurrentUser._id;
	
	$http.delete('/MakeAlbum/deleteAlbum/' + myCurrentAlbum.listname + '/' + myCurrentUserId, {params: {albumId:myCurrentAlbum.listname,userId:myCurrentUserId}})
	
	
		.success(function(data) {
         //console.log("Deleted album successfully");
		 //console.log("The server data is");
		 //console.log(data)
		 //$scope.formData.questionText = "";
        }).error(function(data) {
            //console.error("error in posting");
        });
	

		


};
//
// $scope.removeAlbumRBM
//


	
 
$scope.hiddenSongList=mySongLists;
$scope.hiddenDiv =[];


//
// holder for songlists
//
  
//
//$scope.showDivSongList
//
$scope.showDivSongList = function (index,paramQuestion)
{

//console.log('$scope.showDivSongList');
//console.log(index); 


$scope.hiddenDiv[index] = !$scope.hiddenDiv[index];
$scope.currentIndex = index;
 
   


};		
//
//$scope.showDivSongList
//		

  $scope.isATSLDisabled = [];

 $scope.toggleSlick = function(indexParam) {
     
    
	$scope.slickConfig[indexParam].init();
	
	}

  
//
//addToSongListOne
//	
$scope.addToSongListOne = function(mediaListParam,listNameParam,songIndexParam) {

$scope.albumcollectionchange=false;
   

var myCurrentUserId = $scope.myCurrentUser._id;
	
var mySongTitleFromMedia = mediaListParam.title;

var mySongListName = listNameParam.label;	



var myAlbumListParamIndex = JukeBoxServiceTwo.findIndexByKeyValue($scope.songListsTwo,'listname',mySongListName);
 
 //console.log('myAlbumListParamIndex')
 //console.log(myAlbumListParamIndex)
 //console.log('myAlbumListParamIndex')
 

 
 
 
 //console.log('scope.addToSongList');
//console.log('mediaListParam');
//console.log(mediaListParam);
//console.log('mediaListParam');
//console.log('listNameParam');
//console.log(listNameParam);
//console.log('listNameParam');

//console.log('mySongTitleFromMedia');
//console.log(mySongTitleFromMedia);
//console.log('mySongTitleFromMedia');

var myThumbnailFromMedia = mediaListParam.thumbnail;
var myVideoIdFromMedia = mediaListParam.videoid;

var mySongObject = {
'title': mySongTitleFromMedia, 
'thumbnail': myThumbnailFromMedia,
'videoid': myVideoIdFromMedia,
'drag': true
};


$scope.songListsTwo[myAlbumListParamIndex ].songs.push(mySongObject);


//console.log('mySongListName')
//console.log(mySongListName)
//console.log('mySongListName')
function indexOfArray(val, array) {
  var
    hash = {},
    indexes = {},
    i, j;
  for(i = 0; i < array.length; i++) {
    hash[array[i]] = i;
  }
  return (hash.hasOwnProperty(val)) ? hash[val] : -1;
};



var index = $scope.mediaResultsTwo.indexOf(mySongTitleFromMedia);


 
  var myUID = String(songIndexParam+mySongListName+myVideoIdFromMedia);
  
  //disable button for added to song list
 $scope.isATSLDisabled[myUID] = true;
 
  
  //
  // hit the server add the song to record album
  //
  $http.post('/MakeAlbum/updateAlbum/' + mySongObject + '/' + listNameParam+ '/' + myCurrentUserId, {params: {songId:mySongObject,albumId:listNameParam,userId:myCurrentUserId}})
  
  
		.success(function(data) {
         //console.log("Updated Added Song To Album Collection");
		 //console.log("The server data is");
		 //console.log(data)
		
		
        $scope.albumcollectionchange=true;
		 
        }).error(function(data) {
            //console.error("error in posting");
        })
			
  //
  // hit the server add the song to record album
  //
  
  
  
  
  };	
 //
//addToSongListOne
//	 
  
  
  //
 //removeFromSongListOne 
  //
  $scope.removeFromSongListOne  = function(mediaListParamIndex,mediaListParam,songListParam,songTrackParam,songTrackIndexParam) {
  
	$scope.albumcollectionchange=false;
	
	
  
  function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {
   if(arraytosearch){	  
  for (var i = 0; i < arraytosearch.length; i++) {
	  //console.log('!!!arraytosearch!!!');
	  //console.log(arraytosearch);
	  //console.log('!!!arraytosearch!!!');
  if (arraytosearch[i][key] == valuetosearch) {
	 // console.log('match found');
	 // console.log(arraytosearch[i][key]);
   return i;
   }
   }
  return -1;
   }
  
   }
  

  
   var myMediaListParam;
   
 
  var myMediaListParamIndex = functiontofindIndexByKeyValue($scope.mediaResultsTwo,'title',songTrackParam.title);
  
   
   
   var myAlbumListParamIndex =  functiontofindIndexByKeyValue($scope.songListsTwo,'listname',songListParam.listname);
   
   
   
  
  if(myMediaListParamIndex){
   myMediaListParam =$scope.mediaResultsTwo[myMediaListParamIndex];
   
  }
  
  
  
  
  
  
  var myCurrentSongList = songListParam.listname;
  var mySongTrackIndex = songTrackIndexParam
  var mySongTrackVideoId = songTrackParam.videoid;
  var myCurrentUserId = $scope.myCurrentUser._id;
  
  
  
   
  
if(myMediaListParamIndex>=0){
  var myCurrSongListDropIndex = functiontofindIndexByKeyValue($scope.songListDropDownModel[myMediaListParamIndex],'label',myCurrentSongList);
}
else
{
	
}	
  
  
  
   //uncheck the multiselect dropdown
 
 if(myCurrSongListDropIndex >=0 ) {
	
	$scope.songListDropDownModel[myMediaListParamIndex].splice( myCurrSongListDropIndex, 1 );
	

 }
 else{ 

 
 }

 

 var num ='777'
 

 //splice the songtrack from the current list
  
  
  $scope.songListsTwo[myAlbumListParamIndex].songs.splice(songTrackIndexParam, 1);
 
  
  if(myMediaListParamIndex){
    
    
  }	
	
	 $http.delete('/MakeAlbum/deleteSong/' + mySongTrackVideoId + '/' + myCurrentSongList + '/' + myCurrentUserId, {params: {songId:mySongTrackVideoId,albumId:myCurrentSongList,userId:myCurrentUserId}})
			
		.success(function(data) {
         console.log("Deleted song from album collection successfully");
		 console.log("The server data is");
		 console.log(data)
		 //$scope.formData.questionText = "";
		 
		 $scope.albumcollectionchange=true;
		 
        }).error(function(data) {
            console.error("error in posting");
        })
			
	
	
 
  
  
  }; 
  
  //
   //removeFromSongListOne 
  //
  
  //
 //removeFromSongListOne 
  //
  
	  
  $scope.removeFromSongListTwo  = function(mediaListParamIndex,mediaListParam,songListParam,songListNameParam) { 
  $scope.albumcollectionchange=false;
  //console.log('songListParam at remove two');
  //console.log(songListParam);
  //console.log('songListParam at remove two');
  
     var myAlbumListParamIndex =  functiontofindIndexByKeyValue($scope.songListsTwo,'listname',songListParam.label);
   
   //console.log('myAlbumListParamIndex at remove');
   //console.log(myAlbumListParamIndex);
   //console.log('myAlbumListParamIndex');
	  
	  function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {
	  for (var i = 0; i < arraytosearch.length; i++) {
	  if (arraytosearch[i][key] == valuetosearch) {
	   return i;
	   }
	   }
	  return null;
	   }
	  
	  	
		
    
	
	var myCurrentUserId = $scope.myCurrentUser._id;
	
	  
	 
	 var myCurrentSongList = $scope.songListsTwo[myAlbumListParamIndex];
	  
	  
	
	 
	 var myCurrentAlbumIndex = functiontofindIndexByKeyValue($scope.songListsTwo,'listname',myCurrentSongList.listname);
	 
	  //console.log('myCurrentAlbumIndex at remove two');
	  //console.log(myCurrentAlbumIndex);
	  //console.log('myCurrentAlbumIndex at remove two');
	 
	 
	 
	  
	  //console.log('myCurrentSongList at remove two');
	  //console.log(myCurrentSongList);
	  //console.log('myCurrentSongList at remove two');
	  
	  var mySongTrackIndexParam = functiontofindIndexByKeyValue(myCurrentSongList.songs,'title',mediaListParam.title);
	  
	  
	  //console.log('mySongTrackIndexParam at remove two');
	  //console.log(mySongTrackIndexParam);
	  //console.log('mySongTrackIndexParam at remove two');
	  
	  
     
	 var mySongTrackVideoId = mediaListParam.videoid; 
     var myAlbumName = songListParam.label;
	
	  
	//splice the songtrack from the current list
   
$timeout(function() {
   myCurrentSongList.songs.splice(mySongTrackIndexParam, 1);  
});	
	
	
			
	$http.delete('/MakeAlbum/deleteSong/' + mySongTrackVideoId + '/' + myAlbumName + '/' + myCurrentUserId, {params: {songId:mySongTrackVideoId,albumId:myAlbumName,userId:myCurrentUserId}})
			
		.success(function(data) {
         console.log("Deleted answer successfully");
		 console.log("The server data is");
		 console.log(data)
		 $scope.albumcollectionchange=true;
        }).error(function(data) {
            console.error("error in posting");
        })
			
	
	
  
  };
  
  //
  //removeFromSongListTwo
  //
  
//
// drag and drop
//


        
      

  
  

//
//drag and drop
//
                	
	

	 function init() {
		 
      
      
	  //console.log('$scope.youtubeQQQQQQ');
      //console.log($scope.youtube);
	  //console.log('$scope.youtubeQQQQQQQ');
	  
	   
	  
	    
	   $scope.mediaResultsTwo = JukeBoxServiceTwo.getResultsTwo();
	   //console.log('$scope.mediaResultsTwo');
	   // console.log($scope.mediaResultsTwo);
	   //console.log('$scope.mediaResultsTwo');
	   
	   //console.log('$scope.mediaResultsTwo.length');
	   //console.log($scope.mediaResultsTwo.length);
	   //console.log('$scope.mediaResultsTwo.length');
	   
	  

  

function isObjectEmpty(object)
{
  var isEmpty = true;
  for(keys in object)
  {
     isEmpty = false;
     break; // exiting since we found that the object is not empty
  }
  return isEmpty;
}

var isEmpty  = isObjectEmpty($scope.mediaResultsTwo); // will return false;


	   
	  
      $scope.upcoming = JukeBoxServiceTwo.getUpcoming();
      $scope.history = JukeBoxServiceTwo.getHistory();
      $scope.playlist = true;
    }
	
	$scope.launch = function (id, title) {
      JukeBoxServiceTwo.launchPlayer(id, title);
      //JukeBoxServiceTwo.archiveVideo(id, title);
      //JukeBoxServiceTwo.deleteVideo($scope.upcoming, id);
      $log.info('Launched id:' + id + ' and title:' + title);
    };

	 $scope.queue = function (id, title) {
      JukeBoxServiceTwo.queueVideo(id, title);
     // JukeBoxServiceTwo.deleteVideo($scope.history, id);
      $log.info('Queued id:' + id + ' and title:' + title);
    };

    $scope.delete = function (list, id) {
      JukeBoxServiceTwo.deleteVideo(list, id);
    };
     
	 
	function listResults(data) {
    var myDataArray =[];
	for(var x=0;x<=data.items.length-1;x++){
	
	 myDataArray.push(
      { 
	   'title': data.items[x].snippet.title ,
	   'thumbnail': data.items[x].snippet.thumbnails.default.url,
	   'videoid': data.items[x].id.videoId,
	   'drag': true  
	  }
	 );		
		}
	
    
   
  } 
	 
   //	 
	 // for paging data in angular
   //	 
  $scope.viewby = 10;
  //$scope.totalItems = $scope.data.length;
  $scope.currentPage = 1;
  $scope.itemsPerPage = 6//$scope.viewby;
  $scope.maxSize = 5; //Number of pager buttons to show

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    console.log('Page changed to: ' + $scope.currentPage);
  };

$scope.setItemsPerPage = function(num) {
  $scope.itemsPerPage = num;
  $scope.currentPage = 1; //reset to first page
}
	
  //	 
	// for paging data in angular
  //

	
	$scope.formSearch = {}; 
	 
    $scope.search = function (paramSearchQuery) {
	
	 //$scope.setPage(1);
	
	
	//console.log('user just clicked search');
	//console.log('user just clicked search');
		
	
		
		

	
	   if(paramSearchQuery){
		var myQuery = paramSearchQuery;
		$scope.formSearch.query = myQuery;
	   }else{
	    var myQuery = $scope.formSearch.query;
	   }
	   
		//console.log('the query search paramater is');
		//console.log(myQuery);
		//console.log('the query search paramater is');	   
	
		
	
	  
	 $http.post('/MakeAlbum/YouTubeData/' + myQuery, {params: {searchString:myQuery}}) 
	  
      .error(function(data) {
       //console.log(data);
      })
      .success(function(data) {
		 // console.log(data);
        
		
	

	  //listResults(data);
	 $scope.mediaResultsTwo=
	  JukeBoxServiceTwo.listResultsTwo(data.items);
	    $scope.totalItems = $scope.mediaResultsTwo.length;
	
		//console.log('$scope.mediaResultsTwo');
		  //console.log($scope.mediaResultsTwo);
		//console.log('$scope.mediaResultsTwo');
		
		//console.log('$scope.mediaResultsTwo.length');
	   //console.log($scope.mediaResultsTwo.length);
	   //console.log('$scope.mediaResultsTwo.length');
	   
	   
	   //
	   // set up multiple drop downs
	   //by media results 
	   //
	   
 
	   
	   
	   
 if (typeof $scope.mediaResultsTwo !== 'undefined' && $scope.mediaResultsTwo.length > 0) {
$scope.songListDropDownModel = [];
$scope.songListDropDownData = [];
$scope.songListDropDownSettings = [];
$scope.yourEvents = [];
//console.log('$scope.mediaResultsTwo.length');
//console.log($scope.mediaResultsTwo.length);
//console.log('$scope.mediaResultsTwo.length');


//console.log('$scope.songListsTwo at search success');
//console.log($scope.songListsTwo);
//console.log('$scope.songListsTwo at search success');



 $scope.arrSongLists = [];
for (var i = 0; i < $scope.songListsTwo.length; i++) {
    $scope.arrSongLists.push({
		id: i,
		label: $scope.songListsTwo[i].listname
        //key: oFullResponse.results[i].label,
        //sortable: true,
        //resizeable: true
    });

	//console.log('i in $scope.arrSongLists.push');
	//console.log(i);
	//console.log($scope.arrSongLists)
	//console.log('i in $scope.arrSongLists.push');
	
	}

//item in mediaResultsTwo .slice(((currentPage-1)*itemsPerPage), ((currentPage)*itemsPerPage))
for (var m=0; m < $scope.mediaResultsTwo.length; m++){

        //console.log(' current mediaResultsTwo');
		//console.log($scope.mediaResultsTwo[m]);
		//console.log(' the current mediaResultsTwo');
	
	$scope.songListDropDownModel.push([]);
	$scope.songListDropDownData.push($scope.arrSongLists);
	$scope.songListDropDownSettings.push( {externalIdProp: '',idProp: 'label'} );
	
	 
	
	$scope.yourEvents.push(
	{
		
         'mediaitem': $scope.mediaResultsTwo[m],
	      
		 
		onItemSelect: function(item) {
		//console.log('onItemSelect');
		//console.log(item);
		//console.log('onItemSelect');
		
		
		
		//console.log('onItemSelect the current mediaItem');
		//console.log(this.mediaitem);
		//console.log('onItemSelect the current mediaItem');
		
		
		
		
		$scope.addToSongListOne(this.mediaitem,item,m);
		
		
		
		
		},
		onItemDeselect: function(item) {
			
			
		//console.log('onItemDeselect');
		//console.log(item);
		//console.log('onItemDeselect');
		
		//console.log('$scope.arrSongLists');
		//console.log($scope.arrSongLists);
		//console.log('$scope.arrSongLists');
		
		if (item) {
		
		
		//console.log('onItemDeselect songlistname');
		//console.log($scope.arrSongLists[item.id].label);
		//console.log('onItemDeselect songlistname');
		
		
		//function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {
         // if(arraytosearch){	  
         // for (var i = 0; i < //arraytosearch.length; i++) {
         // if (arraytosearch[i][key] == valuetosearch) {
        // return i;
        // }
           //  }
         // return null;
         // }
  
        // }
		
		
		
		
		
		var mySongListName = item.label;
		//console.log('var mySongListName');
		//console.log(mySongListName);
		//console.log('var mySongListName');
		
		
		$scope.removeFromSongListTwo(m,this.mediaitem,item,mySongListName);
		
		
		}
		else{};
		
		
		
		},
		
		
		onDeselectAll: function() {
		
		//console.log('!!onDeselectAll!!');
	//	for(var x=0;x<=$scope.songListsTwo; x++) {
			//console.log($scope.songListsTwo[x]);
		//	$scope.songListsTwo[x].songs.pop();
			
		//}
		
		},
		
		
	
		
		
	}
	
	
	
	
	)
	
	
		

}


     


//console.log('$scope.songListDropDownModel');
//console.log($scope.songListDropDownModel);
//console.log('$scope.songListDropDownModel');
//console.log('$scope.songListDropDownData');
//console.log($scope.songListDropDownData);
//console.log('$scope.songListDropDownData');
//console.log('$scope.songListDropDownSettings');
//console.log($scope.songListDropDownSettings);
//console.log('$scope.songListDropDownSettings');

}	 
	 
	   
	   
	   //
	   // set up multiple drop downs 
	   // by media resultsTwo
	   //
	   
	  
      })
      .error( function () {
        $log.info('Search error');
      });
    
	
	
    delete $scope.mediaResultsTwo
    delete $scope.songListDropDownModel;
    delete	$scope.songListDropDownData;
    delete	$scope.songListDropDownSettings;
    delete  $scope.yourEvents;
 	
	  //$scope.mediaResultsTwo = [];
     //$scope.songListDropDownModel = [];
     //$scope.songListDropDownData = [];
     //$scope.songListDropDownSettings = [];
    //$scope.yourEvents = [];
	
	
	
	}

    $scope.tabulate = function (state) {
      $scope.playlist = state;
    }
	
	
	
	
	//
	// juke box stuff
	//	
	
	
	
    $scope.searchTerm = "Alicia Keys";
    $scope.mediaType = "all";
    $scope.filterTerm = "";
    $scope.sortProp = "artistName";
    $scope.showFlag = false;

	

	

	
	
    $scope.playVideo = function(item) {
        $scope.showFlag = true;
        $scope.url = item.previewUrl;
        if  (item.trackName != null) $scope.title = item.trackName
        else $scope.title = item.collectionName;

        $scope.artist = item.artistName;
    }
	
	$scope.playVideoTwo = function(item,albumParam) {
        $scope.showFlag = true;
		
		//rj4J6i_vw0w
       // $scope.queue(item.id.videoId,'XXXXX');
	   //$scope.launch(item.id.videoId,'XXXXX');
		//$scope.CurrentVideoId = item.id.videoId;
		
		//$scope.queue(item.videoid,'XXXXX');
	    //var myYouTube = JukeBoxServiceTwo.getYoutube();
		
		JukeBoxServiceTwo.launchPlayerTrack(item.videoid,item.title);
		
		//$scope.launch(item.videoid,'XXXXX');
		
		$scope.CurrentVideoId = item.videoid;
		$scope.CurrentVideoTitle = item.title;
		
		//console.log('item.videoid');
		//console.log(item.videoid);
		//console.log(item.title);
        //console.log('item.videoid');
		
		//console.log('albumParam');
		//console.log(albumParam);
	
        //console.log('albumParam');
		
		
		var createdBy='slonder@gmail';
		
		var messageObj = {
		 dataAlbum: albumParam,
		 dataSong: item,
		 message: 'playing', 
		 stamp: createdBy,
         viewedBy: $scope.myCurrentUser.username		 
		};
		
			
		
	
  
  
 //only upated notifications if a users is playing an album not created by themselves
 
 
	if(!JukeBoxServiceTwo.isEmpty(albumParam)) 
 {
	 //console.log('almbumParam.created by !== undefined or null');
 
 if($scope.myCurrentUser._id !== albumParam.createdBy )
	 
 {	 
  
  $http.post('/MakeAlbum/playAlbumTrack/' + albumParam + '/' + $scope.myCurrentUser + '/' + item, {params: {albumInfo:albumParam,userInfo:$scope.myCurrentUser,trackInfo:item}})			
			
			
		.success(function(data) {
         //console.log("User Just Played A Album Track");
		 //console.log("The server data is");
		 //console.log(data)
		 
	
		 
        }).error(function(data) {
            //console.error("error in posting");
        })
 };			
  
 };
  //
  // hit the server add notifications to users
  //	
  
		
		
		
    }

	
	$scope.playVideoAlbum = function(paramSongList,albumParam) {
	 
		 //console.log('paramSongList');
				//console.log(paramSongList);
				//console.log(paramSongList.length);
		 //console.log('paramSongList');
	 
       
        $scope.showFlag = true;
		
  
	     
		// console.log('!!!$scope.upcoming at end!!!');
		//  console.log($scope.upcoming);
		//  $scope.upcomming=[];
		//  console.log($scope.upcoming);
		// console.log('!!!$scope.upcoming at end!!!'); 
		 
	    

	  //create a sla songlistarray
	  var sla=[];
	  for(var sl=0;sl<paramSongList.length;sl++){
		  
		 sla.push(paramSongList[sl].videoid); 
	  }
	  JukeBoxServiceTwo.launchPlayerTrack(sla,'');
	  
	  //only upated notifications if a users is playing an album not created by themselves
 if($scope.myCurrentUser._id !== albumParam.createdBy)
 {	 
  
  $http.post('/MakeAlbum/playAlbum/' + albumParam + '/' + $scope.myCurrentUser, {params: {albumInfo:albumParam,userInfo:$scope.myCurrentUser}})			
		.success(function(data) {
        // console.log("User Just Played A Album Track");
		 //console.log("The server data is");
		 //console.log(data);
		
		 
        }).error(function(data) {
           // console.error("error in posting");
        })
 };			
  //
  // hit the server add notifications to users
  //	
	  
	 
	   
	};
	
	

    $scope.closeVideo = function(item) {
        $scope.showFlag = false;
		
		//console.log('item in close video');
		//console.log(item);
		//console.log('item in close video');
		
		var myYouTube = JukeBoxServiceTwo.getYoutube();
		
		 
        myYouTube.player.stopVideo();
		
		
	     
	}

	
	
}

//for FastClick implementation in AngularJS
  musicApp.run(function() {
    FastClick.attach(document.body);
});
	
	musicApp.controller('MediaCtrl', MediaCtrl);
//
//directives
//




/* Filters */
musicApp.filter('capitalize', function() {
    return function(input, scope) {
        if (input!=null)
            return input.substring(0,1).toUpperCase()+input.substring(1);
    }
});

musicApp.filter("break", function($sce){
    return function(input, length){
       
		
		var myReform = input.match(new RegExp(".{1," + length + "}", 'g')).join("<br/>");
		return $sce.trustAsHtml(myReform);

		
    }
});


musicApp.filter('unsafe', function($sce) {
    return function(val,length) {
	var myReform = val.match(new RegExp(".{1," + length + "}", 'g')).join("<br/>");
       
		return $sce.trustAsHtml( myReform);
		
    };
});







//
//directives
//


//
  //
//
musicApp.directive('img', function () {
return {
    restrict: 'E',        
    link: function (scope, element, attrs) {   
        if((('ngSrc' in attrs) && typeof(attrs['ngSrc'])==='undefined') || (('src' in attrs) && typeof(attrs['src'])==='undefined'))  {
            (function () {
                replaceImg();
            })();
        };
        element.error(function () {
            replaceImg();
        });

        function replaceImg() {
            var w = element.width();
            var h = element.height();
            // using 20 here because it seems even a missing image will have ~18px width 
            // after this error function has been called
            if (w <= 20) { w = 100; }
            if (h <= 20) { h = 100; }
            var url = 'http://placehold.it/' + w + 'x' + h + '/cccccc/ffffff&text=No image';
            element.prop('src', url);
			element.prop('ngSrc', url);
        }
    }
}
});

//
  //
//







//
	//directive for link redirect work around
	//
	musicApp.directive('myRefresh',function($location,$route,$window){
    return function(scope, element, attrs) {
        element.bind('click',function(){
            if(element[0] && element[0].href && element[0].href === $location.absUrl()){
                //$route.reload();
				$window.location.reload();
            }
        });
    }   
});
	//
	//directive for link redirect work around
	//
	





musicApp.directive('videoLoader', function(){
    return function (scope, element, attrs){
        //console.log(scope.url);
        scope.$watch("url",  function(newValue, oldValue){ //watching the scope url value
            element[0].children[0].attributes[3].value=newValue; //set the URL on the src attribute
            element[0].load();
            element[0].play();
        }, true);
        scope.$watch("showFlag",  function(newValue, oldValue){
            if (!newValue) // if the showFlag is false, stop playing the video (modal was closed)
                element[0].pause();
        }, true);
    }
});




musicApp.directive('showModal', function(){
    return function (scope, element, attrs){
        scope.$watch("showFlag",  function(newValue, oldValue){
            //console.log(newValue);
            if (newValue)
                element.addClass("show");
            else element.removeClass("show");
        }, true);
    }
});

//ngDropdownMultiselect
//musicApp directive for multiple select dropdown 
//from bootstrap-ui typeahead parser
 musicApp.directive('ngDropdownMultiselect', ['$filter', '$document', '$compile', '$parse',
    function ($filter, $document, $compile, $parse) {

        return {
            restrict: 'AE',
            scope: {
                selectedModel: '=',
                options: '=',
                extraSettings: '=',
                events: '=',
                searchFilter: '=?',
                translationTexts: '=',
                groupBy: '@'
            },
            template: function (element, attrs) {
                var checkboxes = attrs.checkboxes ? true : false;
                var groups = attrs.groupBy ? true : false;

                var template = '<div class="multiselect-parent btn-group dropdown-multiselect">';
                template += '<button type="button" class="dropdown-toggle btn btn-link nounderline" ng-class="settings.buttonClasses" ng-click="toggleDropdown()">{{getButtonText()}}&nbsp;<span class="caret"></span></button>';
                template += '<ul class="dropdown-menu dropdown-menu-form" ng-style="{display: open ? \'block\' : \'none\', height : settings.scrollable ? settings.scrollableHeight : \'auto\' }" style="overflow: scroll" >';
                template += '<li ng-hide="!settings.showCheckAll || settings.selectionLimit > 0"><a data-ng-click="selectAll()"><span class="glyphicon glyphicon-ok"></span>  {{texts.checkAll}}</a>';
                template += '<li ng-show="settings.showUncheckAll"><a data-ng-click="deselectAll();"><span class="glyphicon glyphicon-remove"></span>   {{texts.uncheckAll}}</a></li>';
                template += '<li ng-hide="(!settings.showCheckAll || settings.selectionLimit > 0) && !settings.showUncheckAll" class="divider"></li>';
                template += '<li ng-show="settings.enableSearch"><div class="dropdown-header"><input type="text" class="form-control" style="width: 100%;" ng-model="searchFilter" placeholder="{{texts.searchPlaceholder}}" /></li>';
                template += '<li ng-show="settings.enableSearch" class="divider"></li>';

                if (groups) {
                    template += '<li ng-repeat-start="option in orderedItems | filter: searchFilter" ng-show="getPropertyForObject(option, settings.groupBy) !== getPropertyForObject(orderedItems[$index - 1], settings.groupBy)" role="presentation" class="dropdown-header">{{ getGroupTitle(getPropertyForObject(option, settings.groupBy)) }}</li>';
                    template += '<li ng-repeat-end role="presentation">';
                } else {
                    template += '<li role="presentation" ng-repeat="option in options | filter: searchFilter">';
                }

                template += '<a role="menuitem" tabindex="-1" ng-click="setSelectedItem(getPropertyForObject(option,settings.idProp))">';

                if (checkboxes) {
                    template += '<div class="checkbox"><label><input class="checkboxInput" type="checkbox" ng-click="checkboxClick($event, getPropertyForObject(option,settings.idProp))" ng-checked="isChecked(getPropertyForObject(option,settings.idProp))" /> {{getPropertyForObject(option, settings.displayProp)}}</label></div></a>';
                } else {
                    template += '<span data-ng-class="{\'glyphicon glyphicon-ok\': isChecked(getPropertyForObject(option,settings.idProp))}"></span> {{getPropertyForObject(option, settings.displayProp)}}</a>';
                }

                template += '</li>';

                template += '<li class="divider" ng-show="settings.selectionLimit > 1"></li>';
                template += '<li role="presentation" ng-show="settings.selectionLimit > 1"><a role="menuitem">{{selectedModel.length}} {{texts.selectionOf}} {{settings.selectionLimit}} {{texts.selectionCount}}</a></li>';

                template += '</ul>';
                template += '</div>';

                element.html(template);
            },
            link: function ($scope, $element, $attrs) {
                var $dropdownTrigger = $element.children()[0];
                
                $scope.toggleDropdown = function () {
                    $scope.open = !$scope.open;
                };

                $scope.checkboxClick = function ($event, id) {
                    $scope.setSelectedItem(id);
                    $event.stopImmediatePropagation();
                };

                $scope.externalEvents = {
                    onItemSelect: angular.noop,
                    onItemDeselect: angular.noop,
                    onSelectAll: angular.noop,
                    onDeselectAll: angular.noop,
                    onInitDone: angular.noop,
                    onMaxSelectionReached: angular.noop
                };

                $scope.settings = {
                    dynamicTitle: true,
                    scrollable: false,
                    scrollableHeight: '300px',
                    closeOnBlur: true,
                    displayProp: 'label',
                    idProp: 'id',
                    externalIdProp: 'id',
                    enableSearch: false,
                    selectionLimit: 0,
                    showCheckAll: false,
                    showUncheckAll: false,
                    closeOnSelect: false,
                    buttonClasses: 'btn btn-default',
                    closeOnDeselect: false,
                    groupBy: $attrs.groupBy || undefined,
                    groupByTextProvider: null,
                    smartButtonMaxItems: 0,
                    smartButtonTextConverter: angular.noop
                };

                $scope.texts = {
                    checkAll: 'Check All',
                    uncheckAll: 'Uncheck All',
                    selectionCount: 'checked',
                    selectionOf: '/',
                    searchPlaceholder: 'Search...',
                    buttonDefaultText: 'Select',
                    dynamicButtonTextSuffix: 'checked'
                };

                $scope.searchFilter = $scope.searchFilter || '';

                if (angular.isDefined($scope.settings.groupBy)) {
                    $scope.$watch('options', function (newValue) {
                        if (angular.isDefined(newValue)) {
                            $scope.orderedItems = $filter('orderBy')(newValue, $scope.settings.groupBy);
                        }
                    });
                }

                angular.extend($scope.settings, $scope.extraSettings || []);
                angular.extend($scope.externalEvents, $scope.events || []);
                angular.extend($scope.texts, $scope.translationTexts);

                $scope.singleSelection = $scope.settings.selectionLimit === 1;

                function getFindObj(id) {
                    var findObj = {};

                    if ($scope.settings.externalIdProp === '') {
                        findObj[$scope.settings.idProp] = id;
                    } else {
                        findObj[$scope.settings.externalIdProp] = id;
                    }

                    return findObj;
                }

                function clearObject(object) {
                    for (var prop in object) {
                        delete object[prop];
                    }
                }

                if ($scope.singleSelection) {
                    if (angular.isArray($scope.selectedModel) && $scope.selectedModel.length === 0) {
                        clearObject($scope.selectedModel);
                    }
                }

                if ($scope.settings.closeOnBlur) {
                    $document.on('click', function (e) {
                        var target = e.target.parentElement;
                        var parentFound = false;

                        while (angular.isDefined(target) && target !== null && !parentFound) {
                            if (_.contains(target.className.split(' '), 'multiselect-parent') && !parentFound) {
                                if(target === $dropdownTrigger) {
                                    parentFound = true;
                                }
                            }
                            target = target.parentElement;
                        }

                        if (!parentFound) {
                            $scope.$apply(function () {
                                $scope.open = false;
                            });
                        }
                    });
                }

                $scope.getGroupTitle = function (groupValue) {
                    if ($scope.settings.groupByTextProvider !== null) {
                        return $scope.settings.groupByTextProvider(groupValue);
                    }

                    return groupValue;
                };

                $scope.getButtonText = function () {
                    if ($scope.settings.dynamicTitle && ($scope.selectedModel.length > 0 || (angular.isObject($scope.selectedModel) && _.keys($scope.selectedModel).length > 0))) {
                        if ($scope.settings.smartButtonMaxItems > 0) {
                            var itemsText = [];

                            angular.forEach($scope.options, function (optionItem) {
                                if ($scope.isChecked($scope.getPropertyForObject(optionItem, $scope.settings.idProp))) {
                                    var displayText = $scope.getPropertyForObject(optionItem, $scope.settings.displayProp);
                                    var converterResponse = $scope.settings.smartButtonTextConverter(displayText, optionItem);

                                    itemsText.push(converterResponse ? converterResponse : displayText);
                                }
                            });

                            if ($scope.selectedModel.length > $scope.settings.smartButtonMaxItems) {
                                itemsText = itemsText.slice(0, $scope.settings.smartButtonMaxItems);
                                itemsText.push('...');
                            }

                            return itemsText.join(', ');
                        } else {
                            var totalSelected;

                            if ($scope.singleSelection) {
                                totalSelected = ($scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp])) ? 1 : 0;
                            } else {
                                totalSelected = angular.isDefined($scope.selectedModel) ? $scope.selectedModel.length : 0;
                            }

                            if (totalSelected === 0) {
                                return $scope.texts.buttonDefaultText;
                            } else {
                                return totalSelected + ' ' + $scope.texts.dynamicButtonTextSuffix;
                            }
                        }
                    } else {
                        return $scope.texts.buttonDefaultText;
                    }
                };

                $scope.getPropertyForObject = function (object, property) {
                    if (angular.isDefined(object) && object.hasOwnProperty(property)) {
                        return object[property];
                    }

                    return '';
                };

                $scope.selectAll = function () {
                    $scope.deselectAll(false);
                    $scope.externalEvents.onSelectAll();

                    angular.forEach($scope.options, function (value) {
                        $scope.setSelectedItem(value[$scope.settings.idProp], true);
                    });
                };

                $scope.deselectAll = function (sendEvent) {
                    sendEvent = sendEvent || true;

                    if (sendEvent) {
                        $scope.externalEvents.onDeselectAll();
                    }

                    if ($scope.singleSelection) {
                        clearObject($scope.selectedModel);
                    } else {
                        $scope.selectedModel.splice(0, $scope.selectedModel.length);
                    }
                };

                $scope.setSelectedItem = function (id, dontRemove) {
                    var findObj = getFindObj(id);
                    var finalObj = null;

                    if ($scope.settings.externalIdProp === '') {
                        finalObj = _.find($scope.options, findObj);
                    } else {
                        finalObj = findObj;
                    }

                    if ($scope.singleSelection) {
                        clearObject($scope.selectedModel);
                        angular.extend($scope.selectedModel, finalObj);
                        $scope.externalEvents.onItemSelect(finalObj);
                        if ($scope.settings.closeOnSelect) $scope.open = false;

                        return;
                    }

                    dontRemove = dontRemove || false;

                    var exists = _.findIndex($scope.selectedModel, findObj) !== -1;

                    if (!dontRemove && exists) {
                        $scope.selectedModel.splice(_.findIndex($scope.selectedModel, findObj), 1);
                        $scope.externalEvents.onItemDeselect(findObj);
                    } else if (!exists && ($scope.settings.selectionLimit === 0 || $scope.selectedModel.length < $scope.settings.selectionLimit)) {
                        $scope.selectedModel.push(finalObj);
                        $scope.externalEvents.onItemSelect(finalObj);
                    }
                    if ($scope.settings.closeOnSelect) $scope.open = false;
                };

                $scope.isChecked = function (id) {
                    if ($scope.singleSelection) {
                        return $scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp]) && $scope.selectedModel[$scope.settings.idProp] === getFindObj(id)[$scope.settings.idProp];
                    }

                    return _.findIndex($scope.selectedModel, getFindObj(id)) !== -1;
                };

                $scope.externalEvents.onInitDone();
            }
        };
}]);

//ngDropdownMultiselect
//musicApp directive for multiple select dropdown 
//from bootstrap-ui typeahead parser



//
// musicApp directive for validating entry into
// text box against criteria i.e. recordAlbum 
//name that already exists
//
musicApp.directive('blacklist', function (){ 
   return {
      require: 'ngModel',
      link: function(scope, elem, attr, ngModel) {
		  
		 
		 
		  
          var blacklist = attr.blacklist.split(',');
		  
		  
          ngModel.$parsers.unshift(function (value) {
			  
			
             ngModel.$setValidity('blacklist', blacklist.indexOf(value) === -1);
			 
             return value;
			 
			 
          
		  });
		  
		  
		  //For model -> DOM validation
          ngModel.$formatters.unshift(function(value) {
             ngModel.$setValidity('blacklist', blacklist.indexOf(value) === -1);
			 
			 
             return value;
          });
		  
		  
		   
      }
	  
   };
});


//
// musicApp directive for validating entry into
// text box against criteria i.e. recordAlbum 
//name that already exists
//

//musicApp.directive('slick', ['$timeout', function ($timeout) {
//
     //       var isInitialized;
      //      return {
//
        //        link: function (scope, element, attr) {

                    // Get extended scope
            //        var iScope = angular.element(element).isolateScope();

               //     $timeout(function () {
               //         isInitialized = false;

                 //       return iScope.$watch('songListsTwo', function (newVal, oldVal) {

                  //          if (newVal !== null && newVal !== oldVal) {
                   //             if (isInitialized) {
                     //               return element.slick('unslick');
                          //      }
                           //     $timeout(function () {
                            //        iScope.init();
                             //   }, 100);

                             //   return isInitialized = true;
                          //  }
                        //});
                    //});
               // }
            //};

  //}])
  
  
//module.directive('eatClick', function() {
    //return function(scope, element, attrs) {
       // $(element).click(function(event) {
          //  event.preventDefault();
       // });
    //}
//})






     //
	   //directive for link redirect work around
	//
	
	 //
	   //directive for link redirect work around
	 //




musicApp.filter('myFriend', function () {
    return function (items, currentUser) {
        //console.log(items);
        //console.log(currentUser);
        var finalItems = [];
        for (var i = 0; i < items.length; i++) {
            
				if (items[i].selected === true) {
                finalItems.push(items[i]);
            }
        }
        return finalItems;
    };
});







//musicApp.filter('selectFromSelected', function () {
        
		//return function (incItems, value) {
			
			//console.log('incItems');
			//console.log(incItems);
			//console.log('incItems');
			//console.log('value');
			//console.log(value);
			//console.log('value');
			
            //var out = [{}];
            
           // if(value){
             //   for(x=0; x<incItems.length; x++){
               //     if(incItems[x].selected == value)
                //        out.push(incItems[x]);
               // }
               // return out;
            //}
           // else if(!value){
                //return incItems
           // }
			
			
        //};
   // });

// filter for math functions //

// filter for math functions //

	
	//
	//directive for link redirect work around
	//
	musicApp.directive('myRefresh',function($location,$route){
    return function(scope, element, attrs) {
        element.bind('click',function(){
            if(element[0] && element[0].href && element[0].href === $location.absUrl()){
                $route.reload();
            }
        });
    }   
});
	//
	//directive for link redirect work around
	//
	
      //
	   //directive for image error
	//
	
		musicApp.directive('img', function () {
    return {
        restrict: 'E',        
        link: function (scope, element, attrs) {     
            // show an image-missing image
            element.error(function () {
                var w = element.width();
                var h = element.height();
                // using 20 here because it seems even a missing image will have ~18px width 
                // after this error function has been called
                if (w <= 20) { w = 100; }
                if (h <= 20) { h = 100; }
                var url = 'http://placehold.it/' + w + 'x' + h + '/cccccc/ffffff&text=Oh No!';
                element.prop('src', url);
                element.css('border', 'double 3px #cccccc');
            });
        }
    }
});

      //
	   //directive for image error
	//
	
//
 //directive additional email validation not standard to angularjs email type
//
musicApp.directive('emailspecial',function($location,$route){
return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
        if (!ctrl) {
            return false;
        }

        function isValidEmail(value) {
            if (!value) {
                return false;
            }
            // Email Regex used by ASP.Net MVC
            var regex = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/i;
            return regex.exec(value) != null;
        }

        scope.$watch(ctrl, function () {
            ctrl.$validate();
        });

        ctrl.$validators.email = function (modelValue, viewValue) {
            return isValidEmail(viewValue);
        };
    }
};
});  
//
 //directive additional email validation not standard to angularjs email type
//	
	

	
//
//slick add on 1
//	
	/*
musicApp.directive('slick', ['$timeout', function ($timeout) {

            var isInitialized;
            return {

                link: function (scope, element, attr) {

                    // Get extended scope
                    var iScope = angular.element(element).isolateScope();

                    $timeout(function () {
                        isInitialized = false;

                        return iScope.$watch('albumcollectionchange', function (newVal, oldVal) {
					console.log('albumcollectionchange')
					console.log(scope.albumcollectionchange)
					console.log('albumcollectionchange')
					
						console.log('oldVal')
						console.log(oldVal)
						console.log('oldVal')
						console.log('newVal')
						console.log(newVal)
						console.log('newVal')
                            if (newVal !== null && newVal !== oldVal) {
                                if (isInitialized) {
                                    return element.slick[3]('unslick');
                                }
                                $timeout(function () {
                                    iScope.init();
                                }, 100);

                                return isInitialized = true;
                            }
                        });
                    });
                }
            };

        }])
*/

//
//slick add on
//	



//slick add on 2
musicApp.directive('slick', [
  '$timeout',
  function ($timeout) {
	  
    return {
		restrict: 'AEC',
		$scope: {
		initOnload: '@',
        data: '=',
        currentIndexSlick: '=',
		accessibility: '@',
        arrows: '@',
        autoplay: '@',
		//autoplay: false,
        autoplaySpeed: '@',
		centerMode: '@',
		// centerMode: true,
        centerPadding: '@',
        cssEase: '@',
        dots: '@',
		 //dots: false,
		 initialSlide: 0,
        draggable: '@',
		easing: '@',
        fade: '@',
        infinite: '@',
		 //infinite: true,
        lazyLoad: '@',
        onBeforeChange: '@',
		onAfterChange: '@',
        onInit: '@',
        onReInit: '@',
        pauseOnHover: '@',
		responsive: '&',
        slide: '@',
        slidesToShow: '@',
		//slidesToShow: 1,
        slidesToScroll: '@',
		speed: '@',
        swipe: '@',
        touchMove: '@',
		touchThreshold: '@',
        vertical: '@'
		
		}, //end scope declaration object

		link: function (scope, element, attrs) {
		 
		  var initializeSlick, isInitialized;
          initializeSlick = function () {
          return $timeout(function () {
            var currentIndexSlick, slider;
            slider = $(element);
            if (scope.currentIndexSlick != null) {
              currentIndexSlick = scope.currentIndexSlick;
            }
		 
		    slider.slick({
			dots: false,
            autoplay: false,
            initialSlide: 0,
            infinite: true,
            autoplaySpeed: 1000,
	  
	  
	  
		     accessibility: scope.accessibility !== 'false',
              arrows: scope.arrows == 'false',
              //autoplay: scope.autoplay === 'true',
			  //autoplaySpeed: scope.autoplaySpeed != null ? parseInt(scope.autoplaySpeed, 10) : 3000,
              centerMode: scope.centerMode === 'true',
			  centerPadding: scope.centerPadding || '50px',
              cssEase: scope.cssEase || 'ease',
			  cssEase: 'ease-in',
			  //cssEase: 'ease-out',
			 // cssEase: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
			   useTransform: true,
			    responsive: [
				{
				  breakpoint: 1024,
				  settings: {
					dots: false
				  }
				}],
              //dots: scope.dots === 'true',
             draggable: scope.draggable !== 'false',
			  easing: scope.easing || 'linear',
              fade: scope.fade === 'true',
              infinite: scope.infinite !== 'false',
              lazyLoad: scope.lazyLoad || 'ondemand',
			  
			  
			  
			  onBeforeChange: scope.onBeforeChange || null,
			  onAfterChange: function (sl, index) {
                if (scope.onAfterChange) {
                  scope.onAfterChange();
                }
                if (currentIndexSlick != null) {
                  return scope.$apply(function () {
                    currentIndexSlick = index;
                    return scope.currentIndexSlick = index;
                  });
                }
              },
			  onInit: function (sl) {
                if (scope.onInit) {
                  scope.onInit();
                }
                if (currentIndexSlick != null) {
                  return sl.slideHandler(currentIndexSlick);
                }
				
              },
			  onReInit: scope.onReInit || null,
              pauseOnHover: scope.pauseOnHover !== 'false',
              //responsive: scope.responsive() || null,
              slide: scope.slide || 'div',
              slidesToShow: scope.slidesToShow != null ? parseInt(scope.slidesToShow, 10) : 1,
              slidesToScroll: scope.slidesToScroll != null ? parseInt(scope.slidesToScroll, 10) : 1,
              speed: scope.speed != null ? parseInt(scope.speed, 10) : 300,
              swipe: scope.swipe !== 'false',
              touchMove: scope.touchMove !== 'false',
              touchThreshold: scope.touchThreshold ? parseInt(scope.touchThreshold, 10) : 5,
              vertical: scope.vertical === 'true'
			  
			  
			})
		 
		    return scope.$watch('currentIndexSlick', function (newVal, oldVal) {
              if (currentIndexSlick != null && newVal != null && newVal !== currentIndexSlick) {
                return slider.slickGoTo(newVal);
              }
            });
		 
		 
		 
		 
		 
		  
		    })//end return timeout
		    } //end initialize slick function
		 
		 
		 if (scope.initOnload) {
          isInitialized = false;
          return scope.$watch('data', function (newVal, oldVal) {
            if (newVal != null && !isInitialized) {
              initializeSlick();
              return isInitialized = true;
            }
          });
        } else {
          return initializeSlick();
        }
      
		 
		 
		 
        }		 
		
		
		
	} //end return declaration object 
		
  } //end first time-out
  

		
  
  
]); //end main function








//slick add on 2

	
	
	

 
 }());

	
	
	
	
	
	
