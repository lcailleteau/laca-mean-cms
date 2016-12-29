var mongoose = require('mongoose');

// USER.

// Role schema.
var roleSchema = new mongoose.Schema({
  type: String,
  siteSlug: String,
});

// User schema.
var userSchema = new mongoose.Schema({
  login: {type: String, required: true},
  password: {type: String, required: true},
  email: String,
  roles: [roleSchema]
});

// All component models.
mongoose.model('User', userSchema, 'users');
