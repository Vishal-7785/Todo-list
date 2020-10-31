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
        return res.redirect('/');

    });
 });
 app.get('/personal',function(req,res){
     Todo.find({},function(err,todo){
        if(err){
            console.log('Error in fetching tasks from db');
            return;
        }
        return res.render('personal',{
            title: "Personal Tasks",
            TODO: todo
        });

     });
   
 });
 app.get('/personal/back',function(req,res){
        return res.redirect('/');
 });


 app.get('/school',function(req,res){
    Todo.find({},function(err,todo){
       if(err){
           console.log('Error in fetching tasks from db');
           return;
       }
       return res.render('school',{
           title: "Personal Tasks",
           TODO: todo
       });

    });
  
});
app.post('/personal/delete-task',function(req,res){
       console.log(req.body.checkbox);
       const check = req.body.checkbox;
       Todo.findByIdAndDelete(check,function(err){
        if(err){
            console.log('Error in deleting tasks from db',err);
            return;
        }
        return res.redirect('/personal');
       });
      
});
app.post('/school/delete-task',function(req,res){
    console.log(req.body.checkbox);
    const check = req.body.checkbox;
    Todo.findByIdAndDelete(check,function(err){
     if(err){
         console.log('Error in deleting tasks from db',err);
         return;
     }
     return res.redirect('/school');
    });
   
});
 app.get('/newTask',function(req,res){
    
     return res.render('newTask',{
         title: "New Task"
     });
 });

app.listen(port,function(err){
    if(err){
        console.log(`Error in ruuning the server : ${err}`);

    }
    console.log(`Server is running on port: ${port}`);
});