const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getCertificates, verify} = require('../controllers/userControllers');
const {requireAuth} = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/home', requireAuth("user"), getCertificates);
router.post('/verify', verify);

module.exports = router;
