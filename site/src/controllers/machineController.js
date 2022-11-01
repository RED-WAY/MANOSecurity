const machineModel = require("../models/machineModel");

function addMachine(req, res) {
  const machineNameController = req.body.machineNameServer;
  const machineClassroomController = req.body.machineClassroomServer;
  const fkConsumerController = req.body.fkConsumerServer;
  const fkCompanyController = req.body.fkCompanyServer;
  const fkFamilyController = req.body.fkFamilyServer;

  if (machineNameController == undefined) {
    res.status(400).send("machineNameController is undefined!");
  } else if (machineClassroomController == undefined) {
    res.status(400).send("machineClassroomController is undefined!");
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
        machineClassroomController,
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
  const fkCompanyController = req.body.fkCompanyServer;

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

function getMachinesData(req, res) {
  const fkCompanyController = req.params.fkCompany;

  if (fkCompanyController == undefined) {
    console.log("fkCompanyController undefined");
    return false;
  } else {
    machineModel
      .getMachinesData(fkCompanyController)
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
  const fkMachineController = req.params.idMachine;

  machineModel
    .deleteMachineHardware("operationKilled", fkMachineController)
    .then(function (result) {
      machineModel
        .deleteMachineHardware("dynamicHardware", fkMachineController)
        .then(function (result) {
          machineModel
            .deleteMachineHardware("constantHardware", fkMachineController)
            .then((_) => {
              machineModel.deleteMachine(fkMachineController).then((result) => {
                res.json(result);
              });
            });
        });
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
  const machineClassroomController = req.body.machineClassroomServer;
  const fkFamilyController = req.body.fkFamilyServer;

  if (idMachineController == undefined) {
    console.log("idMachineController is undefined!");
    return false;
  } else if (machineNameController == undefined) {
    console.log("machineNameController is undefined!");
    return false;
  } else if (machineClassroomController == undefined) {
    console.log("machineClassroomController is undefined!");
    return false;
  } else if (fkFamilyController == undefined) {
    console.log("fkFamilyController is undefined!");
    return false;
  } else {
    machineModel
      .editMachine(
        idMachineController,
        machineNameController,
        machineClassroomController,
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
  getMachinesData,
  deleteMachine,
  editMachine,
};
