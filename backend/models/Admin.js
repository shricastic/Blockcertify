const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
  username:{
    type: String,
    required: [true, "please add the name"]
  }, 

  email:{
    type: String,
    required: [true, "please add the email"]
  },

  password:{
    type: String, 
    required: [true, "please enter the password"]
  }
});


module.exports = mongoose.model("Admin", AdminSchema);
