var orm = require("../config/orm.js");

var burger = {
    selectAll: function (table, cb) {
        orm.selectAll("burgers", function (res) {
            cb(res);
        });
    },
    create: function (colName, valOfCol, cb) {
        orm.create("burgers", colName, valOfCol, function (res) {
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