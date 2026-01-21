const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const router = express.Router();

router.get('/',(req,res)=>{
    res.render('login');
})

router.get('/register',(req,res)=>{
    res.render('register');
})

router.post('/register',async (req,res)=>{
    try{
        let {username,password} = req.body;
        let user = await User.findOne({email : email});
        if(user) return res.status(401).send("You have already an account");
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt, async (err,hash)=>{
                let user = await User.create({
                username,
                password :hash
                })
                let token = generateToken(user);
                res.cookie("token",token);
                res.send("user created successful");
            })

        })
        
    } 
    catch(err){
        console.log(err);
    }
    //res.redirect('/')
})


module.exports = router;