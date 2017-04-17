const {ObjectID} = require('mongodb');
const {mogoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');



//Todo.findOneAndRemove()
var id  = '58f4b1635572f49174034ff2';
Todo.findByIdAndRemove(id).then((todo)=>{
    if (!todo){
        return console.log('todo not exist');
    }

    console.log('Remove Todo', todo);
}).catch((e)=>{
    console.log(e);
});
