var express = require('express');
var router = express.Router();
var shoppingcart = require('../model/shoppingcart');

// Extension for 'Projektarbeit SS2016' - start
var requestIp = require('request-ip');
// Extension for 'Projektarbeit SS2016' - end

/* GET home page. */
router.get('/', function (req, res, next) {
    // Extension for 'Projektarbeit SS2016' - start
    var clientIp = requestIp.getClientIp(req);
    console.log(clientIp);
    // Extension for 'Projektarbeit SS2016' - end

    res.render('cart');
});

// Extension for 'Projektarbeit SS2016' - start
router.post('/identify', function (req, res) {
    if (req.cookies.fingerprint == null || req.cookies.fingerprint == undefined) {
        console.log('set fingerprint: ' + req.body.data.fingerprint);
        res.cookie('fingerprint', req.body.data.fingerprint);
    } else {
        console.log('Calculated fingerprint: ' + req.body.data.fingerprint);
        console.log('old fingerprint: '+ req.cookies.fingerprint);

        //storing the calculated fingerprint on the client
        res.cookie('fingerprint', req.body.data.fingerprint);
    }
    res.render('cart');
});
// Extension for 'Projektarbeit SS2016' - end

/* GET home page. */
router.get('/cart', function (req, res, next) {
    res.render('cart', {title: 'hello world!'});
});

/* load the shopping cart */
router.get('/loadCart', function (req, res, next) {
    if (req.session.email) {

        console.log('Loading ShoppingCart for user ' + req.session.email);

        shoppingcart.get(req.session.email, function (result) {
            console.log(result);
            res.send(result);
        });

    } else {

        var messageLogin = {
            status: 'NOK',
            message: "Please log in"
        };

        console.log("user is not logged in!");
        res.send(messageLogin);
    }
});

router.put('/updateCart', function (req, res, next) {
    // Prepare output in JSON format

    console.log(req.body.qty);

    if (req.body.item_id != null) {

        shoppingcart.updateItemQty(req.session.email, req.body.item_id, req.body.qty, function (result) {
            console.log(result);
            res.send(result);
        });
    }
});

router.put('/addItemToCart', function (req, res, next) {
    // Prepare output in JSON format

    console.log(req.body);

    if (!req.session.email) {
        var message = {
            status: 'NOK',
            message:"Please login first"
        };
        res.send(message);
    } else if (req.body.id != null) {
        shoppingcart.addToCart(req.session.email, req.body, function (result) {
            console.log(result);
            res.send(result);
        });
    }
});

module.exports = router;
