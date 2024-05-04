const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getCertificates} = require('../controllers/userControllers');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/home', getCertificates);

module.exports = router;
