const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const router = express.Router();

const generateToken = (user)=>{
    return jwt.sign({
        username : user.username,
        id : user._id
    },'secret123')
}

router.get('/',(req,res)=>{
    res.render('login');
})

router.get('/register',(req,res)=>{
    res.render('register');
})

router.post('/register',async (req,res)=>{
    try{
        let {username,password} = req.body;
        let user = await User.findOne({username : username});
        if(user) return res.status(401).send("You have already an account");
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt, async (err,hash)=>{
                let user = await User.create({
                username,
                password :hash
                })
                console.log(user);
                let token = generateToken(user);
                res.cookie("token",token);
                res.redirect('/');
                // res.send("user created successful");
            })

        })
        
    } 
    catch(err){
        console.log(err);
    }
    //res.redirect('/')
})

// router.post('/login', async (req, res) => {
//     const user = await User.findOne({ username: req.body.username });
//     if (user && await bcrypt.compare(req.body.password, user.password)) {
//         req.session.user = user;
//         // res.redirect('/courses');
//         res.send('logged in')
//     } else {
//         res.send("Invalid login");
//     }
// });

router.post('/login',async (req,res)=>{
    let {username,password} = req.body;
    let user = await User.findOne({username});
    if(!user) {
        return res.status(201).send('Email  incorrect');
    }
    bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            let token = generateToken(user);
            res.cookie('token',token);
            res.send('Loogedin');
            req.session.user = user;
        }
        else{
            res.send('Email or password incorrect');
        }
    })
})

module.exports = router;