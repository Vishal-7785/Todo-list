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
    return res.render('profile',{
        title: "Todo profile"
    });
 });
 app.get('/profile',function(req,res){
    return res.render('newTask',{
        title: "Todo profile"
    });
 });
 app.post('/create-work',function(req,res){
    Todo.create({
        task: req.body.task,
        date: req.body.date,
        category: req.body.category
    }, function(err,newTask){
        if(err){
            console.log(`Error in creating a task: ${err}`);
        }
        console.log('*****',newTask);
        return res.redirect('back');

    });
});
app.get('/delete/work/',function(req,res){
      Todo.findByIdAndDelete(req.query.id,function(err){
          if(err){
              console.log(`Error in deleting task: ${err}`);
              return res.redirect('back');
          }
          return res.redirect('back');
      });
});

app.listen(port,function(err){
    if(err){
        console.log(`Error in ruuning the server : ${err}`);

    }
    console.log(`Server is running on port: ${port}`);
});