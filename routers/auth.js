const express = require("express")
const router = express.Router();
const User = require('../models/user')
const passport = require('passport')

router.get('/register',(req,res)=>{
    res.render('auth/register');
})

router.post('/register',async(req,res)=>{
    const {name,email,password,role} = req.body;
    console.log(name,email,password);
    const {_id} = new User({name,email,role});
    await User.register({username:email,name,email,role,_id},password);
    res.redirect('/login');
})

router.get('/login',(req,res)=>{
    res.render('auth/login')
})

router.post('/login',passport.authenticate('local',{failureRedirect:'/login',
                                    failureMessage:true}),
        (req,res)=>{
                req.flash('succes','Login Successfull');
                res.redirect('/');
        })

router.get('/logout',(req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
})


module.exports = router;