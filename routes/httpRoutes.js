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
router.get('/test', (req, res) => {
    res.render('test', {
        eventData: {
            name: "Event name",
            datestring: "11/11/11 11:11 AM",
            link: "http://website.com/thingymcstuffalot",
            addressLines: ['10 street lane', 'New York, NY 10108'],
            descriptionLines: [
                "This is totally an event at a place and you're reading the description.",
                "I just wanted to actually see some text on the page, kthxbie."
            ],
            descriptionText: "This is totally an event at a place and you're reading the description.\nI just wanted to actually see some text on the page, kthxbie."
        }
    });
});

module.exports = router;