var orm = require("../config/orm.js");

var burger = {
    selectAll: function (table, cb) {
        orm.selectAll("burgers", function (res) {
            cb(res);
        });
    },
    insertInfo: function (colName, valOfCol, cb) {
        orm.insertInfo("burgers", colName, valOfCol, function (res) {
            cb(res);
        });
    },
    updateInfo: function (valOfCol, condition, cb) {
        orm.updateInfo("burgers", valOfCol, condition, function (res) {
            cb(res);
        });
    }
};

module.exports = burger;