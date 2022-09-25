var acessModel = require("../models/acessModel");

function checkAccessGlobaly(req, res) {
  const type = req.params.type;
  const name = req.params.name;
  const process = req.params.process;
  
  if (type == undefined) {
    res.status(400).send("accessType is undefined!");
  } else if (name == undefined) {
    res.status(400).send("accessName is undefined!");
  } else if (process == undefined) {
    res.status(400).send("process is undefined");
  } else {
    acessModel
      .checkAccessGlobaly(type, name, process)
      .then(function (result) {
          res.json(result);
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
  const type = req.body.typeServer;
  const name = req.body.nameServer;
  const process = req.body.processServer;

  if (type == undefined) {
    res.status(400).send("accessType is undefined!");
  } else if (name == undefined) {
    res.status(400).send("accessName is undefined!");
  } else if (process == undefined) {
    res.status(400).send("process is undefined");
  } else {
    acessModel
      .addAccessGlobal(type, name, process)
      .then(function (result) {
        res.json(result);
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
  var operationId = req.body.operationIdServer;
  var company = req.body.companyServer;

  if (operationId == undefined) {
    res.status(400).send("operationId is undefined!");
  } else if (company == undefined) {
    res.status(400).send("company is undefined!");
  } else {
    acessModel
      .addAccessCompany(operationId, company)
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

function showAcess(req, res) {
  const company = req.params.idCompany;

  if (company == undefined) {
    console.log("company undefined on showCollection");
    return false;
  } else {
    acessModel
      .showAcess(company)
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

function deleteAcess(req, res) {
  const acess = req.params.idAcess;

  acessModel
    .deleteAcess(acess)
    .then(function (result) {
      res.json(result);
    })
    .catch(function (error) {
      console.log(error);
      console.log("Delete machine has been failed: ", error.sqlMessage);
      res.status(500).json(error.sqlMessage);
    });
}

module.exports = {
  checkAccessGlobaly,
  addAccessGlobal,
  addAccessCompany,
  showAcess,
  deleteAcess,
};
