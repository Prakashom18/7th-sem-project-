const express = require('express');
const Course = require('../models/courseModel');
const Rating = require('../models/ratingModel');

const router = express.Router();

router.get('/',async (req,res)=>{
    const courses = await Course.find();
    res.render('courses',{courses});
})

router.post('/rate')