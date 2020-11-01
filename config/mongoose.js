// Importing mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo_app_db');
// Acquiring the connection to check if it was successfull
const db = mongoose.connection;
// if errror is there
db.on('errror',console.error.bind(console,'Error connecting to database'));
// If connection Successfull
db.once('open',function(){
    console.log('Successfully connected to databse');
});
