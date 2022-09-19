var express = require("express");
var router = express.Router();

var acessController = require("../controllers/acessController");


router.post("/addAcess", function (req, res) {
    acessController.addAcess(req, res);
});

router.post("/addAcess2", function (req, res) {
    acessController.addAcess2(req, res);
});

router.get("/showAcess/:idCompany", function (req, res) {
    acessController.showAcess(req, res);
});

router.delete("/deleteAcess/:idAcess", function (req, res) {
    acessController.deleteAcess(req, res);
});

module.exports = router;
