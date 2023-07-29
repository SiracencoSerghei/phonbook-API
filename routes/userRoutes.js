const express = require('express')
const {signUp } = require('../controllers/userControllers')
const router = express.Router();

router.post('/signup', signUp )

router.post('/login', )

router.post('/logout', )

router.get('/current', )


module.exports = router;