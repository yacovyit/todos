const {ObjectID} = require('mongodb');
const {mogoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


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