/**
 * Created by Julian Purkart, Thomas Schoenegger on 17-Jan-16.
 */

var mysql = require('./../controller/db');

function get(userId, callback) {

    var stmt = "select * from shopping_card_item, item where shopping_card_item.item_id = item.id and shopping_card_id = '" + userId + "'";

    console.log(stmt);

    var responseMessages = {
        messageOk: {
            status: 'OK',
            message: 'Data loaded'
        },
        messageNotFound: {
            status: 'NOK',
            message: 'Your Shooping Cart is empty'
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

function addToCart(userId, item, callback) {

    console.log("Try to add this item to " + userId + "'s shopping cart: ");
    console.log(item);

    var stmt = "INSERT INTO shopping_card_item (shopping_card_id, item_id, qty) " +
        "VALUES ('" + userId + "', " + item.id + ", " + 1 + ") " +
        "ON DUPLICATE KEY UPDATE qty = qty+1";

    console.log(stmt);

    var responseMessages = {
        messageOk: {
            status: 'OK',
            message: 'Shopping Cart updated'
        },
        messageNotFound: {
            status: 'NOK',
            message: 'Your Shooping Cart is empty'
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
module.exports.addToCart = addToCart;

function updateItemQty(userId, item_id, qty, callback) {
    var stmt = "";

    if (qty == 0) {
        stmt = "delete from shopping_card_item where shopping_card_id = '" + userId + "' and item_id = '" + item_id + "'";
    } else {
        stmt = "update shopping_card_item set qty = " + qty + " where shopping_card_id = '" + userId + "' and item_id = '" + item_id + "'";
    }

    console.log(stmt);

    var responseMessages = {
        messageOk: {
            status: 'OK',
            message: 'Shopping Cart updated'
        },
        messageNotFound: {
            status: 'NOK',
            message: 'Your Shooping Cart is empty'
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
module.exports.updateItemQty = updateItemQty;