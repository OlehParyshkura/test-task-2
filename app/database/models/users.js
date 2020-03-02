let mongoose = require('mongoose');

let usersSchema = {
    firstName: {type:String ,required: true},
    lastName: {type:String ,required: true},
    phone: {type:String ,required: true},
    gender: {type:Boolean ,required: true},
    age: {type: Number ,required: true},
};

module.exports = mongoose.model('User', usersSchema);