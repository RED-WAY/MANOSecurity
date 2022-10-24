const dashModel = require("../models/dashModel");

function showKilledProcesses(req, res) {
  const fkCompanyController = req.params.fkCompany;
  const idMachineController = req.params.idMachine;

  if (fkCompanyController == undefined) {
    console.log("fkCompanyController is undefined!");
    return false;
  } else if (idMachineController == undefined) {
    console.log("idMachineController is undefined!");
  } else {
    dashModel
      .showKilledProcesses(fkCompanyController, idMachineController)
      .then(function (result) {
        if (result.length > 0) {
          res.status(200).json(result);
        } else {
          res.status(204).send("No processes was killed!");
        }
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

function getMachineConstantHardware(req, res) {
  const idMachineController = req.params.idMachine;

  if (idMachineController == undefined) {
    console.log("idMachineController undefined");
    return false;
  } else {
    dashModel
      .getMachineConstantHardware(idMachineController)
      .then(function (result) {
        res.json(result);
        console.log("on dashController");
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

function getStartupData(req, res) {
  const columnController = req.params.column;
  const fkMachineController = req.params.fkMachine;
  const qttDataController = req.params.qttData;
  console.log(`Recovering the last ${qttDataController} registers`);
  dashModel
    .getStartupData(columnController, fkMachineController, qttDataController)
    .then(function (result) {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(204).send("No startup data was found!");
      }
    })
    .catch(function (error) {
      console.log(error);
      console.log(
        "There was an error while getting the startup data",
        error.sqlMessage
      );
      res.status(500).json(error.sqlMessage);
    });
}

function getCurrentData(req, res) {
  const columnController = req.params.column;
  const fkMachineController = req.params.fkMachine;
  console.log(`Recovering current registers`);
  dashModel
    .getCurrentData(columnController, fkMachineController)
    .then(function (result) {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(204).send("No current data was found!");
      }
    })
    .catch(function (error) {
      console.log(error);
      console.log(
        "There was an error while getting the startup data",
        error.sqlMessage
      );
      res.status(500).json(error.sqlMessage);
    });
}

module.exports = {
  showKilledProcesses,
  getMachineConstantHardware,
  getStartupData,
  getCurrentData,
};
