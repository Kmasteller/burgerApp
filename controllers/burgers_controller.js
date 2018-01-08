var express = require("express");
var router = express.Router();

// Import the model
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  res.redirect("/home");
});

router.get("/home", function (req, res) {
  burger.all(function (data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/burgers/create", function (req, res) {
  burger.create(req.body.burger_name, function() {
  res.redirect("/home");
    });
});

router.post("/burgers/eat/:id", function (req, res) {
  var condition = "id = " + req.params.id;
  console.log("condition");
  burger.update(req.params.id, function() {
    res.redirect("/home");
  });
});

// router.delete('/api/burgers/:id', function (req, res, next) {
//   console.log("ive been hit!")

//   console.log(req.params.id)
//   burger.delete("burgers", req.params.id, function (data) {
//     res.json(data)
//   })
// })

// Export routes for server.js to use.
module.exports = router;
