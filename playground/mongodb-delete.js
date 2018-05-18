// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{
    useNewUrlParser: true
}, 
(err, client) => {
    if(err){
        return console.log(`An error occured, unable to connect ot MongoDB server: ${err.message}`);
    }
    const db = client.db('TodoApp');
    //deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });
    //DeleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });
    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });


    // Challenge
    db.collection('Users').deleteMany({name: 'Andrew'});
    db.collection('Users').findOneAndDelete({_id: new ObjectID('5afe3df14355bd201037a379')}).then((result) => {
        console.log(result);
    });

})