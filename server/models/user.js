var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true },
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Client', 'Admin'],
    default: 'Client'
  }
},
{
  timestamps: true
});

// Hash the user's password before saving
userSchema.pre('save', function(next) {
  const user = this,
        SALT_FACTOR = 7;

  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, SALT_FACTOR, function(err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

// ## Methods ##

// Method to compare password for login
userSchema.methods.validPassword = function(providedPassword, cb) {
  bcrypt.compare(providedPassword, this.password, function(err, isMatch) {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
}

var User = mongoose.model('User', userSchema);

module.exports = User;
