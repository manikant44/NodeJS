const course = require('../models/courses')
module.exports = {

    create: function (req, res) {
        const AddCourse = new course(req.body);
        console.log("reqbody", req.body)
        AddCourse.save()
            .then(() => {
                return res.status(200).json({ 'AddCourse': 'course added successfully' })
            })
            .catch(() => {
                const { error } = validateCourse(req.body) // here we define an object with error value and pass it to res body
                if (error) return res.status(400).send(error.details[0].message)
            })

    },
    get: function (req, res) {
        const { id } = req.params;
        course.findById(id)
        .then((result) => {
          if (!result) {
            return res.status(404).send({
              status: "error",
              message: "Account Not Found",
            })
          }
          return res.json({
            status: "success",
            message: "Successfully Retrieved Account",
            data: result
          });
        })
        .catch(err => {
          console.error(err)
          return res.status(500).send()
        })
        },
     listAll: function(req,res) {
        course.find()
        .then(result => res.status(201).send({
            status: "success",
            message: "Successfully Retrieved Accounts",
            data: result
        }))
        .catch(err => {
          console.error(err)
          return res.status(500).send()
        })
     },
     update: function(req,res) {
        const { id } = req.params;
        const data = req.body;
        course.findById(id)
        .then((result) => {
          if (!result) {
            return res.status(404).send({
              status: "error",
              message: "Account Not Found",
            })
          }
          return Object.assign(result, data);
        })
        .then((model) => model.save())
        .then((result) => res.json({
            status: "success",
            message: "Successfully Updated Account",
            data: result,
        }))
        .catch(err => {
          console.error(err)
          return res.status(500).send()
        })
     },
     deleteAccount: function (req, res) {
      
    course.remove(id)
    
      
      }       
    

}

validateCourse = (course) => {
    const schema = {
        name: Joi.string().min(3).required()  // define a validation schema for post method
    }
    return Joi.validate(course, schema) // here we validate our body with joi package

}