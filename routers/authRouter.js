const express = require('express');
const { authvalidator } = require('../helpers/Validator');
const { 
    signInController,
    signUpController,} = require('../controller/authController');
const { dashboardController, uploadImageController } = require('../controller/usercontroller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/register', authvalidator, signUpController );
router.post('/login', authvalidator, signInController ); 
router.get('/test', dashboardController );
router.post('/upload-image',upload.single('image'),uploadImageController );

module.exports = router;