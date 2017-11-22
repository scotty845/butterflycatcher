var bodyparser = require('body-parser');
var express = require( 'express' );
var _ = require( 'underscore' );
var  googleapis = require('googleapis');
var async = require('async');
var http = require('http');

// bandcamp hack node-bandcamp
//var bandcamp = require('bandcamp-scraper');

var server = http.Server(app);
var mongoose = require('mongoose');
var expressValidator = require('express-validator');
var router = express.Router();
var app = express();
var User = require('../models/user_model');

var youtube = googleapis.youtube({version: 'v3', auth: 'AIzaSyDhSyywH9bzu7Bakj2nafkQH_VtGJXVEiU'});	

//  Send Album
  //router.post( '/sendAlbum/:albumInfo/:usersInfo'
//
router.post( '/sendAlbum/:albumInfo/:usersInfo', function( req, res, next ) {

    console.log('just did a router.post( /sendAlbum/:albumInfo/:usersInfo' ); 
	

	var myAlbumInfo = JSON.stringify(req.body.params.albumInfo);
	var myUsersInfo = JSON.stringify(req.body.params.usersInfo);
	
	
	   res.status(200).json({status:"ok",message:"Album Collection Sent response from DB", songobj:myAlbumInfo,usersobj:myUsersInfo})
	
} );
//  Send Album
  //router.post( '/sendAlbum/:albumInfo/:usersInfo'
//



//  Send AlbumTM Send Album To Myself
 //router.post( '/sendAlbumTM/:albumInfo/:usersInfo'
//
router.post( '/sendAlbumTM/:albumInfo/:usersInfo', function( req, res, next ) {


	console.log('just did a router.post( /sendAlbumTM/:albumInfo/:usersInfo' ); 
	
	
	var myAlbumInfo = JSON.stringify(req.body.params.albumInfo);
	var myUsersInfo = JSON.stringify(req.body.params.usersInfo);
	
	
	
	
	   res.status(200).json({status:"ok",message:"test result album sent  response from DB", mySongObjSrv:req.params})
		
	
} );

//  Send AlbumTM Send Album To Myself
 //router.post( '/sendAlbumTM/:albumInfo/:usersInfo'
//


	  
    	
		
	



 
function getNameById(paramUserId,cb){
  User.findOne({_id: paramUserId}, function(err, objs){
    if(err) cb(err);
    var returnable_name;
    if (objs.length == 1) {
       //returnable_name = objs[0].name;
	   returnable_name = objs[0].basic.email;
	   //console.log('returnable_name in getNameById');
	   //console.log(returnable_name);
	   //console.log('returnable_name getNameById ');
      return cb(null, returnable_name);
    } else {
      // Not sure what you want to do if there are no results
    }
  });
}	 
	 
	 
	 
	 
	 


function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {
   if(arraytosearch){	  
  for (var i = 0; i < arraytosearch.length; i++) {
	  //console.log('!!!arraytosearch!!!');
	 // console.log(arraytosearch);
	 // console.log('!!!arraytosearch!!!');
  if (arraytosearch[i][key] == valuetosearch) {
	  //console.log('match found');
	  //console.log(arraytosearch[i][key]);
   return i;
   }
   }
  return -1;
   }
  
   }


 // Update Album
   // router.post( '/updateAlbum/:songId/:albumId/:userId'
//
router.post( '/updateAlbum/:songId/:albumId/:userId', function( req, res, next ) {

   console.log('just did a router.post( /updateAlbum/:songId/:albumId/:userId'); 

	 
	
	var mySongInfo = JSON.stringify(req.body.params.songId);
	var myAlbumInfo = JSON.stringify(req.body.params.albumId);
	var myUserInfo =  JSON.stringify(req.body.params.userId);
	
	
	
	var mySongInfoParse = JSON.parse(mySongInfo);
	var myAlbumInfoParse = JSON.parse(myAlbumInfo);
	var myUserInfoParse = JSON.parse(myUserInfo);
	var myAlbumId = myAlbumInfoParse.label;
	var myUserId = myUserInfo;
	
	
	
	User.findOne({_id: req.body.params.userId}, function (error, doc) {
		
		
		
		if (error) {
            res.send(null, 500);
        } else if (doc) {
			 
			var records = {'records': doc};
			var albums = doc.albums;
			
			
			
			var albumIdx = functiontofindIndexByKeyValue(albums, 'listname', myAlbumId); 
		
			
			var songIdx = functiontofindIndexByKeyValue(albums[albumIdx].songs, 'videoid', req.params.songId); 
			
	
		   
            // is it valid?
          if (albumIdx !== -1) {
		
		  var mySongObject = {
			 title: mySongInfoParse.title,
             thumbnail: mySongInfoParse.thumbnail,
			 videoid: mySongInfoParse.videoid,
			 drag: true	
		  }
				
                //push it to the array 
				doc.albums[albumIdx].songs.push(mySongObject);
				doc.markModified('albums')
				
				doc.save(function(error) {	
				
                    if (error) {
                        console.log(error);
                      // res.send(null, 500);
                    } else {
						//console.log(doc);
						//console.log(doc.albums);
						console.log(doc.albums[albumIdx]);
						
                    }
                });
                // stop here, otherwise 404
                return;
            }
        }
        // send 404 not found
       // res.send(null, 404);
    });
		
		
	   
	 res.status(200).json({status:"ok",message:" added/updated song to album", songobj:mySongInfoParse})
		
	
} );
// Update Album
   // router.post( '/updateAlbum/:songId/:albumId/:userId'
//
   
  

//Delete Notifications
  //router.delete( '/deleteNotification/:userId/:notifId'
