const mongoose = require('mongoose');
const validator  = require ('validator');
// {
//     email: "andrew@example.com",
//     password: "fdsafsadf",
//     tokens: [{
//         access: 'auth',
//         token: "dsafasdfasdfsaf"
//     }]
// }


let User = mongoose.model('User',{
    email: {
        require: true,
        trim: true,
        type: String,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '${value} is not valid'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens:[{
        access: { 
            type: String,
            required: true
        },
        token: {
            type: String,
            require: true
        }
    }]
});
module.exports = {
    User
}