const express = require("express");
const router = express.Router();

const machineController = require("../controllers/machineController");


router.post("/addMachine", function (req, res) {
    machineController.addMachine(req, res);
});

router.delete("/deleteMachine/:idMachine", function(req,res){
     machineController.deleteMachine(req,res);
}); 

router.put("/editMachine/:idMachine", function(req,res){
      machineController.editMachine(req,res);
});

router.post("/showMachine", function (req, res) {
    machineController.showMachine(req, res);
});



module.exports = router;