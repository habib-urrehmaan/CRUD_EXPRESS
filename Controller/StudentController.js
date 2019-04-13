const Student = require('../model/Student.js');
const { body, validationResult } = require('express-validator/check');

// CLASS TO BE USED AS CONTROLLER FOR ALL THE LOGIC
class StudentController {
    
    // ADDING NEW STUDENT
    addStudent(req,res)
    { 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send({errors:errors.array() });

        }
        var newStudent=Student({
        student_name:req.body.student_name,
        program:req.body.program,
        semester:req.body.semester,
        courses:req.body.courses
        });
        newStudent.save();
        return res.send({redirect_url:'/students',errors:errors.array()});   
    }

    // GET ALL STUDENTS
    async getStudents()
    {
        let temp=[];
        await Student.find({}, ['student_name','program','semester','courses','createdAt','updatedAt'],function(err, students){
            if(err){
              console.log(err);
            } else{
                temp=students;
            }
        })
        return temp;
    }
    
    // GET SINGLE STUDENT
    getStudent(id)
    {
        return Student.findById(id,'student_name program semester courses').exec();
    }

    // UPDATE STUDENT
    updateStudent(id,student_name,program,semester,courses,res,req)
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send({errors:errors.array() });

        }
        Student.findByIdAndUpdate(id, {$set:{student_name:student_name,program:program,semester:semester,courses:courses,updatedAt:Date.now()}},{upsert: false, new: true, overwrite:false}, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
        
            console.log(doc);
        }).exec();
        return res.send({redirect_url:'/students',errors:errors.array()})
    }

    // DELETE STUDENT
    deleteStudent(id)
    {
        Student.findByIdAndRemove(id, function(err1, doc1) {
            console.log('findByIdAndRemove doc: ', doc1);
            Student.find({}, function(err2, docs) {
              console.log('Finding all: ', docs)
            })
          });
    }

    validate(method)
    {
        switch(method)
        {
            // User validation
            case 'User':{
                return [
                    body('student_name').isLength({min:2}).withMessage('Name must have at least 2 characters'),
                    body('program').isLength({ min: 4 }).withMessage('Program must have at least 4 characters'),
                    body('semester').isLength({ min: 3 }).withMessage('Semester must have at least 3 characters'),
                    body('courses').exists().withMessage('At least one course is neccessary')
                ]
            }
        }
    }

    
    
}

module.exports = StudentController;