var express = require("express");
var router = express.Router();

var acessController = require("../controllers/acessController");


router.get("/checkAccessGlobaly/:type/:name/:process", function (req, res) {
    acessController.checkAccessGlobaly(req, res);
});

router.post("/addAccessGlobal", function (req, res) {
    acessController.addAccessGlobal(req, res);
});

router.post("/addAccessCompany", function (req, res) {
    acessController.addAccessCompany(req, res);
});

router.get("/showAcess/:idCompany", function (req, res) {
    acessController.showAcess(req, res);
});

router.delete("/deleteAcess/:idAcess", function (req, res) {
    acessController.deleteAcess(req, res);
});

module.exports = router;
