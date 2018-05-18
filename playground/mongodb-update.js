// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{
    useNewUrlParser: true
}, 
(err, client) => {
    if(err){
        return console.log(`An error occured, unable to connect ot MongoDB server: ${err.message}`);
    }
    // const db = client.db('TodoApp');
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5afe4bbc5754ba2c14fc8e0e')
    // }, {
    //    $set: {
    //        completed: true
    //    } 
    // },{
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // })

    const db = client.db('TodoApp');
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5afe3f69e44f80068c39ec34')
    }, {
       $set: {
           name: "Adrian",
       },
       $inc: {
           age: 1
       }
    },{
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    })
    
    
})