const collectionModel = require("../models/collectionModel");

function getFamily(req, res) {
  const fkCompanyController = req.params.fkCompany;

  if (fkCompanyController == undefined) {
    console.log("fkCompanyController undefined on getFamily");
    return false;
  } else {
    collectionModel
      .getFamily(fkCompanyController)
      .then(function (result) {
        res.json(result);
        console.log("on collectionController");
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

function getSpecificCollection(req, res) {
  const idCollection = req.params.idCollection;

  if (idCollection == undefined) {
    console.log("idCollection is undefined");
    return false;
  } else {
    collectionModel
      .getSpecificCollection(idCollection)
      .then(function (result) {
        res.json(result);
        console.log("on collectionController");
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

function showCollections(req, res) {
  const company = req.params.idCompany;

  if (company == undefined) {
    console.log("company undefined on showCollections");
    return false;
  } else {
    collectionModel
      .showCollections(company)
      .then(function (result) {
        res.json(result);
        console.log("on collectionController");
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
  const collectionLevel = req.body.collectionLevelServer;
  const collectionName = req.body.collectionNameServer;
  const company = req.body.companyServer;

  if (collectionLevel == undefined) {
    res.status(400).send("collectionLevel is undefined!");
  } else if (collectionName == undefined) {
    res.status(400).send("collectionName is undefined!");
  } else {
    collectionModel
      .addCollection(collectionLevel, collectionName, company)
      .then(function (result) {
        res.json(result);
        console.log("on collectionController");
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
  const accessArray = req.body.accessArrayServer;
  const fkCollection = req.body.fkCollectionServer;

  if (accessArray == undefined) {
    res.status(400).send("collectionLevel is undefined!");
  } else if (fkCollection == undefined) {
    res.status(400).send("collectionName is undefined!");
  } else {
    collectionModel
      .addCollectionAccess(accessArray, fkCollection)
      .then(function (result) {
        res.json(result);
        console.log("on collectionController");
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

function editCollection(req, res) {
  const idCollection = req.params.idCollection;
  const collectionLevel = req.body.collectionLevelServer;
  const collectionName = req.body.collectionNameServer;

  if (idCollection == undefined) {
    console.log("idCollection is undefined!");
    return false;
  } else if (collectionLevel == undefined) {
    console.log("collectionLevel is undefined!");
    return false;
  } else if (collectionName == undefined) {
    console.log("collectionName is undefined!");
    return false;
  } else {
    collectionModel
      .editCollection(idCollection, collectionLevel, collectionName)
      .then(function (result) {
        res.json(result);
        console.log("on collectionController");
      })
      .catch(function (error) {
        console.log(error);
        console.log("edit collection has been failed: ", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
      });
  }
}

function editMachineCollections(req, res) {
  const idCollection = req.body.idCollectionServer;

  if (idCollection == undefined) {
    return false;
  } else {
    collectionModel
      .editMachineCollections(idCollection)
      .then(function (result) {
        res.json(result);
        console.log("on collectionController");
      })
      .catch(function (error) {
        console.log(error);
        console.log(
          "edit machine collections has been failed: ",
          error.sqlMessage
        );
        res.status(500).json(error.sqlMessage);
      });
  }
}

function removeFromOperationLog(req, res) {
  const fkCollection = req.params.fkCollection;

  collectionModel
    .removeFromOperationLog(fkCollection)
    .then(function (result) {
      res.json(result);
      console.log("on collectionController");
    })
    .catch(function (error) {
      console.log(error);
      console.log(
        "Delete collection from operation log has been failed: ",
        error.sqlMessage
      );
      res.status(500).json(error.sqlMessage);
    });
}

function deleteCollection(req, res) {
  const idCollection = req.params.idCollection;

  collectionModel
    .deleteCollection(idCollection)
    .then(function (result) {
      res.json(result);
      console.log("on collectionController");
    })
    .catch(function (error) {
      console.log(error);
      console.log("Delete collection has been failed: ", error.sqlMessage);
      res.status(500).json(error.sqlMessage);
    });
}

module.exports = {
  getFamily,
  getSpecificCollection,
  showCollections,
  addCollection,
  addCollectionAccess,
  editCollection,
  editMachineCollections,
  removeFromOperationLog,
  deleteCollection,
};
