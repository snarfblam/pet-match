var models = require('../models');

// The routes specified in this file will be mounted at '/api'.
// For example, app.post('createUser') will be accessible at '/api/createUser'

// todo: use our models to make the magic happen

var express = require('express');
var router = express.Router();

router.post('/login', (req, res) => {
    res.status('501').end();
});
router.post('/createAccount', (req, res) => {
    res.status('501').end();
});
// Creates a new event listing
// Expects: {userId, date, address, city, state, zip, description, RSVP}
// Returns: 
//  {
//      status: "error" | "inserted",
//      error?: string,
//      value?: (inserted record)
//  }
// Todo: some kind of user or user token validation
router.post('/editInfo', (req, res) => {
    // models.user.create({firstname: "tom",lastname:"my", username: "tommy", about: "sup", email:"a@b.com", password: "dog", last_login:Date(), status: 'active'}).then(r=>console.log(r)).catch(e=>console.log(e))
    models.events.create({
        userId: req.body.userId,
        location: req.body.location,
        description: req.body.description,
        RSVP: req.body.RSVP,
        date: req.body.date,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
    }).then(result => {
        console.log(result);
        res.json({
            status: 'inserted',
            value: result,
        });
    }).catch(e => {
        res.json({
            status: 'error',
            error: e.message || e.msg || e || "unknown error",
        });
    });
    // res.status('501').end();
});

// Modifies an existing even listing
// Expects: {date?, address?, city?, state?, zip?, description?, RSVP?}
// Returns: 
//  {
//      status: "error" | "updated",
//      error?: string,
//      affectedRows?: number
//  }
// Todo: some kind of user or user token validation
router.put('/editInfo/:id', (req, res) => {
    // update event
    models.events.update({
        location: req.body.location,
        description: req.body.description,
        RSVP: req.body.RSVP,
        date: req.body.date,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
    }, {
        where: {
            id: req.params.id,    
    }}).then(result => {
        console.log(result);
        res.json({
            status: 'updated',
            affectedRows: result[0],
        });
    }).catch(e => {
        res.json({
            status: 'error',
            error: e.message || e.msg || e || "unknown error",
        });
    });
});
// Removes and existing event entry by ID
// Returns: 
//  {
//      status: "error" | "removed",
//      error?: string,
//  }
// Todo: some kind of user or user token validation
router.delete('/editInfo/:id', (req, res) => {
    models.events.destroy({
        where: { id: req.params.id }
    }).then(result => {
        console.log(result);
        if (result == 0) {
            res.json({ status: 'error', error: 'no match found' });
        } else {
            res.json({ status: 'removed' });
        }
    }).catch(e => {
        res.json({ status: 'error', error: 'no match found' });
    });
});
router.post('/profile', (req, res) => {
    res.status('501').end();
});

module.exports = router;