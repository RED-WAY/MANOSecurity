const dashModel = require("../models/dashModel");

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

module.exports = {
  getMachineConstantHardware,
};