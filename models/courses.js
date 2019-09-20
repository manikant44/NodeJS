const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    
});

const Course = mongoose.model('Course',CourseSchema)

module.exports = Course;
