/**
 * Created by Julian Purkart, Thomas Schoenegger on 25-Jan-16.
 */
var express = require('express');
var router = express.Router();
var session = require('express-session');
var shoppingcart = require('../model/shoppingcart');

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, password)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text) {
    var decipher = crypto.createDecipher(algorithm, password)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}


router.get('/share', function (req, res) {

    console.log("server says: share button pressed");

    var messageShare = {
        status: 'NOK',
        message: 'You have to login first...'
    };

    if (req.session.email) {
        var test = require('crypto').createHash('md5').update(req.session.email).digest("hex");
        console.log(test);
        console.log(req.host + ":" + req.localPort + req.url + "/" + test);

        var hw = encrypt(req.session.email);
        console.log(hw);
// outputs hello world
        console.log(decrypt(hw));

        var messageShare = {
            status: 'OK',
            message: 'localhost:3000/share/' + hw
        };
    }

    console.log("server says: share button pressed");
    console.log(messageShare);


    res.send(messageShare);

});

router.get('/share/:user', function (req, res) {
    console.log("/share/user i'm here");
    console.log(decrypt(req.params.user));
    if (decrypt(req.params.user).lastIndexOf('load') > 1) {
        console.log(decrypt(req.params.user));
        shoppingcart.get(decrypt(req.params.user), function (result) {
            console.log(result);
            res.send(result);
        });
    } else {
        res.render('cart_readonly', {title: decrypt(req.params.user) + "'s Shopping Cart"});
    }
});

router.get('/share/:user/load', function (req, res) {
    shoppingcart.get(decrypt(req.params.user), function (result) {
        console.log(result);
        res.send(result);
    });
});

module.exports = router;