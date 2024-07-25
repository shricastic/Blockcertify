"use strict";

var mongoose = require('mongoose');
var CertificateSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  prn: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  certificateHash: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  issuedBy: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model("Certificate", CertificateSchema);