"use strict";

var mongoose = require('mongoose');
var AdminSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "please add the name"]
  },
  email: {
    type: String,
    required: [true, "please add the email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "please enter the password"]
  },
  role: {
    type: String
  }
});
module.exports = mongoose.model("Admin", AdminSchema);