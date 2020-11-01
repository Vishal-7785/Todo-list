const express = require('express');
const port = 9000;
const path = require('path');
const app = express();
// Importing db from config folder
const db = require('./config/mongoose');
// Importing todo model from models folder
const Todo = require('./models/todo');
// Setting view engine as ejs
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
// Using a middleware to encode stuffs
app.use(express.urlencoded());
// Using static middleware to access static files
app.use(express.static('assets'))

// A router and an action to render home page ofn todo
 app.get('/',function(req,res){
    return res.render('home',{
        title: "Todo profile"
    });
 });
 // An action to render add-new-task page
 app.post('/newTask/createWork',function(req,res){
     // Creating task in database
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
 // Action to render personal tasks page
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
 // Action for coming to home page
 app.get('/personal/back',function(req,res){
        return res.redirect('/');
 });

 // Action to render schoool tasks page
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

 // Action to render work tasks page

app.get('/work',function(req,res){
    Todo.find({},function(err,todo){
       if(err){
           console.log('Error in fetching tasks from db');
           return;
       }
       return res.render('work',{
           title: "Personal Tasks",
           TODO: todo
       });

    });
  
});

 // Action to render other tasks page

app.get('/other',function(req,res){
    Todo.find({},function(err,todo){
       if(err){
           console.log('Error in fetching tasks from db');
           return;
       }
       return res.render('other',{
           title: "Personal Tasks",
           TODO: todo
       });

    });
  
});
// Action to delete a personal task 
app.post('/personal/delete-task',function(req,res){
    // Taking id from checkbox
       const check = req.body.checkbox;
       // Finding by ID and deleting the task
       Todo.findByIdAndDelete(check,function(err){
        if(err){
            console.log('Error in deleting tasks from db',err);
            return;
        }
        return res.redirect('/personal');
       });
      
});
// Action to delete a school task
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

// Action to delete a other task

app.post('/other/delete-task',function(req,res){
    console.log(req.body.checkbox);
    const check = req.body.checkbox;
    Todo.findByIdAndDelete(check,function(err){
     if(err){
         console.log('Error in deleting tasks from db',err);
         return;
     }
     return res.redirect('/other');
    });
   
});

// Action to delete a work task

app.post('/work/delete-task',function(req,res){
    console.log(req.body.checkbox);
    const check = req.body.checkbox;
    Todo.findByIdAndDelete(check,function(err){
     if(err){
         console.log('Error in deleting tasks from db',err);
         return;
     }
     return res.redirect('/work');
    });
   
});

//  app.get('/newTask',function(req,res){
    
//      return res.render('newTask',{
//          title: "New Task"
//      });
//  });

// Starting the server

app.listen(port,function(err){
    if(err){
        console.log(`Error in ruuning the server : ${err}`);

    }
    console.log(`Server is running on port: ${port}`);
});