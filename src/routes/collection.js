const express = require("express");
const router = express.Router();

const collectionController = require("../controllers/collectionController");

router.get("/getCollection/:idCompany", function (req, res) {
  collectionController.getCollection(req, res);
});

router.get("/getSpecificCollection/:idCollection", function (req, res) {
  collectionController.getSpecificCollection(req, res);
});

router.get("/showCollection/:idCompany", function (req, res) {
  collectionController.getCollection(req, res);
});

router.post("/addCollection", function (req, res) {
  collectionController.addCollection(req, res);
});
router.post("/addCollectionAccess", function (req, res) {
  collectionController.addCollectionAccess(req, res);
});

router.put("/editMachineCollections/:idCollection", function (req, res) {
  collectionController.editMachineCollections(req, res);
});

router.put("/editCollection/:idCollection", function (req, res) {
  collectionController.editCollection(req, res);
});

router.delete("/removeFromOperationLog/:fkCollection", function (req, res) {
  collectionController.removeFromOperationLog(req, res);
});

router.delete("/deleteCollection/:idCollection", function (req, res) {
  collectionController.deleteCollection(req, res);
});


module.exports = router;
