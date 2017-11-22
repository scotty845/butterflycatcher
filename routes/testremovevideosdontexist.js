//exception if youtube video no longer exists or other source is obsolete do not add to the data
			datfactory.getlistTwo('/MakeAlbum/checkVideoStatus/',arrItems.albumsMBM[m].videoid)
			.then(function(arrResult){ 
			}) 
	



DFcheckVideoStatus	



ng-if="
DFcheckVideoStatus('/MakeAlbum/checkVideoStatus/',tracks.videoid)" class="thumbnailTwo right-caption span4 "




for(var t=0;t<$scope.songListsTwo.length;t++){
            
			console.log('looping thru albums'); 			
			datfactory.getlistTwo('/MakeAlbum/checkVideoStatus/',data[t].videoid)
			.then(function(response){ 
			
			
			})
		  }






if (!existsFunc(albums[x].songs[tmbm].videoid) ){
							//splice out song
							var spliceindex = albums.indexOf(albums[x].songs[tmbm]);
							albums[x].splice(spliceindex, 1);
						}
						else{
							
						}



var queryOptionsTwo = {
         type: 'video',
         maxResults: '50',
         part: 'id,snippet',
         fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
		 q: myQuery,
		 chart: 'mostpopular',
}
	 




//loop thru album and check each song to see if current video exists if not splice it
					
					//console.log(albums[x].length)
					//for(var tmbm=0;tmbm<albums[x].songs.length;tmbm++){
						//console.log('hello')
						//var videoexists= existsFunc(albums[x].songs[tmbm].videoid);
						//console.log(videoexists);
						//if (videoexists<1){
							//albums[x].splice(spliceindex, 1);
						    // }
						
					//}




// test service to check on video status
 router.get('/checkVideoStatus/:_id', function(req, res) {
	 console.log('your at checkVideoStatus on server');
	 console.log(req.params);
	 res.status(200).json({Status:""});
 });	


	 
existsFunc = function(youtubeId, callback) {
  
  var queryOptionsVideo = {
        
         part: 'id',
		 id: youtubeId
		 
}

 // console.log('youtube');
 // console.log(youtube.videos.list(queryOptionsTwo));
 // console.log('youtube');
  youtube.videos.list(queryOptionsVideo, function(err, result) {
    console.log(result.pageInfo.totalResults);
	
	var exists;
	exists=result.pageInfo.totalResults;
   // eixists = result.id === youtubeId;
   
    //console.log("youtubeId");
    //console.log(youtubeId);
    //console.log("exists");
    //console.log(existsonsole.lo);
   // callback (exists);
  });
};

 
// test service to check on video status

