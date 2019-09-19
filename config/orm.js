var connection = require("../config/connection.js");

function questionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

function sendObjectToSql(ob) {
    var arr = [];
    for (var key in ob) {
        var value = ob[key];
        if (Object.uniqueProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}
var orm = {
    selectAll: function (table, cb) {
        var stringQuery = "SELECT * FROM ??";
        console.log(stringQuery);
        connection.query(stringQuery, [table], function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    create: function (table, cols, vals, cb) {
        var stringQuery = "INSERT INTO " + table;

        stringQuery += " (";
        stringQuery += cols.toString();
        stringQuery += ") ";
        stringQuery += "VALUES (";
        stringQuery += questionMarks(vals.length);
        stringQuery += ") ";

        console.log(stringQuery);

        connection.query(stringQuery, vals, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    updateInfo: function (table, objColVals, condition, cb) {
        var stringQuery = "UPDATE " + table;

        stringQuery += " SET ";
        stringQuery += sendObjectToSql(objColVals);
        stringQuery += " WHERE ";
        stringQuery += condition;

        console.log(stringQuery);
        connection.query(stringQuery, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
}

module.exports = orm;