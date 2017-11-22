var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');

var userSchema = new Schema ({
  basic: {
    email: 'String',
    password: 'String'
  },
  username: 'String',
  avatar: 'String',
  bio: 'String',
  remainingVotes: {type: Number, default: 5},
  hasSubmitted: {type: Boolean, default: false},
  bonusPoints: {type: Number, default: 0},
  albums: {},
  notifications: {},
  votes:{}
  //songs: [{type: Schema.Types.ObjectId, ref:'Song'}]
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
	//console.log('password passed in');
	//console.log(password);
	//console.log('password passed in');
	
	//console.log('this.basic.password');
	//console.log(this.basic.password);
	//console.log('this.basic.password');
	
	
	
  return bcrypt.compareSync(password, this.basic.password);
  
  
  
  
};

userSchema.methods.generateToken = function(appSecret, callback) {
  eat.encode({id: this._id, timestamp: new Date(), username:this.username}, appSecret, callback);
};

module.exports = mongoose.model('User', userSchema);
