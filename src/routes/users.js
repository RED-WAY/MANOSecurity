var express = require("express");
var router = express.Router();

var userController = require("../controllers/userController");


router.get("/list", function (req, res) {
    userController.list(req, res);
});

router.post("/signUp", function (req, res) {
    userController.signUp(req, res);
});

router.post("/logIn", function (req, res) {
    userController.logIn(req, res);
});

router.get("/showUsers/:idCompany", function (req, res) {
    userController.showUsers(req, res);
});

router.post("/addUser/:idCompany", function (req, res) {
    userController.addUser(req, res);
});

module.exports = router;