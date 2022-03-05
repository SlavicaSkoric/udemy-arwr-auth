const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// define-create our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

// on save hook, encrypt password
// before saving a model, run this function
userSchema.pre('save', function (next) {
  // get access to the user model
  const user = this;
  // user is an instance of the user model at this time
  // user.email, user.password

  // generate a salt then run callback
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

// create the model class
// will be used to create new users
const ModelClass = mongoose.model('user', userSchema);

// export the model
module.exports = ModelClass;