//
  
   router.delete( '/deleteNotification/:userId/:notifId', function( req, res, next ) {  
   
    console.log('just did a router.delete( /deleteNotification/:userId/:notifId'); 
	
	
	var myUserId = req.params.userId;
    var myNotifId = req.params.notifId;
    
	
   
   User.findOne({_id: req.params.userId}, function (error, doc) {

        if (error) {
            res.send(null, 500);
        } else if (doc) {
			
          
			var notifications = doc.notifications;
			
			
			
			var notifIdx = functiontofindIndexByKeyValue(notifications, 'id_', myNotifId); 
		 
			
 
		    if (notifIdx !== -1) {  
		  
				doc.notifications.splice(notifIdx,1);
				doc.markModified('notifications')
			
				doc.save(function(error) {	
				
                    if (error) {
                        console.log(error);
                      // res.send(null, 500);
                    } else {
						
					console.log('removed notification');
					console.log(doc.notifications[notifIdx]);
						
                    }
                });
                // stop here, otherwise 404
                return;
            }
       
	   
	   }
	
		
		
        // send 404 not found
       // res.send(null, 404);
    });

			
	
		res.status(200).json({status:"ok",message: "notification deleted from from DB"});
   
	
   
   });
//Delete Notifications
  //router.delete( '/deleteNotification/:userId/:notifId'
//
   
   
   
   
   
   
 // Play Album
  // router.post( '/playAlbum/:albumInfo/:userInfo'
//  
router.post( '/playAlbum/:albumInfo/:userInfo', function( req, res, next ) {  
   
    console.log('just did a router.post( /playAlbum/:albumInfo/:userInfo'); 
   
	
	var myAlbumInfo = JSON.stringify(req.body.params.albumInfo);
	var myAlbumInfoParsed = JSON.parse(myAlbumInfo);
	var myUserInfo = JSON.stringify(req.body.params.userInfo);
	var myUserInfoParsed = JSON.parse(myUserInfo);
	
	
    var objectId = new mongoose.Types.ObjectId();
	if(myAlbumInfoParsed.sentBy !==""){
	var mySentBy = myAlbumInfoParsed.sentBy;	
	}
    else{
	var mySentBy = "";	
	}
	
	
	
    var myNotifObj={
	 	
	id_: objectId,
	receivedBy: [myUserInfoParsed._id],
	createdBy: myAlbumInfoParsed.createdBy, 
	sentBy:mySentBy,
	message:'Played Album',
	data: {albumInfo:myAlbumInfoParsed,trackInfo:"" }
		
	};
	
	 
    
	
	var userIds = [new mongoose.Types.ObjectId(myUserInfoParsed._id),new mongoose.Types.ObjectId(myAlbumInfoParsed.createdBy) ];
	if(myAlbumInfoParsed.sentBy !==""){
	userIds.push( new mongoose.Types.ObjectId(myAlbumInfoParsed.sentBy) );  
	};
	
	
	
	
	
	  User.find({
      '_id': { $in:userIds }
      }, function(err, docs){
       console.log(docs);
	   for(x=0;x<docs.length;x++){
	      
		    
	   docs[x].notifications.push(myNotifObj);
	   docs[x].markModified('notifications')
	  
	   
	   			docs[x].save(function(error) {	
				
                    if (error) {
                        console.log(error);
                      // res.send(null, 500);
                    } else {
						
                    }
                 
				   });
				 
				 
				}
	   
      });
	
	
	
	
	//*** db stuff ****
	
        var io = req.app.get('socketio');

		io.sockets.emit('notificationUPA', {
		 message: 'Playing Album',
		 sentBy: myAlbumInfoParsed.createdBy,
		 receivedBy: myUserInfoParsed._id,
		 albumInfoSent: myNotifObj.data
		});
   
       res.status(200).json({ status:"ok",message:"user playing album and all users notifications updated",albumplayedobj:myAlbumInfoParsed })
   
});
// Play Album
  // router.post( '/playAlbum/:albumInfo/:userInfo'
//  
   
   
   
 
//  Play Album Track
  //router.post( '/playAlbumTrack/:albumInfo/:userInfo/:trackInfo'
//
router.post( '/playAlbumTrack/:albumInfo/:userInfo/:trackInfo', function( req, res, next ) {  
   
   console.log('just did a router.post( /playAlbumTrack/:albumInfo/:userInfo/:trackInfo'); 
	
	var myAlbumInfo = JSON.stringify(req.body.params.albumInfo);
	var myAlbumInfoParsed = JSON.parse(myAlbumInfo);
	var myUserInfo = JSON.stringify(req.body.params.userInfo);
	var myUserInfoParsed = JSON.parse(myUserInfo);
	var myTrackInfo = JSON.stringify(req.body.params.trackInfo);
	var myTrackInfoParsed = JSON.parse(myTrackInfo);
	
	
    var objectId = new mongoose.Types.ObjectId();
	if(myAlbumInfoParsed.sentBy !==""){
	var mySentBy = myAlbumInfoParsed.sentBy;	
	}
    else{
	var mySentBy = "";	
	}
	
    var myNotifObj={
	 	
	id_: objectId,
	receivedBy: [myUserInfoParsed._id],
	createdBy: myAlbumInfoParsed.createdBy, 
	sentBy:mySentBy,
	message:'Played Track',
	data: {albumInfo:myAlbumInfoParsed,trackInfo:myTrackInfoParsed }
		
	};
	
	
    
	
	var userIds = [new mongoose.Types.ObjectId(myUserInfoParsed._id),new mongoose.Types.ObjectId(myAlbumInfoParsed.createdBy) ];
	if(myAlbumInfoParsed.sentBy !==""){
	userIds.push( new mongoose.Types.ObjectId(myAlbumInfoParsed.sentBy) );  
	};
	
	
	  User.find({
      '_id': { $in:userIds }
      }, function(err, docs){
       console.log(docs);
	   for(x=0;x<docs.length;x++){
	      
		    
	   docs[x].notifications.push(myNotifObj);
	   docs[x].markModified('notifications')
	  
	   
	   			docs[x].save(function(error) {	
				
                    if (error) {
                        console.log(error);
                      // res.send(null, 500);
                    } else {
						
                    }
                 
				   });
				 
				 
				}
	   
      });
	
	
	
	
        var io = req.app.get('socketio');

		io.sockets.emit('notificationUPT', {
		 message: 'Playing Track From Album',
		 sentBy: myAlbumInfoParsed.createdBy,
		 receivedBy: myUserInfoParsed._id,
		 albumInfoSent: myNotifObj.data
		});
   
       res.status(200).json({status:"ok",message:"user playing track from album notifications updated", albumplayedobj:myAlbumInfoParsed,trackplayedobj:myTrackInfoParsed })
   
} );
//  Play Album Track
  //router.post( '/playAlbumTrack/:albumInfo/:userInfo/:trackInfo'
