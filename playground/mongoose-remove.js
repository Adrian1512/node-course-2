const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
let userId = "5afe6026976caa188c652970"


// Todo.remove({}).then((result) => {
//     console.log(result);
// })

// Todo.findOneAndRemove({}).then((result) => {
    
// })
Todo.findByIdAndRemove('5b00f5b06b45ab91aeaacea5').then((doc) => {
    console.log(doc);
})