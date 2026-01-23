const express = require('express');
const Rating = require('../models/ratingModel');
const Course = require('../models/courseModel');
const isLoggedIn = require('../middleware/auth');

const router = express.Router();

router.get('/', isLoggedIn, async (req, res) => {
    const userId = req.session.user._id;

    // 1️⃣ All ratings by user
    const ratings = await Rating.find({ userId });
    console.log("RATINGS:", ratings);

    // 2️⃣ Courses rated 4 or 5
    const liked = ratings.filter(r => r.rating >= 4);
    console.log("LIKED RATINGS:", liked);

    // 3️⃣ IDs of liked courses
    const likedCourseIds = liked.map(r => r.courseId);
    console.log("LIKED COURSE IDS:", likedCourseIds);

    // 4️⃣ Fetch liked courses
    const likedCourses = await Course.find({ _id: { $in: likedCourseIds } });
    console.log("LIKED COURSES:", likedCourses);

    // 5️⃣ Extract categories
    const categories = likedCourses.map(c => c.category);
    console.log("CATEGORIES:", categories);

    // 6️⃣ IDs of ALL rated courses (to exclude)
    const ratedCourseIds = ratings.map(r => r.courseId);

    // 7️⃣ FINAL RECOMMENDATION QUERY
    const recommendations = await Course.find({
        category: { $in: categories },
        _id: { $nin: ratedCourseIds }   // ⭐ KEY LINE
    });

    console.log("RECOMMENDATIONS:", recommendations);

    res.render('recommend', { recommendations });
});

module.exports = router;