//
   
   
   
   
   
   
//send album
	//  router.post( '/sendAlbum/:albumInfo/:usersInfo/:createdBy/:paramType'
//
router.post( '/sendAlbum/:albumInfo/:usersInfo/:createdBy/:paramType', function( req, res, next ) {

	console.log('just did a /sendAlbum/:albumInfo/:usersInfo/:createdBy/:paramType'); 
	
	var myAlbumInfo = JSON.stringify(req.body.params.albumInfo);
	var myAlbumInfoParsed = JSON.parse(myAlbumInfo);
	var myUsersInfo = JSON.stringify(req.body.params.usersInfo);
	var myUsersInfoParsed = JSON.parse(myUsersInfo);
	var myCreatedBy = JSON.stringify(req.body.params.createdBy);
	var myCreatedByParsed = JSON.parse(myCreatedBy);
	var myParamType = JSON.stringify(req.body.params.paramType);
	var myParamTypeParsed = JSON.parse(myParamType);
	
	
	for (var x=0;x<myUsersInfoParsed.length;x++){
	
		    var myAlbumObject={ 
			listname: myAlbumInfoParsed.listname,
			auid: myAlbumInfoParsed.auid,
			status: "private",
			createdBy: myAlbumInfoParsed.createdBy,
			sentBy: myCreatedByParsed,
			songs: myAlbumInfoParsed.songs
          
			};
			
			var userRecArray=[];
			userRecArray.push(myUsersInfoParsed[x].uid);
	        
			
		    switch(myParamTypeParsed){
		    case "rbm":
			var mySentTypeObj = {type:myParamTypeParsed,message:""};
			break;	
			case "rbmfn":
            var mySentTypeObj = {type:myParamTypeParsed,message:""}; 
			break;	
		    case  "mbm":
			var mySentTypeObj = {type:myParamTypeParsed,message:"Sent Album"};
			break;
			case  "mbp":
			var mySentTypeObj = {type:myParamTypeParsed,message:"Added a public collection to your own collection"};
			break;
		    }
		
			
			var objectId = new mongoose.Types.ObjectId();
			var myNotifObj={
	        id_: objectId,
	        receivedBy: myUsersInfoParsed,
			createdBy:myAlbumInfoParsed.createdBy, 
			sentBy:myCreatedByParsed,
			sentType: mySentTypeObj,
			message:'Sent Album',
			data: {albumInfo:myAlbumInfoParsed,trackInfo:"" }
				
			};
		
		
		   
		
			User.findOne({_id: myUsersInfoParsed[x].uid}, function (error, doc) {
		
		
		
		
		if (error) {
            res.send(null, 500);
        } else if (doc) {
			 
			var records = {'records': doc};
			var albums = doc.albums;
			var notifications = doc.notifications;
			
			
			doc.albums.push(myAlbumObject);
			doc.markModified('albums')
			doc.notifications.push(myNotifObj)
			doc.markModified('notifications')
			
		
				
				
				doc.save(function(error) {	
				
                    if (error) {
                        console.log(error);
                      // res.send(null, 500);
                    } else {
						
                        // send the records
                        //res.send(records);
                    }
                });
                // stop here, otherwise 404
                return;
            }
       
        // send 404 not found
       // res.send(null, 404);
    });
		
		
		
		
	};
	
	
	   
	   var io = req.app.get('socketio');

		 io.emit('notificationSendAlbum', {
		 message: 'Album Sent',
		 sentBy: myCreatedByParsed,
		 usersSent: myUsersInfoParsed,
		 albumInfoSent: myAlbumInfoParsed,
		 sentType: mySentTypeObj
		
		});
	   
	   res.status(200).json({status:"ok",message:"sent album to users", albumsentobj:myAlbumInfoParsed, userssentobj:myUsersInfoParsed})
		
	
} );
//send album
	//  router.post( '/sendAlbum/:albumInfo/:usersInfo/:createdBy/:paramType'
//
  

//add album
  //router.post( '/addAlbum' 
