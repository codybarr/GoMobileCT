var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'Email is required',
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(v);
      },
      message: '{VALUE} is not a valid email!'
    },
  },
  password: {
    type: String,
    required: 'Password is required',
    minlength: 8
  },
  role: {
    type: String,
    required: 'Role is required',
    enum: {
      values: ['Client', 'Admin', 'Superadmin'],
      message: 'Role must be one of "Client", "Admin" or "Superadmin"'
    }
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

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
  if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });

  // bcrypt.hash(user.password, SALT_FACTOR, function(err, hash) {
  //   if (err) return next(err);
  //   user.password = hash;
  //   next();
  // });
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
