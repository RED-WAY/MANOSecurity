var collectionModel = require("../models/collectionModel");

function showCollection(req, res) {
  const company = req.params.idCompany;

  if (company == undefined) {
    console.log("company undefined on showCollection");
    return false;
  } else {
    collectionModel
      .getCollection(company)
      .then(function (result) {
        res.json(result);
        console.log("estou aqui, collectionController");
      })
      .catch(function (error) {
        console.log(error);
        console.error(
          "\nThere was an error executing the query!\nERROR: ",
          error.sqlMessage
        );
        res.status(500).json(error.sqlMessage);
      });
  }
}

function getCollection(req, res) {
  const company = req.params.idCompany;

  if (company == undefined) {
    console.log("company undefined on getCollection");
    return false;
  } else {
    collectionModel
      .getCollection(company)
      .then(function (result) {
        res.json(result);
        console.log("estou aqui, machineController");
      })
      .catch(function (error) {
        console.log(error);
        console.error(
          "\nThere was an error executing the query!\nERROR: ",
          error.sqlMessage
        );
        res.status(500).json(error.sqlMessage);
      });
  }
}

function addCollection(req, res) {
  var collectionLevel = req.body.collectionLevelServer;
  var collectionName = req.body.collectionNameServer;
  var company = req.body.companyServer;

  if (collectionLevel == undefined) {
    res.status(400).send("collectionLevel is undefined!");
  } else if (collectionName == undefined) {
    res.status(400).send("collectionName is undefined!");
  } else {
    collectionModel
      .addCollection(collectionLevel, collectionName, company)
      .then(function (result) {
        res.json(result);
        console.log("estou aqui, collectionController");
      })
      .catch(function (error) {
        console.log(error);
        console.error(
          "\nThere was an error executing the query!\nERROR: ",
          error.sqlMessage
        );
        res.status(500).json(error.sqlMessage);
      });
  }
}

function addCollectionAccess(req, res) {
  var accessArray = req.body.accessArrayServer;
  var fkCollection = req.body.fkCollectionServer;

  if (accessArray == undefined) {
    res.status(400).send("collectionLevel is undefined!");
  } else if (fkCollection == undefined) {
    res.status(400).send("collectionName is undefined!");
  } else {
    collectionModel
      .addCollectionAccess(accessArray, fkCollection)
      .then(function (result) {
        res.json(result);
        console.log("AT addCollectionAccess CONTROLLER");
      })
      .catch(function (error) {
        console.log(error);
        console.error(
          "\nThere was an error adding collection access controller!\nERROR: ",
          error.sqlMessage
        );
        res.status(500).json(error.sqlMessage);
      });
  }
}

function deleteCollection(req, res) {
  const idCollection = req.params.idCollection;

  collectionModel
    .deleteCollection(idCollection)
    .then(function (result) {
      res.json(result);
    })
    .catch(function (error) {
      console.log(error);
      console.log("Delete machine has been failed: ", error.sqlMessage);
      res.status(500).json(error.sqlMessage);
    });
}

function editCollection(req, res) {
  const idCollection = req.params.idCollection;
  const newNameCollection = req.body.newNameServer;
  const newLevelCollection = req.body.newCollectionlevelServer;
  console.log(idCollection);
  console.log(newNameCollection);
  console.log(newLevelCollection);

  if (idCollection == undefined) {
    return false;
  } else if (newNameCollection == undefined) {
    return false;
  } else if (newLevelCollection == undefined) {
    return false;
  } else {
    collectionModel
      .editCollection(idCollection, newNameCollection, newLevelCollection)
      .then(function (result) {
        res.json(result);
      })
      .catch(function (error) {
        console.log(error);
        console.log("edit machine has been failed: ", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
      });
  }
}

module.exports = {
  getCollection,
  addCollection,
  addCollectionAccess,
  showCollection,
  editCollection,
  deleteCollection,
};
