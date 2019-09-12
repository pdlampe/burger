var routes = require("express").Router();
var goBurger = require("../models/burger");

routes.get("/", function (req, res) {
    goBurger.selectBurgers().then(result => {
        var devoured = result.filter(b => b.devoured === 1);
        var undevoured = result.filter(b => b.devoured === 0);
        res.render("index", {
            undevouredList: undevoured,
            devouredList: devoured
        });
    }).catch((err) => {
        res.status(500).send({ error: err });
    });
});

routes.get("/api/burger", (req, res) => {
    Burger.selectBurgers().then((err, result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send({ error: err });
    });
});