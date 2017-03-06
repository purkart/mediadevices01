var express = require('express');
var router = express.Router();
var session = require('express-session');
var crypto = require('crypto');
var user = require('../model/user');

/* GET users listing. */
router.get('/signup', function(req, res, next) {
    res.render('signup');
});

router.post('/signup', function (req, res) {
    // Prepare output in JSON format

    //generate authentication token
    var seed = crypto.randomBytes(20);
    var authToken = crypto.createHash('sha1').update(seed + req.body.params.email).digest('hex');

    data = {
        first_name: req.body.params.first_name,
        last_name: req.body.params.last_name,
        email: req.body.params.email,
        pwd: req.body.params.pwd,
        authToken: authToken

        // remember:req.body.remember
    };

    user.add(data, function (result) {
        console.log(result);
        res.json(result);

    });
});

router.get('/verify_email', function(req,res) {
    console.log('verify_email token: ',req.query.token);

    user.get(req.query, function (result) {

        console.log(result);
        var userData = result;

        if (result.status == 'OK') {

            user.verify(req.query, function (result) {
                if (result.status == 'OK') {
                    console.dir(req.session);
                }
            });
        }

        res.render('cart', {message: 'Your email has been verified, please login now'});
    });
});

module.exports = router;