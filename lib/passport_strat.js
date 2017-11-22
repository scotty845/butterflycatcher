'use strict';
//var StringDecoder = require('string_decoder').StringDecoder;
//var decoder = new StringDecoder('utf8');
//var BlobBuilder = require('blob');

var myBcrypt = require('bcrypt-nodejs');

var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user_model');

var bodyparser = require('body-parser');
var eat_auth = require('../lib/eat_auth');


module.exports = function(passport) {
  passport.use('basic', new BasicStrategy({}, function(email, password, done) {
  
    User.findOne({'basic.email': email}, function(err, user) {
		
		//var hash=user.generateHash(String(password));
		//var hash=user.generateHash( new Buffer(password, 'binary') );
		
		//var hash=user.generateHash( new Buffer(JSON.stringify(password).toString('base64'), 'base64') );
		
		//user.basic.password =  user.generateHash( new Buffer(JSON.stringify(password).toString('base64'), 'base64') );
		
		//user.basic.password=hash; 
		
		//user.basic.password =  user.generateHash( JSON.stringify(password).toString('base64'), 'base64') ;
		
		
		//user.basic.password =  user.generateHash( password.toString() ) ;
		
		
		//user.save(function(err, user) {
        //if (err) res.status(500).send({msg: 'could not save user'})
		//});
	
	    //user.generateToken(appSecret, function(err, token) {
         //if (err) return res.status(500).send({msg: 'could not generate token'});
         // res.json({eat: token});
          //})
		
	
	
		console.log('the user in passport_strat is');
		console.log(user);
		console.log('the user in passport_strat is');
		
		console.log('the passed in password param is');
		console.log(password);
		console.log('the passed in password param is');
		
		// Generate a salt
		//var salt = myBcrypt.genSaltSync(10);
		// Hash the password with the salt
		//var hash = myBcrypt.hashSync(password, salt);
		
		//var hash=user.generateHash(String(password));
		//user.basic.password=hash;
		
		
		//var myHashedPass = myBcrypt.hashSync(password, 10);
		
		
		//var buf = new Buffer(password, 'base64');
		//var buf = hash;
		//console.log('hash');
		//console.log(hash);
		//console.log('hash');
		
		//var str = new Buffer(password, 'base64').toString("ascii");
		
		
      if (err) return done('could not even get to users');


	  
	 // var myConvSTB = buf;	  
	 // console.log('myConvSTB');
	 // console.log(myConvSTB);
	  //console.log(str);
	 // console.log('myConvSTB');
	  
	  
      
	  //if (!user) return done("thats not a user ");
	  if (!user) return done("thats not a user you fuck head!!!");
       
	   
	   
	   //var myStringedPass = String(password);
	  // var myBuffedPass = new Buffer(password, 'binary');
	  
	  // console.log('generate a password hash');
	   //console.log(user.generateHash(myStringedPass) );
	  // console.log(user.generateHash(myBuffedPass) );
	  // console.log('generate a password hash');
	   
      //if (!user.validPassword(password)) return done('wrong password');
	  
	  //var textChunk = decoder.write(password);
	  
	  //if (!user.validPassword(Buffer(password))) return done('wrong password');
	  
	   if (!user.validPassword(password.toString())) return done('wrong password');
	  

      return done(null, user,{message:'password logged in'});
    });
  }));
};
