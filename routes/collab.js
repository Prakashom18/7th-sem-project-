const express = require('express');
const Rating = require('../models/ratingModel');
const Course = require('../models/courseModel');
const User = require('../models/userModel');
const isLoggedIn = require('../middleware/auth');
const _ = require('lodash');

const router = express.Router();

router.get('/collaborative', isLoggedIn, async (req, res) => {
    const currentUserId = req.session.user._id;

    // 1️⃣ Get all ratings
    const allRatings = await Rating.find();
    const allCourses = await Course.find();

    // 2️⃣ Build user-course map
    const userCourseMap = {};
    allRatings.forEach(r => {
        if (!userCourseMap[r.userId]) userCourseMap[r.userId] = {};
        userCourseMap[r.userId][r.courseId] = r.rating;
    });

    // 3️⃣ Get current user ratings
    const currentUserRatings = userCourseMap[currentUserId] || {};

    // 4️⃣ Compute simple similarity with other users
    const similarities = [];
    for (let userId in userCourseMap) {
        if (userId === currentUserId.toString()) continue;

        const otherRatings = userCourseMap[userId];
        const commonCourses = Object.keys(currentUserRatings).filter(c =>
            otherRatings[c] !== undefined
        );

        if (commonCourses.length === 0) continue;

        // simple similarity = sum of rating differences
        let score = 0;
        commonCourses.forEach(c => {
            score += 5 - Math.abs(currentUserRatings[c] - otherRatings[c]);
        });
        similarities.push({ userId, score });
    }

    // 5️⃣ Pick top similar user
    const topUser = _.maxBy(similarities, 'score');

    if (!topUser) return res.render('recommend', { recommendations: [] });

    // 6️⃣ Recommend courses liked by similar user, not rated by current user
    const topUserRatings = userCourseMap[topUser.userId];
    const recommendations = Object.keys(topUserRatings)
        .filter(cId => !currentUserRatings[cId] && topUserRatings[cId] >= 4);

    // fetch course details
    const recommendedCourses = await Course.find({
        _id: { $in: recommendations }
    });

    res.render('recommend', { recommendations: recommendedCourses });
});

module.exports = router;
