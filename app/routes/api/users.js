let express = require('express');
let router = express.Router();

let Users = require('../../database/dao/users');
let {statuses, httpStatuses} = require('../../../config/constants');

router.get('/users', (request, response) => {
    Users.getUsers()
    .then(users=>response.json(users))
    .catch(err => {response.status(httpStatuses.SERVER_ERROR).json({status: statuses.failure, user: {}, error_text: err.message})});
});

router.get('/users/:id', (request, response) => {
    Users.getUserById(request.params.id)
        .then(user => {response.json({status: statuses.success, user})})
        .catch(err => {response.status(httpStatuses.SERVER_ERROR).json({status: statuses.failure, user: {}, error_text: err.message})});
});

router.post("/users", (request, response) => {
        Users.addUser(request.body)
            .then(user => {
                response.json({status: statuses.success, user})
            })
            .catch(err => {
                response.status(httpStatuses.SERVER_ERROR).json({
                    status: statuses.failure,
                    user: {},
                    error_text: err.message
                })
            });
});

router.put("/users/:id",(request, response) => {
        Users.editUser(request.params.id, request.body)
            .then(user =>{response.json({status: statuses.success, user})})
            .catch(err => {response.status(httpStatuses.SERVER_ERROR).json({status: statuses.failure, user: {}, error_text: err.message})});
});

router.delete("/users/:id",(request, response) => {
    Users.deleteUser(request.params.id)
        .then(result =>{response.json({status: statuses.success, result})})
        .catch(err => { console.log(err);
            response.status(httpStatuses.SERVER_ERROR).json({status: statuses.failure, user: {}, error_text: err.message})});
});

module.exports = router;