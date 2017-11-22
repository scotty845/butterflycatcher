
       
var app = angular.module('app.datfactory', []);
   
app.factory('datfactory', function ($rootScope,$http, $q){


     var factory = {};
	 
	 factory.setUpcoming = function(myData) {
			 
			  //console.log('this.upcoming');
			  //console.log(myData);
			  //console.log('this.upcoming');
			  factory.upcoming = myData;
		
		  }	
			
			
		factory.getUpcoming = function () {
			return factory;
			
		};
	
	 
	
    this.getlistTwo = function(paramApi,paramUserId){ 

		//console.log('paramUserId');
		//console.log(paramUserId);
		//console.log('paramUserId');
		
		var myTestUser = {
			uname:'slonder',
			_id:'5815dc4142c683284751c534'
		};	
	
        
		return $http.get(paramApi + paramUserId)
            .then(function(response) {
			   //console.log('the response is');	
               //console.log(response.data); //I get the correct items, all seems ok here
			   //console.log('the response is');
		
		 
			  return response.data;

            });            
    }
	
	
	// test service to check video status
	
	 this.checkVideoStatus = function(paramApi,paramVideoId){ 

			console.log('paramVideoId');
			console.log(paramVideoId);
			console.log('paramVideoId');
  
  
        //$http({
            //method: 'GET',
           // url: 'https://www.example.com/api/v1/page',
           // params: 'limit=10, sort_by=created:desc',
            //headers: {'Authorization': 'Token token=xxxxYYYYZzzz'}
        //}).success(function(data){
            // With the data succesfully returned, call our callback
            //callbackFunc(data);
        //}).error(function(){
            //alert("error");
        //});
  
  
  
  
		//return $http.get(paramApi + paramVideoId)
           // .then(function(response) {
			   //console.log('the response is');	
               //console.log(response.data); //I get the correct items, all seems ok here
			   //console.log('the response is');
		
		 
			 // return response.data;
			  // return true;

            //});            
    }
	
	
	
	// test service to check video status
	
	
	
	 this.getalbumsRBM = function(paramRoute,paramQuerryOne){ 

		var myTestUser = {
			uname:'slonder',
			_id:'5815dc4142c683284751c534'
		};	
	   
       
		return $http.get('/MakeAlbum/rbmAlbums/' + myTestUser._id)
            .then(function(response) {
			   //console.log('the response is');	
               //console.log(response.data); //I get the correct items, all seems ok here
			   //console.log('the response is');
			   
		
             return response;

            });            
    }
	

	
    return this;
	
	
});
