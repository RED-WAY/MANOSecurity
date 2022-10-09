const familyModel = require("../models/familyModel");

function getFamily(req, res) {
  const fkCompanyController = req.params.fkCompany;

  if (fkCompanyController == undefined) {
    console.log("fkCompanyController undefined on getFamily");
    return false;
  } else {
    familyModel
      .getFamily(fkCompanyController)
      .then(function (result) {
        res.json(result);
        console.log("on familyController");
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

function getSpecificFamily(req, res) {
  const idFamilyController = req.params.idFamily;

  if (idFamilyController == undefined) {
    console.log("idFamilyController is undefined");
    return false;
  } else {
    familyModel
      .getSpecificFamily(idFamilyController)
      .then(function (result) {
        res.json(result);
        console.log("on familyController");
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

function showFamilies(req, res) {
  const fkCompanyController = req.params.fkCompany;

  if (fkCompanyController == undefined) {
    console.log("fkCompanyController undefined on showFamilies");
    return false;
  } else {
    familyModel
      .showFamilies(fkCompanyController)
      .then(function (result) {
        res.json(result);
        console.log("on familyController");
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

function addFamily(req, res) {
  const familyNameController = req.body.familyNameServer;
  const familyLevelController = req.body.familyLevelServer;
  const fkCompanyController = req.body.fkCompanyServer;

  if (familyNameController == undefined) {
    res.status(400).send("familyNameController is undefined!");
  } else if (familyLevelController == undefined) {
    res.status(400).send("familyLevelController is undefined!");
  } else if (fkCompanyController == undefined) {
    res.status(400).send("fkCompanyController is undefined!");
  } else {
    familyModel
      .addFamily(
        familyNameController,
        familyLevelController,
        fkCompanyController
      )
      .then(function (result) {
        res.json(result);
        console.log("on familyController");
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

function getFamilyId(req, res) {
  const familyNameController = req.params.familyName;
  const familyLevelController = req.params.familyLevel;
  const fkCompanyController = req.params.fkCompany;

  if (familyNameController == undefined) {
    console.log("familyNameController is undefined");
    return false;
  } else if (familyLevelController == undefined) {
    console.log("familyLevelController is undefined");
    return false;
  } else if (fkCompanyController == undefined) {
    console.log("fkCompanyController is undefined");
    return false;
  } else {
    familyModel
      .getFamilyId(
        familyNameController,
        familyLevelController,
        fkCompanyController
      )
      .then(function (result) {
        res.json(result);
        console.log("on familyController");
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

function addFamilyAccess(req, res) {
  const accessArrayController = req.body.accessArrayServer;
  const fkFamilyController = req.body.fkFamilyServer;

  if (accessArrayController == undefined) {
    res.status(400).send("accessArrayController is undefined!");
  } else if (fkFamilyController == undefined) {
    res.status(400).send("fkFamilyController is undefined!");
  } else {
    familyModel
      .addFamilyAccess(accessArrayController, fkFamilyController)
      .then(function (result) {
        res.json(result);
        console.log("on familyController");
      })
      .catch(function (error) {
        console.log(error);
        console.error(
          "\nThere was an error adding family access controller!\nERROR: ",
          error.sqlMessage
        );
        res.status(500).json(error.sqlMessage);
      });
  }
}

function editFamily(req, res) {
  const idFamilyController = req.params.idFamily;
  const familyNameController = req.body.familyNameServer;
  const familyLevelController = req.body.familyLevelServer;

  if (idFamilyController == undefined) {
    console.log("idFamilyController is undefined!");
    return false;
  } else if (familyNameController == undefined) {
    console.log("familyNameController is undefined!");
    return false;
  } else if (familyLevelController == undefined) {
    console.log("familyLevelController is undefined!");
    return false;
  } else {
    familyModel
      .editFamily(
        idFamilyController,
        familyNameController,
        familyLevelController
      )
      .then(function (result) {
        res.json(result);
        console.log("on familyController");
      })
      .catch(function (error) {
        console.log(error);
        console.log("edit family has been failed: ", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
      });
  }
}

function editMachineFamilies(req, res) {
  const fkFamilyController = req.body.fkFamilyServer;

  if (fkFamilyController == undefined) {
    console.log("fkFamilyController is undefined!");
    return false;
  } else {
    familyModel
      .editMachineFamilies(fkFamilyController)
      .then(function (result) {
        res.json(result);
        console.log("on familyController");
      })
      .catch(function (error) {
        console.log(error);
        console.log(
          "edit machine families has been failed: ",
          error.sqlMessage
        );
        res.status(500).json(error.sqlMessage);
      });
  }
}

function removeFromFamilyOperations(req, res) {
  const fkFamilyController = req.params.fkFamily;

  familyModel
    .removeFromFamilyOperations(fkFamilyController)
    .then(function (result) {
      res.json(result);
      console.log("on familyController");
    })
    .catch(function (error) {
      console.log(error);
      console.log(
        "Delete family from familyOperations has been failed: ",
        error.sqlMessage
      );
      res.status(500).json(error.sqlMessage);
    });
}

function deleteFamily(req, res) {
  const idFamilyController = req.params.idFamily;

  familyModel
    .deleteFamily(idFamilyController)
    .then(function (result) {
      res.json(result);
      console.log("on familyController");
    })
    .catch(function (error) {
      console.log(error);
      console.log("Delete family has been failed: ", error.sqlMessage);
      res.status(500).json(error.sqlMessage);
    });
}

module.exports = {
  getFamily,
  getSpecificFamily,
  showFamilies,
  addFamily,
  getFamilyId,
  addFamilyAccess,
  editFamily,
  editMachineFamilies,
  removeFromFamilyOperations,
  deleteFamily,
};
