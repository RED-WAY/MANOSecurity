const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/list", function (req, res) {
  userController.list(req, res);
});

router.post("/logIn", function (req, res) {
  userController.logIn(req, res);
});

router.get("/showConsumers/:fkCompany/:idConsumer", function (req, res) {
  userController.showConsumers(req, res);
});

router.post("/addUser/:fkCompany", function (req, res) {
  userController.addConsumer(req, res);
});

router.put("/editConsumer/:idConsumer", function (req, res) {
  userController.editConsumer(req, res);
});

router.delete("/deleteConsumer/:idConsumer", function (req, res) {
  userController.deleteConsumer(req, res);
});

module.exports = router;
