const express = require("express");
const router = express.Router();

const controllerFilename = require("../controllers/controllerFile");

router.get("/list", function (req, res) {
  controler.listController(req, res);
});

router.get("/listById/:idParam", function (req, res) {
  controller.listByIdController(req, res);
});

router.post("/signup", function (req, res) {
  controler.signupController(req, res);
});

router.post("/login", function (req, res) {
  controler.loginController(req, res);
});

router.post("/publish/:idParam", function (req, res) {
  controller.publishController(req, res);
});

router.put("/edit/:idParam", function (req, res) {
  controller.editController(req, res);
});

router.delete("/remove/:idParam", function (req, res) {
  controller.removeController(req, res);
});

router.get("/latest/:idParam", function (req, res) {
  controller.latestController(req, res);
});

router.get("/realTime/:idParam", function (req, res) {
  controller.realTimeController(req, res);
});
