const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const router = express.Router();

router.get('/',(req,res)=>{
    res.render('login');
})

module.exports = router;