//
router.post( '/addAlbum', function( req, res, next ) {
	
	console.log('just did a /addAlbum'); 
	 
	
	  var myAlbumName = req.body.albumText;
	  var myCreatedBy = req.body.createdBy;
	  var myUserId = req.body.userId;
	  
	 
	User.findOne({_id: myUserId}, function (error, doc) {
	
		
		if (error) {
            res.send(null, 500);
        } else if (doc) {
			 
			var records = {'records': doc};
			var albums = doc.albums;
			
		
			var objectId = new mongoose.Types.ObjectId();	
		
			var myAlbumObject={
			auid: objectId,		
			listname: myAlbumName,
			status: 'private',
			createdBy: myCreatedBy,
			songs: [] };
			
			doc.albums.push(myAlbumObject);
			doc.markModified('albums')
			
			
		
				
				doc.save(function(error) {	
				
                    if (error) {
                        console.log(error);
                      // res.send(null, 500);
                    } else {

                        // send the records
                        //res.send(records);
                    }
                });
                // stop here, otherwise 404
                return;
            }
       
        // send 404 not found
       // res.send(null, 404);
    });
		
		
		
         var io = req.app.get('socketio');

		 io.emit('notificationAddedAlbum', {
		  message: 'Album Added',
		  addedBy: myUserId
		  //albumInfoSent: myAlbumInfoParsed
		 });
		
	   
	   res.status(200).json({status:"ok",message:"added album collection", albumcreatedobj:myAlbumName})
		
		
});
//
//  Create Record Album
// router.post /addAlbum  
//





//gets all albums that are public ie shared to music box
  // router.get('/publicAlbums', function(req, res)
//

  router.get('/publicAlbums', function(req, res) {
	 
	 console.log('just did a /publicAlbums');
	 
	 
	  var totalpoints = 0;
	  
	   //admin user holds all albums can delete
	   //hard coded until a management console is built out
       User.findOne({_id: mongoose.Types.ObjectId("5a15f009ac320714003476db") }, function (error, doc) {		  
	 
		  
			 var AlbumsMBP = [];
			 
			 
	         if (error) {
             //res.send(null, 500);
			 res.status(200).json({albumsMBM: '',albumsRBM:'',albumsMBP:'', points: totalpoints});
			 
			 
             } else if (doc) {
			 
			 
			 
			 //console.log('doc /publicAlbums/');
			 //console.log(doc);
			 //console.log('doc /publicAlbums/');
           
			 
			 var albums = doc.albums;
			
			 //console.log('the albums are');
			 //console.log(albums);
			 //console.log('the albums are');
			 
			 for(x=0;x<albums.length; x++){
				 
				 AlbumsMBP.push(albums[x])
				 
			 }
		
			
			}
			
			
			//console.log('AlbumsMBP');
				//console.log(AlbumsMBP);
			//console.log('AlbumsMBP');
			
			
			res.status(200).json({albumsMBP:AlbumsMBP, points: totalpoints});
	
	  
		})
	  
	  
  });

//gets all albums that are public ie shared to music box
  // router.get('/publicAlbums', function(req, res)
//



//gets all songs posted by a user but segments them
// createdBy and status
  //router.get('/userAlbums/:_id'
//
  router.get('/userAlbums/:_id', function(req, res) {
	  
	  console.log('just did a /userAlbums/:_id');
	  
	  //console.log('req.params');
	  //console.log(req.params);
	  //console.log('req.params');
	 
  	  var totalpoints = 0;
	  
	 
	  User.findOne({_id: req.params._id}, function (error, doc) {
		  
              //console.log('doc rbmAlbums');
			   //console.log(doc);
			 // console.log('doc rbmAlbums');
			 var AlbumsRBM = [];
			 var AlbumsMBM = [];
			 var AlbumsMBP = [];
			 var UserNotifications =[];
			 
			 
	         if (error) {
             //res.send(null, 500);
			 res.status(200).json({albumsMBM: '',albumsRBM:'',albumsMBP:'', points: totalpoints});
			 
			 
             } else if (doc) {
			 
			 //console.log('doc rbmAlbums');
			 //console.log(doc);
			 //console.log('doc rbmAlbums');
            //var records = {'records': doc};
			 //var records = {'records': doc};
			 var albums = doc.albums;
			 var notifications = doc.notifications;
			 for(n=0;n<notifications.length;n++){
                UserNotifications.push(notifications[n]);
			 };			 
			 
		  	 for(x=0;x<albums.length;x++){
			    //console.log('albums[x].createdBy');
				//console.log(albums[x].createdBy);
				//console.log('albums[x].createdBy');
				if(albums[x].createdBy !== req.params._id){
					AlbumsRBM.push(albums[x]);
				};
				if(albums[x].createdBy == req.params._id){			
					AlbumsMBM.push(albums[x]);
				};
				
				
			}
			
			
			
			//console.log('AlbumsRBM');
				//console.log(AlbumsRBM);
			//console.log('AlbumsRBM');
			//console.log('AlbumsMBM');
				//console.log(AlbumsMBM);
			//console.log('AlbumsMBM');
			//console.log('AlbumsMBP');
				//console.log(AlbumsMBP);
			//console.log('AlbumsMBP');
			
			res.status(200).json({albumsMBM: AlbumsMBM,albumsRBM:AlbumsRBM,userNTI:UserNotifications,points: totalpoints});
			
			
			
           }
			 
			 
	  
		})
	  
	
	   
    
  });

//gets all songs posted by a user but segments them
// createdBy and status
  //router.get('/userAlbums/:_id'
