const express = require("express");
const router = express.Router();

const dashController = require("../controllers/dashController");


router.get("/getMachineConstantHardware/:idMachine", function (req, res) {
    dashController.getMachineConstantHardware(req, res);
});


module.exports = router;