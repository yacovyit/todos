
require('./config/config');
const _ = require('lodash');

const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('./db/mongoose');
const {ObjectID} = require('mongodb');

const {User} = require('./models/user');
const {Todo} = require('./models/todo');

const app = express();
const port = process.env.PORT;
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

app.delete('/todos/:id',(req,res)=>{
    //get the id
    var id = req.params.id;
    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        return res.status(200).send({todo});
    }).catch((e)=>{
        return res.status(400).send();
    });
});

app.patch('/todos/:id',(req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body, ['text','completed']);
    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    if (_.isBoolean(body.completed) && body.completed){
        body.completed = true;
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;      
    }
    Todo.findByIdAndUpdate(id,{$set: body},{new:true}).then((todo)=>{
        if (!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    });
});
// POST /users
app.post('/users',(req, res) =>{
    var body = _.pick(req.body, ['email','password']);
    var user = new User(body);
    
    user.save().then(() => {
        return user.generateAuthToken();
    })
    .then((token) => {
        res.header('x-auth',token).send(user)
    })
    .catch((e) => {
        return res.status(400).send(e);
    })
});

//listen
app.listen(port,()=>{
    console.log(`Started on port ${port}`);
})


module.exports = {app};
