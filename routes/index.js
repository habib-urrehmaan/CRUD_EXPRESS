var express = require('express');
var path = require('path');
var router = express.Router();
const StudentController = require('../Controller/StudentController.js');
const api_helper = require('../public/javascripts/API_helper');
// var passport = require('passport');

// Instantiate User:
let student = new StudentController();

// router.get('/auth/facebook', passport.authenticate('facebook'));

// router.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { successRedirect: '/students',
//                                       failureRedirect: '/login' }));


router.get('/getAPIResponse', (req, res) => {
  api_helper.make_API_call('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => {
      res.json(response)
  })
  .catch(error => {
      res.send(error)
  })
})

/* GET home page. */
router.get('/students', async function(req, res) {
  let students=await student.getStudents()
  res.render('listStudents', { title: 'Student APp', students:students  });
});

router.get('/login',function(req,res){
  res.sendFile(path.join(__dirname+'/../views/test.html'));
})

router.get('/student/add', function(req, res, next) {
  res.render('addStudent', { title: 'Student APp' });
});


// SAVE STUDENT DATA
router.post('/student/save', student.validate('User'), function(req,res){
  student.addStudent(req,res);
  
});

// EDIT STUDENT DATA
router.post('/student/edit', student.validate('User'), function(req,res){
  student.updateStudent(req.body.id,req.body.student_name,req.body.program,req.body.semester,req.body.courses,res,req);
});


// EDIT STUDENT DATA
router.get('/student/edit/:id', async function(req, res) {
  try
  {
    std=await student.getStudent(req.params.id);
    res.render('editStudent',{student:std});
  }
  catch(err)
  {
    console.log(err);
  }
});


// DELETE STUDENT
router.get('/student/delete/:id',async function(req,res){
  try
  {
    await student.deleteStudent(req.params.id);
    res.redirect('/students');
  }
  catch(err)
  {
    console.log(err);
  }
});

module.exports = router;
