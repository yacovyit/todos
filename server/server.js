var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('./db/mongoose');
const ObjectID = require('mongodb').ObjectID;

var User = require('./models/user').User;
var Todo = require('./models/todo').Todo;

var app = express();
//crud api
app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    })
});

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});       
    },
    (e)=>{
        res.status(400).send(e);
    });
})
//GET /todos/123434
app.get('/todos/:id',(req,res)=>{
    var id  = req.params.id;
   //valid id using isValid
        //return 404 - send back empty send
   if (!ObjectID.isValid(id)){
       return res.status(404).send();
   }

   
  //findById 
  Todo.findById(id).then((todo)=>{
        //success
        //if no todo send back 404 with empty body
        if(!todo){
            return res.status(404).send();
        }
        //if todo sent it back
        return res.status(200).send({todo});
    },(e)=>{
        //error
        //400 - and send empty body back  
        return res.status(400).send();
    })
       
           
            
        
            
});

//listen
app.listen('3000',()=>{
    console.log('Started on port 3000');
})


module.exports = {app};