//



  router.get('/rbmAlbums/:_id', function(req, res) {
	  
	   console.log('just did a /rbmAlbums/:_id');
	  
	  //console.log('req.params in  rbmAlbums');
	  //console.log(req.params);
	  //console.log('req.params rbmAlbums');
	  
	  var totalpoints = 0;
	  
	  
	  	  User.findOne({_id: req.params._id}, function (error, doc) {
		  
              //console.log('doc rbmAlbums');
			   //console.log(doc);
			 // console.log('doc rbmAlbums');
			 
			 
	         if (error) {
             res.send(null, 500);
             } else if (doc) {
			 
			 console.log('doc rbmAlbums');
			 console.log(doc);
			 console.log('doc rbmAlbums');
            //var records = {'records': doc};
			 //var records = {'records': doc};
			 var albums = doc.albums;
			
			 var AlbumsRBM = [];
			 var AlbumsMBM = [];
			 var AlbumsMBP = [];
			 
		  	 for(x=0;x<albums.length;x++){
			    //console.log('albums[x].createdBy');
				//console.log(albums[x].createdBy);
				//console.log('albums[x].createdBy');
				if(albums[x].createdBy !== req.params._id){
					AlbumsRBM.push(albums[x]);
				};
				if(albums[x].createdBy == req.params._id){
					AlbumsMBM.push(albums[x]);
				};
				if(albums[x].status == "public" ){
					AlbumsMBP.push(albums[x]);
				}	
				
				
				
			}
			
			//console.log('albums');
				//console.log(albums);
			//console.log('albums');
			
			//console.log('AlbumsRBM');
				//console.log(AlbumsRBM);
			//console.log('AlbumsRBM');
			//console.log('AlbumsMBM');
				//console.log(AlbumsMBM);
			//console.log('AlbumsMBM');
			//console.log('AlbumsMBP');
				//console.log(AlbumsMBP);
			//console.log('AlbumsMBP');
			
			
			
           }
			 
	
		})
	  
	 
	  
	
	
	
  });





//updateAlbumVotes
  // router.put( '/updateAlbumVotes/:albumInfo/:userInfo/:voteInfo
//
  router.put( '/updateAlbumVotes/:albumInfo/:userInfo/:voteInfo', function( req, res, next ) {
  
  console.log('Just did a  /updateAlbumVotes/:albumInfo/:userInfo/:voteInfo');
  
  
	 var myAlbumInfo = JSON.stringify(req.body.params.albumInfo);
	 var myAlbumInfoParsed = JSON.parse(myAlbumInfo);
	 var myUserInfo = JSON.stringify(req.body.params.userInfo);
	 var myUserInfoParsed = JSON.parse(myUserInfo);
	 
	  //console.log( 'myAlbumInfoParsed');
	  //console.log( myAlbumInfoParsed);
	  //console.log( 'myAlbumInfoParsed');
	  
	 User.findOne({_id: myAlbumInfoParsed.createdBy}, function (error, doc) {

        if (error) {
            res.send(null, 500);
        } else if (doc) {
	
			var albums = doc.albums;
			
			//console.log('albums');
				//console.log(albums);			
			//console.log('albums');
			
			
			var albumIdx = functiontofindIndexByKeyValue(albums, 'auid', myAlbumInfoParsed.auid ); 
		    //mongoose.Types.ObjectId(
			//console.log('album info');
			//console.log(albumIdx);
			//console.log(albums[albumIdx]);
			//console.log('album info');
			
		 
		    if (albumIdx !== -1) {  
			    
				var myVoteObject;
				var	currentVotes;
				var currentVoters;
			    if(doc.albums[albumIdx].votes){
				//if(doc.remainingVotes.votes){
					console.log('Previous Vote');
					currentVotes = doc.albums[albumIdx].votes.votes;
                     currentVoters =doc.albums[albumIdx].votes.voters;
			         //console.log('currentVotes');
					 //console.log(currentVotes);
                //console.log('currentVotes'); 	
					//console.log('currentVoters');
					 //console.log(currentVoters);
					 //console.log('currentVoters');
						var updatedVotes;
						updatedVotes = currentVotes + 1;
						doc.albums[albumIdx].votes.votes = updatedVotes;
						
					 	currentVoters.push({id_:myUserInfoParsed._id });
				//var myVoteObject=
				//{
					//votes:currentVotes + 1,
					//voters:currentVoters 
				//};
					}
					else{
						console.log('No Previous Vote');
						//var myVoteObject;
						currentVotes = 0;
						currentVotes = currentVotes + 1;
		                currentVoters = [{id_:myUserInfoParsed._id}];
						var myVoteObject=
						{
							votes:currentVotes,
							voters:currentVoters 
						};
						
					    //console.log(myVoteObject);
							
						//doc.albums[albumIdx].votes =[];	
						//doc.albums[albumIdx].votes.push(myVoteObject);
						
						doc.albums[albumIdx].votes = myVoteObject;
						
					}
	 
					//console.log(myVoteObject);
	 
	 
			
				//doc.albums[albumIdx].votes=myVoteObject;
				doc.markModified('albums')

				doc.save(function(error) {	
				
                    if (error) {
                        console.log(error);
                      // res.send(null, 500);
                    } else {
						//console.log(doc);
						//console.log(doc.albums);
						//console.log('removed');
						//console.log(doc.albums[albumIdx]);
						
                    }
                });
                // stop here, otherwise 404
                return;
            }
        }
        // send 404 not found
       // res.send(null, 404);
    });
	
	
	
	//make and send notifications
	  var objectId = new mongoose.Types.ObjectId();
      var myNotifObj={
	   id_: objectId,
	   receivedBy: [myUserInfoParsed._id],
	   createdBy:myAlbumInfoParsed.createdBy, 
	   sentBy:"",
	   message:'Voted For',
	   data: {albumInfo:myAlbumInfoParsed,trackInfo:"" 
	   }		
	   
	   };
  
     User.update(
    {}, 
    {$push: {"notifications": myNotifObj}},
    {multi: true},
    function (err, data) {
        if (err)
            console.log(err);
     });	
	
	
	//make and send notifications
	
	     var io = req.app.get('socketio');

		 io.emit('notificationVoteAlbum', {
		  message: 'Album Voted On',
		  votedBy: myUserInfoParsed._id,
		  albumInfoSent: myAlbumInfoParsed
		 });

	
		res.status(200).json({status:"ok",message: "album voted on",votedBy:myUserInfoParsed,votedOn:myAlbumInfoParsed});
	    
	 
	 
	 
  
  })
