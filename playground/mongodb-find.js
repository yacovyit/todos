//const MongoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');
const {ObjectID} = require('mongodb');
var obj = new ObjectID();
console.log(obj);
// console.log(name);
MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,db)=>{
    if (error){
        console.log('Unable to connect to mongodb server');
        return;
    }
    console.log('Connected to Mongodb server');
    db.collection('Users').find({
        name:"yacov1"})
        .toArray().then((docs) =>{
        console.log('Users');
        console.log(JSON.stringify(docs,undefined,2));    
    },(err)=>{
        console.log('Unable to fetch users',err)
    })
 
    //db.close();
});