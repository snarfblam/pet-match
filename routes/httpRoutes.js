var express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});
router.get('/rescues', (req, res) => {
    res.render('rescues');
});
router.get('/rescueDetails', (req, res) => {
    res.render('rescueDetails');
});
router.get('/events', (req, res) => {
    res.render('events');
});
router.get('/eventDetails', (req, res) => {
    res.render('eventDetails');
});
router.get('/addEvent', (req, res) => {
    res.render('addEvent');
});
router.get('/profile', (req, res) => {
    res.render('profile');
});
router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/register', (req, res) => {
    res.render('register');
});

module.exports = router;