              
	
   
   var app = angular.module('app.JukeBoxServiceTwo', []);
   
   app.service('JukeBoxServiceTwo', ['$window', '$rootScope', '$log','_', function ($window, $rootScope, $log,_) {
	   

    var service = this;

   

  var youtube = {
    ready: false,
    player: null,
    playerId: null,
    videoId: null,
    videoTitle: null,
    playerHeight: '240',
    playerWidth: '280',
    state: 'stopped',
	
  };
  
  var results = [];
  var resultsTwo = [];
  
  var upcoming = [];
  
  //var lengthAlbums =[];
  
  
  
  var history = [
    //{id: 'XKa7Ywiv734', title: '[OFFICIAL HD] Daft Punk - Give Life Back To Music (feat. Nile Rodgers)'}
  ];

  this.setYouTube = function() {
   
  };
  
  
  
  $rootScope.$on( "$routeChangeSuccess", function(event, next, current) {
  
  
   $log.info('Youtube API is ready');
    
	youtube.ready = true;
   
	
	service.bindPlayer('playerModal');
	
    service.loadPlayer();
	
    
  
});
  
  $window.onYouTubeIframeAPIReady = function () {
    $log.info('Youtube API is ready');
    youtube.ready = true;
    service.bindPlayer('player');
	service.bindPlayer('playerModal');
    service.loadPlayer();
    $rootScope.$apply();
  };

  function onYoutubeReady (event) {
    $log.info('YouTube Player is ready TWO XXXXXXXX');
    if(typeof history != "undefined" && history != null && history.length > 0){
	youtube.player.cueVideoById(history[0].id);
    youtube.videoId = history[0].id;
    youtube.videoTitle = history[0].title;
	}
	
  }

  function onYoutubeStateChange (event) {
    if (event.data == YT.PlayerState.PLAYING) {
      youtube.state = 'playing';
	  service.getCurrentVideo();
    } else if (event.data == YT.PlayerState.PAUSED) {
      youtube.state = 'paused';
    } else if (event.data == YT.PlayerState.ENDED) {
      youtube.state = 'ended';
      
	  
	  
    }
    $rootScope.$apply();
  }
  
  

  this.bindPlayer = function (elementId) {
    $log.info('Binding to ' + elementId);
    youtube.playerId = elementId;
  };

  this.createPlayer = function () {
    $log.info('Creating a new Youtube player TWO XXXXXXXXXX for DOM id ' + youtube.playerId + ' and video ' + youtube.videoId);
	
    return new YT.Player(youtube.playerId, {
      height: youtube.playerHeight,
      width: youtube.playerWidth,
      playerVars: {
        rel: 0,
        showinfo: 0,
		origin: '*'
      },
	  
      events: {
        'onReady': onYoutubeReady,
        'onStateChange': onYoutubeStateChange
      }
    });
  };

  this.loadPlayer = function () {
    if (youtube.ready && youtube.playerId) {
      if (youtube.player) {
        youtube.player.destroy();
      }
      youtube.player = service.createPlayer();
    }
  };

  this.launchPlayer = function (id, title) {
	  //console.log('id in launchPlayer');
	  //console.log(id);
	  //console.log('id in launchPlayer');
	  youtube.player.setLoop(true);
    youtube.player.loadVideoById(id);
	
    youtube.videoId = id;
    youtube.videoTitle = title;
    return youtube;
  }
  
  
  this.launchPlayerTrack = function(id,title){
	  
	   youtube.player.loadPlaylist(id);
	   youtube.player.setLoop(true);
	  
	  
  }
  
  this.launch = function (paramSongList) {
	
	  youtube.playerVars.playlist=paramSongList;
	  
	  return youtube;
  }  

  this.listResults = function (data) {
    results.length = 0;
    for (var i = data.items.length - 1; i >= 0; i--) {
      results.push({
        id: data.items[i].id.videoId,
        title: data.items[i].snippet.title,
        description: data.items[i].snippet.description,
        thumbnail: data.items[i].snippet.thumbnails.default.url,
        author: data.items[i].snippet.channelTitle
      });
    }
    return results;
  }

  this.listResultsTwo = function (data) {
    resultsTwo.length = 0;
    
	for(var x=0;x<=data.items.length-1;x++){
	
	 resultsTwo.push(
      { 
	   'title': data.items[x].snippet.title ,
	   'thumbnail': data.items[x].snippet.thumbnails.default.url,
	   'videoid': data.items[x].id.videoId,
	   'drag': true  
	  }
	 );		
		}
	
	
	
    return resultsTwo;
  }
  
  
  
  
  this.queueVideo = function (id, title) {
    upcoming.push({

	  videoid: id,
      title: title
    });
	
	
    return upcoming;
  };

  this.archiveVideo = function (id, title) {
    history.unshift({

	  videoid: id,
      title: title
    });
    return history;
  };

  this.deleteVideo = function (list, id) {
//console.log('just requested a deleteVideo');
//console.log('the list is');
	//console.log(list);
//console.log('the list is');
//console.log('the id is');
	//console.log(id);
//console.log('the id is');


    for (var i = list.length - 1; i >= 0; i--) {
     
	  if (list[i].videoid === id) {
        list.splice(i, 1);
        break;
      }
    }
	  
  };

  this.getYoutube = function () {
    return youtube;
  };

  this.getResults = function () {
    return results;
  };

   this.getResultsTwo = function () {
    return resultsTwo;
  };
  
  this.getUpcoming = function () {
    return upcoming;
  };
  
  this.setUpcoming= function(paramUpcomming) {
	  
	  //console.log('this.upcoming');
	  //console.log(upcoming);
	  //console.log('this.upcoming');
	  upcoming = paramUpcomming;
	 
  }
  
  

  this.getHistory = function () {
    return history;
  };
  
  this.getCurrentVideo = function () {
	 //console.log('youtube at this.getCurrentVideo');
	 //console.log(youtube);
	// console.log('youtube at this.getCurrentVideo');
   
   if(youtube!==null) {	 
	if(youtube.player!== null)	{
			if (youtube.state = 'playing'){	
			
			var myTitle = youtube.player.getVideoData();
			console.log(myTitle);
			return myTitle;
			}
			else {
				return 'NTY';	 
			 } 
		}
   }
	

 }
  
  
  
  this.playVideo = function() {
    
	
};
  
 this.ellipsifyTwo = function (str) {
       
	   if (str.length > 18) {
       return (str.substring(0, 20) + "...");
         }
       else {
        return str;
       }
		
		
		
		//console.log(str);
     };

	 
 this.checkUserAlbumCollection = function (str) {
        
		
		//if (str.length > 18) {
       //return (str.substring(0, 20) + "...");
         //}
       //else {
        //return str;
       //}
		
	
     };	 
	 
	 
	 
	 
this.isInArray = function (value1, value2,value3,array) {	 



//console.log('value1')
//console.log(value1)
//console.log('value1')

//console.log('value2')
//console.log(value2)
//console.log('value2')

//console.log('value3')
//console.log(value3)
//console.log('value3')


//console.log('array')
//console.log(array)
//console.log('array')



var myCreatedByIndex = service.findIndexByKeyValue(array,'_id',value2);


	
//console.log('myCreatedByIndex')
//console.log(myCreatedByIndex)
//console.log('myCreatedByIndex')
var myAlbumIndex = service.findIndexByKeyValue(array[myCreatedByIndex].albums,'auid',value3);
//console.log('myAlbumIndex')
//console.log(myAlbumIndex)
//console.log('myAlbumIndex')

//console.log('album voting on info')
//console.log(array[myCreatedByIndex].albums[myAlbumIndex].listname);
//console.log(array[myCreatedByIndex].albums[myAlbumIndex].votes);
//console.log('album voting on info')


if(myAlbumIndex	=== undefined || myAlbumIndex === null) {
var myVoteObj = {
	votedFor: false,
	currVotes: 0
};




return myVoteObj;
}	
else{

	
if(array[myCreatedByIndex].albums[myAlbumIndex].votes === undefined || array[myCreatedByIndex].albums[myAlbumIndex].votes === ""){

var myVoteObj = {
	votedFor: true,
	currVotes: 0
};




return myVoteObj;


}

if(array[myCreatedByIndex].albums[myAlbumIndex].votes.voters.length >0) {

	//check to see if particular user voted on album
	var myVoters = array[myCreatedByIndex].albums[myAlbumIndex].votes.voters;
	//console.log('myVoters');
	//console.log(myVoters);
	//console.log('myVoters');
	
	function userExists(arr,username) {
		return arr.some(function(el) {
		//return el.username === username;
		return el.id_ === username
		}); 
		}
    
      if(userExists(myVoters,value1))	{
	     
		 var myVoteObj = {
	         votedFor: false,
	         currVotes: array[myCreatedByIndex].albums[myAlbumIndex].votes.votes
             };
	     //console.log('true');
	     
		
		 return myVoteObj;
		 
		 
		 
        }

      else{
	  
	    //console.log('false');
		
		 var myVoteObj = {
	         votedFor: true,
	         currVotes: array[myCreatedByIndex].albums[myAlbumIndex].votes.votes
             };
		  
		
           //return true;
		
		   return myVoteObj;
		
		
		
        }
	

	//return false;
	
}


}



			
};	
	
this.GetUserName = function (arraytosearch,key, valuetosearch) {
    //console.log('arraytosearch');
	//console.log(arraytosearch);
	//console.log('arraytosearch');
	
	//console.log('key');
	//console.log(key);
	//console.log('key');
	
	//console.log('valuetosearch');
	//console.log(valuetosearch);
	//console.log('valuetosearch');
	
  for (var i = 0; i < arraytosearch.length; i++) {
  if (arraytosearch[i][key] == valuetosearch) {
  
   return arraytosearch[i].basic.email;
   }
   }
  return null;
   
  
   }; 
 
 
this.findIndexByKeyValue = function (arraytosearch,key, valuetosearch) {
  
  
  for (var i = 0; i < arraytosearch.length; i++) {
	 // console.log('!!!!!arraytosearch.videoid!!!!');
	  //console.log(arraytosearch.videoid);
	  //console.log('!!!!arraytosearch.videoid!!!!!');
	  
  if (arraytosearch[i][key] == valuetosearch) {
   return i;
   }
   }
  return null;
  
  
  
   };
   
   this.isEmpty= function(obj) {
   //function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}
   
   
   
   
   
  this.findArrayLength = function (arraytosearch,key, valuetosearch) {
	 
	    
	   var myCounter;
	   for (var i = 0; i < arraytosearch.length; i++) {
   	     
		 myCounter = i;
		
	   }
  //console.log('the array in findArrayLength');
  //console.log(arraytosearch);
  //console.log(arraytosearch.length)
  //console.log('the array in findArrayLength');
  
  
 
  
  return myCounter;
  
  
  
   }; 
   
 
   var albumData=[];
   this.setLengthAlbums= function(paramLength) {
	  
	
	  //console.log('this.setLenthAlbumsg');
	  //console.log(paramLength);
	  //console.log('this.setLenthAlbums');
	 
	  albumData.push({
	   lengthAlbumsMBM:paramLength,
   });
	  
  }
  
  

  this.getLengthAlbums = function () {
	  
    return albumData;
  };
   
   
  

this.getFields = function (input, field) {   
 
    var output = [];
    for (var i=0; i < input.length ; ++i){
        output.push(input[i][field])};
		//console.log('String(output.toString())');
        //console.log(output.toString());
	    //console.log('String(output.toString())');
    
	    return output.toString();
	  
};

function getFields2(input, field) {
	 var output = [];
     for (var i=0; i < input.length ; ++i)
        output.push(input[i][field]);
     return output.toString();
}

this.returnLogin = function(paramValue){
   var myLogin;
   myLogin = paramValue;
   //console.log('the  myLogin in this.returnLogin');
   //console.log( myLogin);
   //console.log('the  myLogin in this.returnLogin');
   return myLogin;
}

this.getFieldsThree = function (input, field) {   
    
	var items =[];
	var list_with_quotes
	for(var i=0; i<input.length; i++){
    items[i] = "" + input[i][field]  + "";
    }

   
	
	return items;
    
    
	  
};

 this.findIndexByKeyValue=function(arraytosearch, key, valuetosearch) {
	 //console.log('arraytosearch');
		//console.log(arraytosearch);
	 //console.log('arraytosearch');
     if(arraytosearch){	  
     for (var i = 0; i < arraytosearch.length; i++) {
     if (arraytosearch[i][key] == valuetosearch) {
     return i;
     }
     }
     return null;
     }
  
      }

	  
	  
	  
	  
this.findIfExists=function(arraytosearch, key, valuetosearch) {
	 
	 //console.log('arraytosearch');
		//console.log(arraytosearch)
	 //console.log('arraytosearch');	
	 
	  //console.log('key');
		//console.log(key);
	 //console.log('key');	
	 
	//console.log('valuetosearch');	
	 //console.log(valuetosearch);
	//console.log('valuetosearch');	
	 
	
     if(arraytosearch){	  
     for (var i = 0; i < arraytosearch.length; i++) {
     if (arraytosearch[i][key] == valuetosearch) {
		 //console.log('true');
     return true;
     }
     }
	    //console.log('false');
     return false;
     }
  
      }


this.findByListName = function(paramAlbumObject, paramListName) {
	//console.log('paramListName');
	//console.log(paramListName);
	var albumObject;
	albumObject = paramAlbumObject;
	//console.log('albumObject');
	//console.log(albumObject);
	
	
	//console.log('the albumObject');
	//console.log(albumObject);
	//console.log('thealbumObject');
	
	
  return albumObject.some(function(el) {
	  //console.log(el)
      return el.listname === paramListName;
  }); 
  
};
//
//

//
//

//
// functionality for modal opening 	   
//
	

// YOUTUBE VIDEO CODE
$(document).ready(function(){
	
 
 
});    
//
// functionality for modal opening 	   
//	   
	   


	}]) ;   
	   