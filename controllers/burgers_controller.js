var express = require("express");
var router = express.Router();

// Import the model
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  res.redirect("/home");
});

router.get("/home", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
  });
});

router.post("/burger/create", function(req, res) {
  burger.create(req.body.burger_name, function() {
  res.redirect("/home");
    });
});

router.post("/burger/eat/:id", function(req, res) {
  burger.update(req.params.id, function() {
    res.redirect("/home");
  });
});

router.delete('/api/delete/:id', function (req, res) {
  // console.log(req.params.id)
  burger.delete(req.params.id, function () {
    res.redirect("/home");
  })
});
// burger.delete("burgers", req.params.id, function (data) {
// Export routes for server.js to use.
module.exports = router;
