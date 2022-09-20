var express = require("express");
var router = express.Router();

var collectionController = require("../controllers/collectionController");

router.get("/getCollection/:idCompany", function (req, res) {
  collectionController.getCollection(req, res);
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

router.put("/editCollection/:idCollection", function (req, res) {
  collectionController.editCollection(req, res);
});
router.delete("/deleteCollection/:idCollection", function (req, res) {
  collectionController.deleteCollection(req, res);
});

module.exports = router;
