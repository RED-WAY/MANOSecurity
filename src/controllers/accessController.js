const accessModel = require("../models/accessModel");

function checkAccessGlobaly(req, res) {
  const operationNameController = req.params.name;
  const operationPathController = req.params.process;
  const operationTypeController = req.params.type;

  if (operationNameController == undefined) {
    res.status(400).send("operationNameController is undefined!");
  } else if (operationPathController == undefined) {
    res.status(400).send("operationPathController is undefined!");
  } else if (operationTypeController == undefined) {
    res.status(400).send("operationTypeController is undefined");
  } else {
    accessModel
      .checkAccessGlobaly(
        operationNameController,
        operationPathController,
        operationTypeController
      )
      .then(function (result) {
        res.json(result);
        console.log("on accessController");
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

function addAccessGlobal(req, res) {
  const operationNameController = req.body.nameServer;
  const operationPathController = req.body.processServer;
  const operationTypeController = req.body.typeServer;

  if (operationNameController == undefined) {
    res.status(400).send("operationNameController is undefined!");
  } else if (operationPathController == undefined) {
    res.status(400).send("operationPathController is undefined!");
  } else if (operationTypeController == undefined) {
    res.status(400).send("operationTypeController is undefined");
  } else {
    accessModel
      .addAccessGlobal(operationNameController, operationPathController, operationTypeController)
      .then(function (result) {
        res.json(result);
        console.log("on accessController");
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

function addAccessCompany(req, res) {
  const operationIdController = req.body.operationIdServer;
  const fkCompanyController = req.body.companyServer;

  if (operationIdController == undefined) {
    res.status(400).send("operationIdController is undefined!");
  } else if (fkCompanyController == undefined) {
    res.status(400).send("fkCompanyController is undefined!");
  } else {
    accessModel
      .addAccessCompany(operationIdController, fkCompanyController)
      .then(function (result) {
        res.json(result);
        console.log("on accessController");
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

function showAccess(req, res) {
  const fkCompanyController = req.params.idCompany;

  if (fkCompanyController == undefined) {
    console.log("fkCompanyController is undefined!");
    return false;
  } else {
    accessModel
      .showAccess(fkCompanyController)
      .then(function (result) {
        res.json(result);
        console.log("on accessController");
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

function deleteAccessCompany(req, res) {
  const fkCompanyController = req.params.fkCompany;
  const fkAccessController = req.params.fkAccess;

  accessModel
    .deleteAccessCompany(fkCompanyController, fkAccessController)
    .then(function (result) {
      res.json(result);
      console.log("on accessController");
    })
    .catch(function (error) {
      console.log(error);
      console.log("Delete company access has been failed: ", error.sqlMessage);
      res.status(500).json(error.sqlMessage);
    });
}

function deleteAccessFamily(req, res) {
  const fkCompanyController = req.params.fkCompany;
  const fkAccessController = req.params.fkAccess;

  accessModel
    .deleteAccessFamily(fkCompanyController, fkAccessController)
    .then(function (result) {
      res.json(result);
      console.log("on accessController");
    })
    .catch(function (error) {
      console.log(error);
      console.log("Delete family access has been failed: ", error.sqlMessage);
      res.status(500).json(error.sqlMessage);
    });
}

function verifyGlobalAccessUsing(req, res) {
  const idAccessController = req.params.idAccess;

  if (idAccessController == undefined) {
    console.log("idAccessController is undefined!");
    return false;
  } else {
    accessModel
      .verifyGlobalAccessUsing(idAccessController)
      .then(function (result) {
        res.json(result);
        console.log("on accessController");
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

function deleteAccessGlobal(req, res) {
  const idAccessController = req.params.idAccess;

  accessModel
    .deleteAccessGlobal(idAccessController)
    .then(function (result) {
      res.json(result);
      console.log("on accessController");
    })
    .catch(function (error) {
      console.log(error);
      console.log("Delete global access has been failed: ", error.sqlMessage);
      res.status(500).json(error.sqlMessage);
    });
}

module.exports = {
  checkAccessGlobaly,
  addAccessGlobal,
  addAccessCompany,
  showAccess,
  deleteAccessCompany,
  deleteAccessFamily,
  verifyGlobalAccessUsing,
  deleteAccessGlobal,
};
