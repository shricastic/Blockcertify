"use strict";

var mongoose = require('mongoose');
var Certificate = require('./Certificate');
var UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "please enter the username"]
  },
  email: {
    type: String,
    required: [true, "please enter the email"]
  },
  prn: {
    type: String,
    required: [true, "please enter the prn"]
  },
  certificates: [],
  password: {
    type: String,
    required: [true, "please enter the password"]
  }
});
module.exports = mongoose.model("User", UserSchema);