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
    // db.collection('Todos').insertOne({
    //     text : "Somthing to do",
    //     completed : false
    // },(err,result)=>{
    //     if (err){
    //        return console.log('Unable to add todo',err);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });
 db.collection('Users').insertOne({
        
        name : "yacov",
        age : 38,
        location : "Tel aviv"
    },(err,result)=>{
        if (err){
           return console.log('Unable to add todo',err);
        }
        console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2));
    })


    db.close();
});