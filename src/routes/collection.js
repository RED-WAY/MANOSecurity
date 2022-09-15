var express = require("express");
var router = express.Router();

var collectionController = require("../controllers/collectionController");



router.get("/getCollection/:idCompany", function (req, res) {
    collectionController.getCollection(req, res);
});


module.exports = router;