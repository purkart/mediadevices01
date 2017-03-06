var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'shop',
    password: 'shop',
    database: 'shop'
});

function arrayToCSList(arr) {
    str = ''
    arr.forEach(function (col, i) {
        if (i < arr.length - 1) {
            str += col + ', ';
        } else {
            str += col;
        }
    });

    return str;
}

function returnKeyAndValueCSLists(obj) {
    var keyArr = [], valArr = [];
    console.info(obj);
    for (key in obj) {
        keyArr.push(key);
    }

    for (k in obj) {
        valArr.push("'" + obj[k] + "'");
    }

    return {keys: arrayToCSList(keyArr), value: arrayToCSList(valArr)};
}

function insertSingleTable(dataObj, table, responseMessages, callback) {

    if (dataObj === undefined || dataObj === null || table === undefined || table === null) {
        return false;
    }

    var inData = returnKeyAndValueCSLists(dataObj);

    stmt = "INSERT INTO " + table + '(' + inData.keys + ') VALUES (' + inData.value + ')';

    connection.query(stmt, function (err, rows, fields) {
        if (err) {
            switch (err.code) {
                case 'ER_DUP_ENTRY':
                    callback(responseMessages.messageUnique);
                    break;
                case 'ECONNREFUSED':
                    callback(responseMessages.messageConnection);
                    break;
                default:
                    callback(responseMessages.messageDefault);
            }
            console.log(err);

        } else {
            callback(responseMessages.messageOk);
        }
    });
}
module.exports.insertSingleTable = insertSingleTable;

function updateSingleTable(dataObj, table, responseMessages, callback) {

    if (dataObj === undefined || dataObj === null || table === undefined || table === null) {
        return false;
    }

    var inData = returnKeyAndValueCSLists(dataObj);

    stmt = "UPDATE "+ table + '(' + inData.keys + ') VALUES (' + inData.value + ')';

    connection.query(stmt, function (err, rows, fields) {
        if (err) {
            switch (err.code) {
                case 'ER_DUP_ENTRY':
                    callback(responseMessages.messageUnique);
                    break;
                case 'ECONNREFUSED':
                    callback(responseMessages.messageConnection);
                    break;
                default:
                    callback(responseMessages.messageDefault);
            }
            console.log(err);

        } else {
            callback(responseMessages.messageOk);
        }
    });
}
module.exports.updateSingleTable = updateSingleTable;

function readData(stmt, responseMessages, callback) {

    if (stmt === undefined || stmt === null || !stmt.toLowerCase().startsWith("select")) {
        return false;
    }

    connection.query(stmt, function (err, rows, fields) {
        if (err) {
            console.log(err);

            switch (err.code) {
                case 'ECONNREFUSED':
                    callback(responseMessages.messageConnection);
                    break;
                default:
                    callback(responseMessages.messageDefault);
            }
        } else {
            if (rows.length === 0) {
                callback(responseMessages.messageNotFound);
            } else {
                responseMessages.messageOk.data = rows;
                callback(responseMessages.messageOk);
            }
        }
    });
}
module.exports.readData = readData;

function update(stmt, responseMessages, callback) {

    if (stmt === undefined || stmt === null) {
        return false;
    }

    connection.query(stmt, function (err, rows, fields) {
        if (err) {
            console.log(err);

            switch (err.code) {
                case 'ECONNREFUSED':
                    callback(responseMessages.messageConnection);
                    break;
                default:
                    callback(responseMessages.messageDefault);
            }
        } else {
            if (rows.length === 0) {
                callback(responseMessages.messageNotFound);
            } else {
                callback(responseMessages.messageOk);
            }

        }
    });
}
module.exports.update = update;