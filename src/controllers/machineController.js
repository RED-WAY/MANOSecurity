const machineModel = require("../models/machineModel");

function addMachine(req, res) {
  const machineNameController = req.body.machineNameServer;
  const fkConsumerController = req.body.fkConsumerServer;
  const fkCompanyController = req.body.fkCompanyServer;
  const fkFamilyController = req.body.fkFamilyServer;

  if (machineNameController == undefined) {
    res.status(400).send("machineNameController is undefined!");
  } else if (fkConsumerController == undefined) {
    res.status(400).send("fkConsumerController is undefined!");
  } else if (fkCompanyController == undefined) {
    res.status(400).send("fkCompanyController is undefined!");
  } else if (fkFamilyController == undefined) {
    res.status(400).send("fkFamilyController is undefined!");
  } else {
    machineModel
      .addMachine(
        machineNameController,
        fkConsumerController,
        fkCompanyController,
        fkFamilyController
      )
      .then(function (result) {
        res.json(result);
        console.log("on machineController");
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

function showMachines(req, res) {
  const fkCompanyController = req.body.companyServer;

  if (fkCompanyController == undefined) {
    console.log("fkCompanyController undefined");
    return false;
  } else {
    machineModel
      .showMachines(fkCompanyController)
      .then(function (result) {
        res.json(result);
        console.log("on machineController");
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

function deleteMachine(req, res) {
  const idMachineController = req.params.idMachine;

  machineModel
    .deleteMachine(idMachineController)
    .then(function (result) {
      res.json(result);
    })
    .catch(function (error) {
      console.log(error);
      console.log("Delete machine has been failed: ", error.sqlMessage);
      res.status(500).json(error.sqlMessage);
    });
}

function editMachine(req, res) {
  const idMachineController = req.params.idMachine;
  const machineNameController = req.body.machineNameServer;
  const fkFamilyController = req.body.fkFamilyServer;

  if (idMachineController == undefined) {
    console.log("idMachineController is undefined!");
    return false;
  } else if (
    machineNameController == undefined ||
    machineNameController == ""
  ) {
    console.log("machineNameController is undefined!");
    return false;
  } else if (fkFamilyController == undefined || fkFamilyController == "") {
    console.log("fkFamilyController is undefined!");
    return false;
  } else {
    machineModel
      .editMachine(
        idMachineController,
        machineNameController,
        fkFamilyController
      )
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
  addMachine,
  showMachines,
  deleteMachine,
  editMachine,
};
