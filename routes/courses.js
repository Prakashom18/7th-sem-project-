const express = require('express');
const Course = require('../models/courseModel');
const Rating = require('../models/ratingModel');

const router = express.Router();

router.get('/',async (req,res)=>{
    const courses = await Course.find();
    res.render('courses',{courses});
})

router.post('/rate',async (req,res)=>{
    await Rating.create({
        userId : req.session.user._id,
        courseId : req.body.courseId,
        rating : req.body.rating

    })
    res.redirect('/courses');
})

module.exports = router;
