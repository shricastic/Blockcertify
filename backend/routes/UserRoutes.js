const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getCertificates} = require('../controllers/userControllers');
const {requireAuth} = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/home', requireAuth("user"), getCertificates);

module.exports = router;
