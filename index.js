const express = require('express');
const port = 9000;
const path = require('path');
const app = express();
const db = require('./config/mongoose');
const Todo = require('./models/todo');
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'))


 app.get('/',function(req,res){
    return res.render('home',{
        title: "Todo profile"
    });
 });
 app.post('/newTask/createWork',function(req,res){
    console.log('Bcbjs')
    Todo.create({
        task:     req.body.task,
        date:     req.body.date,
        category: req.body.category,
        time:     req.body.time
    }, function(err,newTask){
        if(err){
            console.log(`Error in creating a task: ${err}`);
        }
        console.log('*****',newTask);
        return res.redirect('back');

    });
 });
 app.get('/newTask',function(req,res){
     return res.render('newTask',{
         title: "New Task"
     });
 });
//  app.post('/Create-Work',function(req,res){
//      console.log('Bcbjs')
//     Todo.create({
//         task:     req.body.task,
//         date:     req.body.date,
//         category: req.body.category,
//         time:     req.body.time
//     }, function(err,newTask){
//         if(err){
//             console.log(`Error in creating a task: ${err}`);
//         }
//         console.log('*****',newTask);
//         return res.redirect('back');

//     });
// });


app.listen(port,function(err){
    if(err){
        console.log(`Error in ruuning the server : ${err}`);

    }
    console.log(`Server is running on port: ${port}`);
});