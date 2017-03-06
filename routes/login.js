var express = require('express');
var router = express.Router();
var session = require('express-session');

var user = require('../model/user');

router.post('/login', function (req, res) {
    // Prepare output in JSON format
    var data = {
        email: req.body.params.email,
        pwd: req.body.params.pwd

        // remember:req.body.remember
    };

    console.log(data);

    user.get(data, function (result) {

        // Log message object
        console.log(result);

        if (result.status == 'OK') {

            console.log('logged in successfull -> set session');

            //console.dir(req.session)
            sess=req.session;
            sess.email=data.email;

            console.dir(req.session);

        }


        res.send(result);

    });

});

module.exports = router;