//updateAlbumVotes
 // router.put( '/updateAlbumVotes/:albumInfo/:userInfo/:voteInfo
//

//updaAlbumStatusTwo shares album by US to Public
// router.put( '/updateAlbumStatusTwo/:albumId/:userId/:albumInfo',
//
   router.put( '/updateAlbumStatusTwo/:albumId/:userId/:albumInfo', function( req, res, next ) {
   
   console.log('just did a /updateAlbumStatusTwo/:albumId/:userId/:albumInfo');
   
	 var myUserId = req.params.userId;
	 var myAlbumId = req.params.albumId;
	 var myAlbumInfo = JSON.stringify(req.body.params.albumInfo);
	 var myAlbumInfoParsed = JSON.parse(myAlbumInfo);
	 
	 //console.log('myAlbumId');
	 //console.log(myAlbumId);
	 //console.log('myAlbumId');
     
	        
		
	
User.findOne({_id: req.params.userId}, function (error, doc) {

        if (error) {
            res.send(null, 500);
        } else if (doc) {
	
			var albums = doc.albums;
			
			//console.log('albums');
				//console.log(albums);
			//console.log('albums');
			
			
			var albumIdx = functiontofindIndexByKeyValue(albums, 'listname', myAlbumId); 
		    
			//console.log('album info');
			//console.log(albumIdx);
			//console.log(albums[albumIdx]);
			//console.log('album info');
			
		 
		    if (albumIdx !== -1) {  
				doc.albums[albumIdx].status="public"
				doc.markModified('albums')

				doc.save(function(error) {	
				
                    if (error) {
                        console.log(error);
                      // res.send(null, 500);
                    } else {
						//console.log(doc);
						//console.log(doc.albums);
						console.log('updated album status added to admin collection as permanent store');
						console.log(doc.albums[albumIdx]);
						
					  
						
                    }
                });
                // stop here, otherwise 404
                return;
            }
        }
        // send 404 not found
       // res.send(null, 404);
    });
	
	
	 
     User.update(
    {"_id": mongoose.Types.ObjectId("584f1709fba25c3cede9b6c2")}, 
    {$push: {"albums": myAlbumInfoParsed}},
    {multi: true},
    function (err, data) {
        if (err)
            console.log(err);
     });	
     
	 
	  var objectId = new mongoose.Types.ObjectId();
      var myNotifObj={
	   id_: objectId,
	   receivedBy: ['All Users'],
	   createdBy:myAlbumInfoParsed.createdBy, 
	   sentBy:myUserId,
	   message:'Album Shared To Public Collection',
	   data: {albumInfo:myAlbumInfoParsed,trackInfo:"" 
	   }		
	   
	   };
  
     User.update(
    {}, 
    {$push: {"notifications": myNotifObj}},
    {multi: true},
    function (err, data) {
        if (err)
            console.log(err);
     });	
  
  
       var io = req.app.get('socketio');

		io.emit('notificationShareAlbum', {
		 message: 'Album Shared',
		 sharedBy: myUserId,
		 albumInfoSent: myAlbumInfoParsed
		});

	
		res.status(200).json({status:"ok",message:"album status updated to public from  and entered album into admin for archiving and viewing",albumupdatedobj:myAlbumInfoParsed});
	    
  
  
  
  });
  
//updaAlbumStatusTwo shares album by US to Public
   // router.put( '/updateAlbumStatusTwo/:albumId/:userId/:albumInfo',
//
  
  
  //
 //Update Album Status
 //

   router.put( '/updateAlbumStatus/:albumId/:userId/:albumInfo', function( req, res, next ) {

	
	console.log('just did a router.put( /updateAlbumStatus/:albumId/:userId, person'); 
    console.log("Received deleteAlbum  request...");
	console.log('the id for the album to be deleted is ...' + req.params);
	console.log('the id for the album to be deleted is ...') + JSON.stringify(req.params.albumId);
    
	
	 var myUserId = req.params.userId;
	 var myAlbumId = req.params.albumId;
	 var myAlbumInfo = JSON.stringify(req.body.params.albumInfo);
	 var myAlbumInfoParsed = JSON.parse(myAlbumInfo);
	 //var myAlbumInfo = req.params.albumInfo;
	console.log('myUserId');
	console.log(myUserId);
	console.log('myUserId');
	console.log('myAlbumId');
	console.log(myAlbumId);
	console.log('myAlbumId');
	
	User.findOne({_id: req.params.userId}, function (error, doc) {

        if (error) {
            res.send(null, 500);
        } else if (doc) {
			
			
			
			
            //var records = {'records': doc};
			var records = {'records': doc};
			var albums = doc.albums;
			
			console.log('albums');
				console.log(albums);
			console.log('albums');
			
			var albumIdx = functiontofindIndexByKeyValue(albums, 'listname', myAlbumId); 
		 
			console.log('album info');
			console.log(albumIdx);
			console.log(albums[albumIdx]);
			console.log('album info');
			
		 
		    if (albumIdx !== -1) {  
		  
		  
		  
                
				
				doc.albums[albumIdx].status="public"
				//doc.albums.splice(albumIdx,1);
				doc.markModified('albums')
				
				
				doc.save(function(error) {	
				
                    if (error) {
                        console.log(error);
                      // res.send(null, 500);
                    } else {
						//console.log(doc);
						//console.log(doc.albums);
						console.log('removed');
						console.log(doc.albums[albumIdx]);
						
					   //update all of the users in db with the new notif object indicating album and its info and who it was shared 	
						
						
                    }
                });
                // stop here, otherwise 404
                return;
            }
        }
        // send 404 not found
       // res.send(null, 404);
    });
        
	    var io = req.app.get('socketio');

		io.emit('notificationShareAlbum', {
		 message: 'Album Shared',
		 sharedBy: myUserId,
		 albumInfoSent: myAlbumInfoParsed
		});

	
		res.status(200).json({status:"ok",message: "test result Album Status Updated To Public from from DB"});
	    
	
	

} );


