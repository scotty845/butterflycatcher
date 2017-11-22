var User = require('../models/user_model');
var bodyparser = require('body-parser');
var express = require('express');
var eat_auth = require('../lib/eat_auth');
var myBcrypt = require('bcrypt-nodejs');

module.exports = function(app, passport, appSecret) {

//sign in as existing user
  app.get('/sign_in', passport.authenticate('basic', {session: false}), function(req, res) {
	
    console.log('just did  app.get(/sign_in, passport.authenticate(basic, {session: false})');	
	  
    
  
  });

  
  // sign_inTwo signs a user in with passport
    // app.get('/sign_inTwo',passport.authenticate('basic'
  //
   app.get('/sign_inTwo',passport.authenticate('basic', {session: false }), function(req, res,next) {
	   
	  
	   console.log('just did   app.get(/sign_inTwo,passport.authenticate(basic, {session: false })');	
	  
	
		
	   req.user.generateToken(appSecret.toString(), function(err, token) {
       if (err) return res.status(500).send({msg: 'could not generate token'});
	 
       res.json({eat: token});

       })
	  
	  
	  
	  });
	  
    // sign_inTwo signs a user in with passport
       // app.get('/sign_inTwo',passport.authenticate('basic'
    //  
	  
	  
	
	  //
	  //gets current user
	  //
		app.get('/user/currentuser', eat_auth(appSecret.toString()), function(req, res) {
		var currentUser = req.user;
		res.send(currentUser);
		});
	  //
	  //gets current user
	  //
	  
	  
	  
	//get users
	  //app.get('/users'
    //
	app.get('/users', function(req, res) {
	  
	  console.log('at app.get(/user on server' );
	  console.log('returns array of all users' );
	  
      User.find()
    .exec(function(err, data) {
      if (err) res.status(500).send({msg: 'could not get user'});
	  
      //res.json(data);
	  res.status(200).json({status:"ok",msg:"test /users from album_routes", users:data})
    });
	
	
	
  });
  //  get users
	  //app.get('/users'
    //	  
	  
	  
	  
 //creates new user in database for user registration
   //  app.post('/user'
 //
  app.post('/user', function(req, res) {
	  var myNewUserUsername = req.body.username;
	  console.log('req.body is');
	  console.log(req.body);
	  console.log('req.body is');
	  console.log('myNewUserUsername');
	  console.log(myNewUserUsername);
	  console.log('myNewUserUsername');
	 
	 
    var newUser = new User();
    newUser.basic.email = req.body.userRegEmail;
    newUser.basic.password = newUser.generateHash(req.body.userRegPassword);
    newUser.username = req.body.username;
    newUser.avatar = req.body.avatar;
    newUser.bio = req.body.bio;
	newUser.albums = req.body.albums;
	newUser.notifications = req.body.notifications;
    
	newUser.save(function(err, user) {
      if (err) res.status(500).send({msg: 'could not save new user'})

     //user.generateToken(appSecret, function(err, token) {
       // if (err) return res.status(500).send({msg: 'could not generate token'});
       // res.json({eat: token});
      //})
     });
  /* */   
         //res.json(data);
	  res.status(200).json({status:"ok",msg:"test /user creating a new user from user_routestwo", user:req.body})
   
  });
  
	

};

//creates new user in database for user registration
   //  app.post('/user'
 //




