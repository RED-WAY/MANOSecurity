var express = require("express");
var router = express.Router();

var machineController = require("../controllers/machineController");


router.post("/addMachine", function (req, res) {
    machineController.addMachine(req, res);
});

router.post("/showMachine", function (req, res) {
    machineController.showMachine(req, res);
});


module.exports = router;