//
//  Update Album Status
//

  
  
  

// Delete Album
 // router.delete( '/deleteAlbum/:albumId/:userId'
//

   router.delete( '/deleteAlbum/:albumId/:userId', function( req, res, next ) {

	
	
	console.log('just did a  router.delete( /deleteAlbum/:albumId/:userId'); 
   // console.log("Received deleteAlbum  request...");
	//console.log('the id for the album to be deleted is ...' + req.params);
	//console.log('the id for the album to be deleted is ...') + JSON.stringify(req.params.albumId);
    
	
	 var myUserId = req.params.userId;
	 var myAlbumId = req.params.albumId;
	//console.log('myUserId');
	//console.log(myUserId);
	//console.log('myUserId');
	//console.log('myAlbumId');
	//console.log(myAlbumId);
	//console.log('myAlbumId');
	
	User.findOne({_id: req.params.userId}, function (error, doc) {

        if (error) {
            res.send(null, 500);
        } else if (doc) {
			
			//console.log('doc in delete song');
			//console.log(doc);
			//console.log('doc in delete song');
			
			
            //var records = {'records': doc};
			var records = {'records': doc};
			var albums = doc.albums;
			
			//console.log('albums');
				//console.log(albums);
			//console.log('albums');
			
			var albumIdx = functiontofindIndexByKeyValue(albums, 'listname', myAlbumId); 
		 
			//console.log('album info');
			//console.log(albumIdx);
			//console.log(albums[albumIdx]);
			//console.log('album info');
			
		 
		    if (albumIdx !== -1) {  
		  
		  
		  
                // remove it from the array.
                //doc.favorites.splice(idx, 1);
				
				
				doc.albums.splice(albumIdx,1);
				doc.markModified('albums')
				
				
				
				doc.save(function(error) {	
				//albums[albumIdx].save(function(error) {	
                    if (error) {
                        console.log(error);
                      // res.send(null, 500);
                    } else {
						//console.log(doc);
						//console.log(doc.albums);
						console.log('removed album collection');
						console.log(doc.albums[albumIdx]);
						
                    }
                });
                // stop here, otherwise 404
                return;
            }
        }
        // send 404 not found
       // res.send(null, 404);
    });

	
	
	res.status(200).json({status:"ok",message: "album deleted from from DB"});
	    
	
	

} );

// Delete Album
 // router.delete( '/deleteAlbum/:albumId/:userId'
//


   
   
   
//  Delete Song From Album
  // router.delete( '/deleteSong/:songId/:albumId/:userId'
//


router.delete( '/deleteSong/:songId/:albumId/:userId', function( req, res, next ) {


	console.log('just did a router.delete( /deleteSong/:songId/:albumId/:userId'); 
	//console.log('the id for the Song to be deleted is ...' + req.params);
	//console.log('the id for the answer to be deleted is ...' +
	//JSON.stringify(req.params));
	
   
	

// params	
// _id
// videoid

	
// router.get('/userAlbums/:_id', function(req, res) {
	
	//Person.findOne({_id: req.params.id}, function (error, person){
       // console.log("This object will get deleted " + person);
       // person.remove();

   // });
	
	  User.findOne({_id: req.params.userId}, function (error, doc) {
		  
   //{ "albums" : { linstname: req.params.albumId} },function (error, doc) {  
	// User.find({albums: req.params.albumId}, function (error, doc) {	  
        if (error) {
            res.send(null, 500);
        } else if (doc) {
			 //User.find({albums:listid}, function (error, albumx) {
				// console.log('albumx');
				// console.log(albumx);
				// console.log('albumx');
				// });
			//console.log('doc in delete song');
			//console.log(doc);
			//console.log('doc in delete song');
            //var records = {'records': doc};
			var records = {'records': doc};
			var albums = doc.albums;
			
			
			//console.log('albums');
				//console.log(albums);
			//console.log('albums');
			//var albumIdx = doc.albums ? doc.albums.indexOf(req.params.albumId) : -1;
			
			//functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {
			var albumIdx = functiontofindIndexByKeyValue(albums, 'listname', req.params.albumId); 
			
			
			//var album = doc.albums[albumIdx];
			//console.log('album set we need to update in delete records');
			//console.log(albums[albumIdx]);
			//console.log(albumIdx);
			//console.log('album set we need to update in delete records');
			
			var songIdx = functiontofindIndexByKeyValue(albums[albumIdx].songs, 'videoid', req.params.songId); 
			//console.log('song index we need to update in delete records');
			//console.log(albums[albumIdx].songs[songIdx]);
			//console.log(songIdx);
			//console.log('song index we need to update in delete records');
			
			
			
			
            // find the delete uid in the favorites array
           // var idx = doc.favorites ? doc.favorites.indexOf(req.params.deleteUid) : -1;
		   
            // is it valid?
          //if (idx !== -1) {
		  if (songIdx !== -1) {  
		  
		  
                // remove it from the array.
                //doc.favorites.splice(idx, 1);
				doc.albums[albumIdx].songs.splice(songIdx,1);
				doc.markModified('albums')
				
				//doc.save();
				//doc.remove(doc.albums[albumIdx].songs[songIdx]);
		//doc.albums[albumIdx].songs[songIdx].splice(songIdx,1);
				//albums[albumIdx].songs[songIdx]
		        //albums[albumIdx].songs[songIdx].splice(songIdx,1);
				
                // save the doc
                //doc.save(function(error) {
				doc.save(function(error) {	
				//albums[albumIdx].save(function(error) {	
                    if (error) {
                        console.log(error);
                      // res.send(null, 500);
                    } else {
						//console.log(doc);
						//console.log(doc.albums);
						console.log(doc.albums[albumIdx]);
						//console.log(doc.albums[albumIdx].songs[songIdx]);
                        // send the records
                        //res.send(records);
                    }
                });
                // stop here, otherwise 404
                return;
            }
        }
        // send 404 not found
       // res.send(null, 404);
    });

	

	
	//req.check( 'songId', 'Song id is required.' ).notEmpty();

   // var errors = req.validationErrors();
  //  if ( errors ) {
	
//	res.json( '/MakeSurvey', { errors: errors } );
    
//	} else {
     
	
    
		
//	 var set = {};
     
	  
   // 	 db.questions.findAndModify({query: {"_id": new mongojs.ObjectId(req.params.questionId)}, 
	//     update:{$pull: {'question.answers': {'auid':  new mongojs.ObjectId(req.params.answerId)  } }
		 
		 
		 
	//	 }
	//    }, function(err, docs){
	//  console.log(docs);
	//  res.json('/MakeSurvey', {'question': docs,'err':err } );
	//  })
	  
	
		res.status(200).json({status:"ok",message:"deleted song from album collection"})
		
    //}

} );

