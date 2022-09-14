var machineModel = require("../models/machineModel");


function addMachine(req, res) {
  //  const tokenController = req.body.usernameServer;
  const colectionController = req.body.collectionServer;
  const nameController = req.body.nameServer;
  const nameUserController = req.body.nameUserServer;
  const idUserController = req.body.idUserServer;
  const company = req.body.companyServer;

  if (colectionController == undefined) {
    res.status(400).send("colectionController is undefined!");
  } else if (nameController == undefined) {
    res.status(400).send("nameController is undefined!");
  } else if (nameUserController == undefined) {
    res.status(400).send("nameUserController is undefined!");
  } else if (idUserController == undefined) {
    res.status(400).send("idUser is undefined!");
  } else {
    machineModel.addMachine(nameController, idUserController, nameUserController, colectionController, company)
      .then(function (result) {
        res.json(result);
        console.log('estou aqui, machineController')
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


function showMachine(req, res) {
  const company = req.body.companyServer;

  if (company == undefined) {
    console.log("company undefined")
    return false;
  } else {
    machineModel.showMachine(company)
      .then(function (result) {
        res.json(result);
        console.log('estou aqui, machineController')
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
    console.log("company undefined on getCollection")
    return false;
  } else {
    machineModel.getCollection(company)
      .then(function (result) {
        res.json(result);
        console.log('estou aqui, machineController')
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
  const idMachine = req.params.idMachine;

  machineModel.deleteMachine(idMachine)
    .then(
      function (result) {
        res.json(result);
      }
    ).catch(
      function (error) {
        console.log(error);
        console.log("Delete machine has been failed: ", error.sqlMessage);
        res.status(500).json(error.sqlMessage)
      }
    )


}

function editMachine(req, res) {
  const idMachine = req.params.idMachine;
  const newNameMachine = req.body.newNameServer;
  const newCollectionMachine = req.body.newCollectionServer;
  console.log(idMachine)
  console.log(newNameMachine)
  console.log(newCollectionMachine)
  
  if (idMachine == undefined) {
    return false;
  } else if (newCollectionMachine == undefined ||
    newCollectionMachine == "") {
    return false;
  } else if (newNameMachine == undefined ||
    newNameMachine == "") {
    return false;
  }else{

 machineModel.editMachine(idMachine,newNameMachine, newCollectionMachine)
    .then(
      function (result) {
        res.json(result);
      }
    ).catch(
      function (error) {
        console.log(error);
        console.log("edit machine has been failed: ", error.sqlMessage);
        res.status(500).json(error.sqlMessage)
      }
    )
    }

}


module.exports = {
  addMachine,
  showMachine,
  deleteMachine,
  editMachine,
  getCollection
};
