/**
 * Created by Julian Purkart, Thomas Schoenegger on 31-Jan-16.
 */
var express = require('express');
var router = express.Router();

var items = require('../model/items');

/* GET users listing. */
router.get('/shop', function(req, res, next) {
    res.render('shop');
});

router.post('/signup', function (req, res) {
    // Prepare output in JSON format
    data = {
        first_name: req.body.params.first_name,
        last_name: req.body.params.last_name,
        email: req.body.params.email,
        pwd: req.body.params.pwd,
        token: 'test'

        // remember:req.body.remember
    };

    user.add(data, function (result) {
        console.log(result);
        res.json(result);

        if (result.status == 'OK') {
            user.verify(data);
        }
    });

    //console.log("Try to send verification email...");
});

/* load the items */
router.get('/loadItems', function (req, res, next) {
    items.get(function (result) {
        console.log(result);
        res.send(result);
    });
});



module.exports = router;

