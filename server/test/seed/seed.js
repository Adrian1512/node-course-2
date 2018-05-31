const {Todo} = require('./../../models/todo');
const {ObjectID} = require('mongodb');
const {User} = require('./../../models/user'); 
const jwt = require('jsonwebtoken');
const userOneId =  new ObjectID();
const userTwoId =  new ObjectID();
const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneId
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333,
    _creator: userTwoId
}] ;

const users = [{
    _id: userOneId,
    email: 'adrian@gmail.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token:jwt.sign({_id: userOneId, access:'auth'}, process.env.JWT_SECRET).toString()
    }]
}, {
    _id: userTwoId,
    email: 'adrian2@gmail.com',
    password: 'userTwiPass',
    tokens: [{
        access: 'auth',
        token:jwt.sign({_id: userTwoId, access:'auth'}, process.env.JWT_SECRET).toString()
    }]
}];



const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos)
    }).then(() => done());
};


const populateUsers = (done) => {
    User.remove({}).then( () => {
        let userOne =  new User(users[0]).save();
        let userTwo =  new User(users[1]).save();
        return Promise.all([userOne, userTwo])
    }).then(() => done());
};
module.exports = {todos, populateTodos, users, populateUsers};