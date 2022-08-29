const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const userRoute=require('../controllers/user')

router.route('/register')
    .get(userRoute.registerCampGet)
    .post(catchAsync(userRoute.registerCampPost))

router.route('/login')
    .get(userRoute.loginGet) 
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), userRoute.loginPost)

router.get('/logout', userRoute.logout)
    
module.exports = router;