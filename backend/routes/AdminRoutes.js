const express = require('express');
const router = express.Router();
const {adminLogin, adminRegister, addCertificate, addUser, getUsers, deleteUser, Dashboard} = require('../controllers/adminControllers');
const {requireAuth}  = require('../middleware/authMiddleware');

router.post('/login', adminLogin);
router.post('/register', adminRegister);
router.post('/add-cert', addCertificate);
router.get('/dashboard', requireAuth('admin'), Dashboard)
router.get('/users', getUsers);
router.post('/add-user', addUser);
router.post('/delete-user', deleteUser);


module.exports = router;
