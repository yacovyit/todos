const ObjectID = require('mongodb').ObjectID;
const mogoose = require('./../server/db/mongoose').mongoose;
const Todo = require('./../server/models/todo').Todo;
const User = require('./../server/models/user').User;

// var id = '56f4780c477c664c2cdb54eb1';

// if (!ObjectID.isValid(id)){
//     console.log('Id not valid');
// }
// Todo.find({
//     _id: id
// })
// .then((todos)=>{
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// })
// .then((todo)=>{
//     console.log('Todos', todo);
// });

// Todo.findById(id)
// .then((todo)=>{
//     if (!todo){
//         return console.log('Id not found');
//     }
//     console.log('Todos', todo);
// }).catch((e)=>{
//     console.log(e);
// });

//User findById user not exit .user exist ,id not valid
 var id = '58f45af9c5bf0d424535c8d9';


User.findById(id).then((user)=>{
    if (!user){
        return console.log('Id not founs');
    }
    console.log(JSON.stringify(user,undefined, 2));
},(e)=>{
    console.log(e);
})
//.catch((e)=>{
//    console.log(e);
//});