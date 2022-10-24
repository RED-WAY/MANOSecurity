const express = require("express");
const router = express.Router();

const dashController = require("../controllers/dashController");

router.get("/showKilledProcesses/:fkCompany/:idMachine", function (req, res) {
  dashController.showKilledProcesses(req, res);
});

router.get("/getMachineConstantHardware/:idMachine", function (req, res) {
  dashController.getMachineConstantHardware(req, res);
});

router.get("/getStartupData/:column/:fkMachine/:qttData", function (req, res) {
  dashController.getStartupData(req, res);
});

router.get("/getCurrentData/:column/:fkMachine", function (req, res) {
  dashController.getCurrentData(req, res);
});

module.exports = router;
