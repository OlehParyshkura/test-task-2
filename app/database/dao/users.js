let User = require('../models/users');
//let Users = require('../../database/dao/users');
module.exports = {
    ...User
};
module.exports.getUsers = (filter) => User.find({
        ...filter,
    })
    .exec();

module.exports.getUserById = (id) =>
    User.findById(id)
    .exec();

module.exports.editUser = (id, newUser) =>

    User.findOneAndUpdate({
        _id: id
    }, newUser)
    .exec();

module.exports.addUser = (user) =>
    new User(user).save();


module.exports.deleteUser = async (id) =>
    User.deleteOne({
        _id: id
    }).exec();