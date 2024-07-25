"use strict";

var express = require('express');
var router = express.Router();
var _require = require('../controllers/adminControllers'),
  adminLogin = _require.adminLogin,
  adminRegister = _require.adminRegister,
  addCertificate = _require.addCertificate,
  addUser = _require.addUser,
  getUsers = _require.getUsers,
  deleteUser = _require.deleteUser,
  Dashboard = _require.Dashboard;
var _require2 = require('../middleware/authMiddleware'),
  requireAuth = _require2.requireAuth;
router.post('/login', adminLogin);
router.post('/register', adminRegister);
router.post('/add-cert', addCertificate);
router.get('/dashboard', requireAuth('admin'), Dashboard);
router.get('/users', getUsers);
router.post('/add-user', addUser);
router.post('/delete-user', deleteUser);
module.exports = router;