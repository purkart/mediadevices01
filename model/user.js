/**
 * Created by Julian Purkart, Thomas Schoenegger on 17-Jan-16.
 */

var mysql = require('./../controller/db');
var nodemailer = require('nodemailer');

function add(userData, callback) {

    var responseMessages = {
        messageOk: {
            status: 'OK',
            message: 'Nice to meet you ' + userData.first_name,
            verification_link: 'localhost:3000/verify_email?token=' + userData.authToken
        },
        messageUnique: {
            status: 'NOK',
            message: 'You are registered already, pleas log in'
        },
        messageConnection: {
            status: 'NOK',
            message: 'Sorry, there seems to be a problem with our database. Please try again later'
        },
        messageDefault: {
            status: 'NOK',
            message: "Sorry, it doesn't work and i have no idea why..."
        }
    };

    mysql.insertSingleTable(userData, 'customer', responseMessages, callback);

}
module.exports.add = add;

function verify(userData, callback) {
    var stmt;
    if (userData.token != null) {
        stmt = "update customer set isAuthenticated = 1 where authToken = '" + userData.token + "'";

        var responseMessages = {
            messageOk: {
                status: 'OK',
                message: 'You have been authenticated'
            },
            messageNotFound: {
                status: 'NOK',
                message: 'User not found'
            },
            messageConnection: {
                status: 'NOK',
                message: 'Sorry, there seems to be a problem with our database. Please try again later'
            },
            messageDefault: {
                status: 'NOK',
                message: "Sorry, it doesn't work and i have no idea why..."
            }
        };

        mysql.update(stmt, responseMessages, callback);
    }
}
module.exports.verify = verify;

function get(userData, callback) {

    var stmt;
    if (userData.token == null || userData.token == undefined) {
        stmt = "select * from customer where email = '" + userData.email + "' and pwd = '" + userData.pwd + "'";
    } else {
        stmt = "select * from customer where authToken = '" + userData.token + "'";
    }

    console.log(stmt);

    var responseMessages = {
        messageOk: {
            status: 'OK',
            message: 'Hello again!'
        },
        messageNotFound: {
            status: 'NOK',
            message: 'email or password are wrong'
        },
        messageConnection: {
            status: 'NOK',
            message: 'Sorry, there seems to be a problem with our database. Please try again later'
        },
        messageDefault: {
            status: 'NOK',
            message: "Sorry, it doesn't work and i have no idea why..."
        }
    };

    mysql.readData(stmt, responseMessages, callback);

}
module.exports.get = get;

function createShoppingCart(userData, callback) {

    data = {
        email: req.body.params.email
    };

    mysql.insertSingleTable(userData, 'shopping_cart', responseMessages, callback);

}