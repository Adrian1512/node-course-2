const express = require('express');
const bodyParser = require('body-parser');
const {moongose} = require('./db/mongoose');
const {ObjectID} = require('mongodb');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');


var app = express();
app.use(bodyParser.json());
app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(e);
    })
});

app.get('/todos/:id',(req, res) => {
    let id = req.params.id;
    if(! ObjectID.isValid(id)){
        res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if(!todo){
            res.status(404).send('Todo not found');
        }
        res.send({todo})  ;
    }).catch((e) => {
        res.status(404).send();
    })
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {
    app
}