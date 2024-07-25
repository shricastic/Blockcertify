"use strict";

var express = require('express');
var router = express.Router();
var _require = require('../controllers/userControllers'),
  registerUser = _require.registerUser,
  loginUser = _require.loginUser,
  getCertificates = _require.getCertificates,
  verify = _require.verify;
var _require2 = require('../middleware/authMiddleware'),
  requireAuth = _require2.requireAuth;
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/home', requireAuth("user"), getCertificates);
router.post('/verify', verify);
module.exports = router;