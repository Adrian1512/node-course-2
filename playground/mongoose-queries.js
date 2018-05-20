const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
let userId = "5afe6026976caa188c652970"

// let id = "5b00bfa675a87e174862195f1";

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log(todo)
// })
// if(!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log(todo)
// }).catch((e) => console.log(e));
User.findById(userId).then((user) => {
    if (!user) {
        return console.log('Id not found');
    }
    console.log(user)
}).catch((e) => console.log(e));