//  Delete Song From Album
  // router.delete( '/deleteSong/:songId/:albumId/:userId'
//






// $http.get(
	 // 'https://www.googleapis.com/youtube/v3/search', {

        //params: {
          //key: 
		 // 'AIzaSyDhSyywH9bzu7Bakj2nafkQH_VtGJXVEiU'
		//  ,
		  
         // type: 'video',
        // maxResults: '50',
         // part: 'id,snippet',
         // fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
         // q: this.query
        //}
      //})
	  
	  

	  
	  
//var youtube = googleapis.youtube({version: 'v3', auth: 'AIzaSyDhSyywH9bzu7Bakj2nafkQH_VtGJXVEiU'});	 
router.post( '/YouTubeData/:searchString', function( req, res) {
//console.log('the app object');
//console.log(app);
//console.log('the app object');

var io = req.app.get('socketio');
    //io.emit('hi!');
	
io.on('search', function(socket) {
 console.log('new connection!!!!!!!socket.io!!!');


});







	
console.log('the io obj in album routes');
console.log(io);
console.log('the io obj in album routes');	

 
	   
	
	   
   io.emit('notification', {
     message: 'new customer',
     customer: {
		 name:'fufufufufufuucuckdskljkdsjksd',
		 industry: 'auto'
		 }
    });
  
var myBandCampStorTop = []; 

var myBandCampParams = {
  query: req.params.searchString,
  page: 1
};
async.series({
	bandcamp: function(callback){
      
	  //bandcamp.search(myBandCampParams, function(error, searchResults) {
		//if (error) {
		//	console.log(error);
		//} else {
			
			//myBandCampStorTop.push(searchResults[0].url)
	
		//}
		 // console.log("bandcamp done");
         // callback(null, myBandCampStorTop);
		
		//});
	  },
	  

	
    google: function(callback){
      http.get("http://www.google.com", function(res){
        console.log("google done");
        callback(null, res.statusCode);
      })
    },
    yahoo: function(callback){
      http.get("http://www.yahoo.com", function(res){
        console.log("yahoo done");
        callback(null, res.statusCode);
      })    
    }
  },
  function(err, results) {
    if(!err){
      console.log("all done");
      console.log(results.google);
      console.log(results.yahoo);
	 // console.log(results.bandcamp);
	 
    }else{
      console.log(err);
    }
  }
);	  


console.log('req.params is..');
console.log(req.params);
console.log(req.params.searchString);
console.log(req.body);
console.log(req.searchString);
console.log('req.params is..');

var myQuery = req.params.searchString;


var queryOptions = {
    'part': 'id,snippet',
	'fields': 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
	'q': 'pink floyd',
    'maxResults': 40,
    'id': 'dQw4w9WgXcQ,HL1UzIK-flA',
	
};
var queryOptionsTwo = {
         type: 'video',
         maxResults: '50',
         part: 'id,snippet',
         fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
		 q: myQuery,
		 chart: 'mostpopular',
}



console.log('the bandcamp artist url from search');
//console.log(myBandCampStorTop[0]);
console.log('the bandcamp artist url from search');


//var artistURL = "https://jeff-marshall.bandcamp.com/";
//bandcamp.getAlbumUrls(artistURL, function(error, results) {
  //if (error) {
    //console.log(error);
  //} else {
	 // console.log('getAlbumUrls')
    //console.log(results);
	//console.log('getAlbumUrls')
  //}
//});




youtube.search.list(queryOptionsTwo, function(err, data

) {
    if(err) {
        console.error(err);
        return;
    }

    console.log(data);
	 
	 
	 res.status(200).json({status:"ok",song:"test /YouTubeData From album_routes", items:data})
	 
	
});



} );


module.exports = router;