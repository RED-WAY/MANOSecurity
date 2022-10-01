const express = require("express");
const router = express.Router();

const familyController = require("../controllers/familyController");

router.get("/getFamily/:fkCompany", function (req, res) {
  familyController.getFamily(req, res);
});

router.get("/getSpecificFamily/:idFamily", function (req, res) {
  familyController.getSpecificFamily(req, res);
});

router.get("/showFamilies/:fkCompany", function (req, res) {
  familyController.showFamilies(req, res);
});

router.post("/addFamily", function (req, res) {
  familyController.addFamily(req, res);
});
router.post("/addFamilyAccess", function (req, res) {
  familyController.addFamilyAccess(req, res);
});

router.put("/editMachineFamilies", function (req, res) {
  familyController.editMachineFamilies(req, res);
});

router.put("/editFamily/:idFamily", function (req, res) {
  familyController.editFamily(req, res);
});

router.delete("/removeFromFamilyOperations/:fkFamily", function (req, res) {
  familyController.removeFromFamilyOperations(req, res);
});

router.delete("/deleteFamily/:idFamily", function (req, res) {
  familyController.deleteFamily(req, res);
});

module.exports = router;
