// MODEL FOR STUDENT

const mongoose = require('mongoose');
var moment = require('moment');
const Schema = mongoose.Schema;

console.log()
let StudentSchema = new Schema({
    student_name: String,
    semester:String,
    program:String,
    courses:[],
    updatedAt: { type : Date, default: () => moment()},
    // $setOnInsert: {
    createdAt: { type : Date, default: () => moment()}
    // }/
});


// Export the model
module.exports = mongoose.model('Student', StudentSchema);