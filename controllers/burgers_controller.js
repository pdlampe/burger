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
    goBurger.selectBurgers().then((err, result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send({ error: err });
    });
});

routes.post("/api/burger", (req, res) => {
    if (!req.body.name) {
        res.status(500).send({ error: "Burger name is required" });
    }
    var newBurger = new goBurger(req.body.name);
    goBurger.create(newBurger).then(id => {
        res.json(id);
    }).catch((err) => {
        res.status(500).send({ error: err });
    });
});

routes.put("/api/burger/:id", (req, res) => {
    goBurger.updateDevoured(req.params.id).then(result => {
        res.json(result);
    }).catch((err) => {
        res.status(500).send({ error: err });
    });
});


module.exports = routes;