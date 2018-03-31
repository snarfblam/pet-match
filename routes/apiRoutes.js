// The routes specified in this file will be mounted at '/api'.
// For example, app.post('createUser') will be accessible at '/api/createUser'

// todo: use our models to make the magic happen

var express = require('express');
var router = express.Router();

router.post('login', (req, res) => {
    res.status('501').end();
});
router.post('createAccount', (req, res) => {
    res.status('501').end();
});
router.post('editInfo', (req, res) => {
    res.status('501').end();
});
router.post('profile', (req, res) => {
    res.status('501').end();
});