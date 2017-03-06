/**
 * Created by Julian Purkart, Thomas Schoenegger on 01-Mar-16.
 */

var mysql = require('./../controller/db');

function get(callback) {

    var stmt = "select * from item";

    console.log(stmt);

    var responseMessages = {
        messageOk : {
            status: 'OK',
            message: 'Data loaded'
        },
        messageNotFound : {
            status: 'NOK',
            message: 'Your Shooping Cart is empty'
        },
        messageConnection : {
            status: 'NOK',
            message: 'Sorry, there seems to be a problem with our database. Please try again later'
        },
        messageDefault : {
            status: 'NOK',
            message: "Sorry, it doesn't work and i have no idea why..."
        }
    };

    mysql.readData(stmt, responseMessages, callback);

}
module.exports.get = get;