// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{
    useNewUrlParser: true
}, 
(err, client) => {
    if(err){
        return console.log(`An error occured, unable to connect ot MongoDB server: ${err.message}`);
    }
    // console.log('Connected to MongoDB server');
    // const db = client.db('TodoApp');
    // db.collection('Todos').insertOne({
    //     text: 'Somenthing to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to insert todo',err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });
    // console.log('Connected to MongoDB server');
    // const db = client.db('TodoApp');
    // db.collection('Users').insertOne({
    //     name: 'Adrian',
    //     age: 19,
    //     location: 'San Jose'
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to insert todo',err);
    //     }
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    // });
    client.close();
})