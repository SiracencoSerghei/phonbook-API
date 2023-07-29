const express = require('express')
const { signUp, logIn } = require('../controllers/userControllers')
const signupValidate = require('../middlewares/userValidation')
const router = express.Router();

router.post('/signup',signupValidate, signUp )
// додати валідацію
router.post('/login', logIn)

router.post('/logout', )

router.get('/current', )


module.exports = router;