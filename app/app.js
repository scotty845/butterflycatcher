'use strict';


(function () {

	var app = angular.module('musicApp', ['ngRoute','ngCookies','ngResource','app.SocketFactory', 'app.JukeBoxServiceTwo','ui.utils','base64','ui.bootstrap','ui-notification','app.datfactory','ngSanitize','ngAvatar','slickCarousel','underscore']);
    app.config(function ($routeProvider) {
        $routeProvider
   
 
	.when('/Collector', {
	   templateUrl: 'templates/users/dragdrop15.html',
        controller: 'MediaCtrl'
	})
  
  
   .otherwise({
	   templateUrl: 'templates/users/dragdrop15.html',
        controller: 'MediaCtrl'
    
    })
		
	
        
    });
}());
