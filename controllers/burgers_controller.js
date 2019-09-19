var express = require("express");
var goBurger = require("../models/burger");
var router = express.Router();

router.get("/", function (req, res) {
    goBurger.selectAll("burgers", function (data) {
        var burgerData = {
            burgers: data
        };
        console.log(burgerData);
        res.render("index", burgerData);
    });
});

router.post("/api/burgers", function (req, res) {
    console.log(req.body.burger);
    goBurger.create(["burger_name", "devoured"], [req.body.burger, false], function (err, result) {
        if (err) {
            console.log(err)
        }
        console.log("hitting post route")
        res.redirect("/");
    });
});

router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
    console.log(req.params.id);
    goBurger.updateInfo({ devoured: req.body.devoured }, condition, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});
module.exports = router;