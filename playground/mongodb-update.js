//const MongoClient = require('mongodb').MongoClient;
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var obj = new ObjectID();
console.log(obj);
// console.log(name);
MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,db)=>{
    if (error){
        console.log('Unable to connect to mongodb server');
        return;
    }
    console.log('Connected to Mongodb server');
    //deleteMany
    // db.collection('Todos').deleteMany({text:"Eat lanch"}).then((result)=>{
    //     console.log(result);
    // });
    // deleteOne
    // db.collection('Todos').deleteOne({text:"Eat lanch"}).then((result)=>{
    //     console.log(result.result.n);
    // })
    //findOneAnDelete
    // db.collection('Todos').findOneAndDelete({text:"Eat lanch"}).then((result)=>{
    //     console.log(result);
    // })
    // db.collection("Users").deleteMany({name:"yacov"}).then((result)=>{
    //     console.log(result);
    // })
    //58f3070bb6a5cb39efbd8e36
    //delete by id
    db.collection("Users")
    .findOneAndUpdate(
    {
        _id:new ObjectID("58f44cd25572f49174034ff0")
    },
    {
       $set : 
       {
           name : "shaked"

       },
       $inc : 
       {
           age : 1
       } 
    },
    {
        returnOriginal:false
    })
    .then((result)=>{
        console.log(result);
    })    

    //db.close();
});