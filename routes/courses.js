const Joi = require('joi');  // joi is a validation package for npm
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')

// get the all data
router.get('/api/courses', userController.listAll)

//get the data by id
router.get('/api/courses/:id', userController.get)

// post the data
router.post('/api/courses', userController.create)

// update any data
router.put('/api/courses/:id', userController.update)

//delete the account
router.delete('/api/courses/:id', userController.deleteAccount)

validateCourse = (course) => {
    const schema = {
        name: Joi.string().min(3).required()  // define a validation schema for post method
    }
    return Joi.validate(course, schema) // here we validate our body with joi package

}

module.exports = router;