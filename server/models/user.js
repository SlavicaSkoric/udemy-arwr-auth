const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define-create our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

// create the model class
// will be used to create new users
const ModelClass = mongoose.model('user', userSchema);

// export the model
module.exports = ModelClass;
