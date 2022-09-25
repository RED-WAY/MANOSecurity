var express = require("express");
var router = express.Router();

var accessController = require("../controllers/accessController");


router.get("/checkAccessGlobaly/:type/:name/:process", function (req, res) {
    accessController.checkAccessGlobaly(req, res);
});

router.post("/addAccessGlobal", function (req, res) {
    accessController.addAccessGlobal(req, res);
});

router.post("/addAccessCompany", function (req, res) {
    accessController.addAccessCompany(req, res);
});

router.get("/showAccess/:idCompany", function (req, res) {
    accessController.showAccess(req, res);
});

router.delete("/deleteAccess/:idAccess", function (req, res) {
    accessController.deleteAccess(req, res);
});

module.exports = router;
