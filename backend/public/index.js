"use strict";

var express = require('express');
var app = express();
var session = require('express-session');
var cors = require('cors');
var connectDB = require('./config/db');
require('dotenv').config();
var userRoutes = require('./routes/UserRoutes');
var adminRoutes = require('./routes/AdminRoutes');
var port = process.env.PORT || 3000;
connectDB();
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(cors());
app.use(express.json());
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.listen(port, function () {
  console.log("Server running on port ".concat(port));
});