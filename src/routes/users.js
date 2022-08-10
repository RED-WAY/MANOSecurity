const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/list", function (req, res) {
    userController.list(req, res);
});

router.post("/signup", function (req, res) {
    userController.signup(req, res);
})

router.post("/login", function (req, res) {
    userController.login(req, res);
});

module.exports = router;