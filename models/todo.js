// Importing mongoose
const mongoose  = require('mongoose');
// Creating a schema for our todo task
const todoSchema = new mongoose.Schema({
task: {
    type: String,
    required: true
},
date: {
    type: String,
    required: true
},
category: {
     type: String,
     required: true
},
time: {
    type: String,
    required: true
}
});
// connect todo to schema
const Todo = mongoose.model('Todo',todoSchema);
// Exporting todo
module.exports = Todo;