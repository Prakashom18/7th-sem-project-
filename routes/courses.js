const express = require('express');
const Course = require('../models/courseModel');
const Rating = require('../models/ratingModel');
const isLoggedIn = require('../middleware/auth');

const router = express.Router();

// Show courses (PROTECTED)
router.get('/', isLoggedIn, async (req, res) => {
    const courses = await Course.find();
    res.render('courses', { courses });
});

const mongoose = require('mongoose');

// const isLoggedIn = require('../middleware/auth');

router.post('/rate', isLoggedIn, async (req, res) => {
    await Rating.create({
        userId: req.session.user._id,
        courseId: new mongoose.Types.ObjectId(req.body.courseId),
        rating: Number(req.body.rating)
    });

    res.redirect('/courses');
});


module.exports = router;
