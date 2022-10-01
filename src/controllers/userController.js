const userModel = require("../models/userModel");

function logIn(req, res) {
  const emailController = req.body.emailServer;
  const passwordController = req.body.passwordServer;

  if (emailController == undefined) {
    res.status(400).send("Email undefined!");
  } else if (passwordController == undefined) {
    res.status(400).send("Password is undefined!");
  } else {
    userModel
      .logIn(emailController, passwordController)
      .then(function (result) {
        console.log(`\nResults found: ${result.length}`);
        console.log(`Results: ${JSON.stringify(result)}`);

        if (result.length == 1) {
          console.log(result);
          res.json(result[0]);
        } else if (result.length == 0) {
          res.status(403).send("Invalid email and/or password");
        } else {
          res.status(403).send("Login already registered");
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

function showConsumers(req, res) {
  const fkCompany = req.params.fkCompany;
  const idConsumer = req.params.idConsumer;

  if (fkCompany == undefined) {
    console.log("fkCompany is undefined!");
    return false;
  } else if (idConsumer == undefined) {
    console.log("idConsumer is undefined!");
    return false;
  } else {
    userModel
      .showConsumers(fkCompany, idConsumer)
      .then(function (result) {
        if (result.length > 0) {
          res.status(200).json(result);
        } else {
          res.status(204).send("No users found!");
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

function addConsumer(req, res) {
  const fkCompanyController = req.params.fkCompany;
  const consumerNameController = req.body.consumerNameServer;
  const consumerEmailController = req.body.consumerEmailServer;
  const consumerPasswordController = req.body.consumerPasswordServer;
  const managementController = req.body.managementServer;
  const managerController = req.body.managerServer;

  if (consumerNameController == undefined) {
    console.log("consumerName is undefined");
  } else if (consumerEmailController == undefined) {
    console.log("consumerEmail is undefined");
  } else if (consumerPasswordController == undefined) {
    console.log("consumerPassowrd is undefined");
  } else if (managementController == undefined) {
    console.log("management is undefined");
  } else if (managerController == undefined) {
    console.log("manager is undefined");
  } else if (fkCompanyController == undefined) {
    console.log("fkCompany is undefined");
  } else {
    userModel
      .addConsumer(
        consumerNameController,
        consumerEmailController,
        consumerPasswordController,
        managementController,
        managerController,
        fkCompanyController
      )
      .then(function (result) {
        res.json(result);
        console.log("on userController");
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

function editConsumer(req, res) {
  const idConsumerController = req.params.idConsumer;
  const consumerNameController = req.body.consumerNameServer;
  const consumerEmailController = req.body.consumerEmailServer;
  const consumerPasswordController = req.body.consumerPasswordServer;
  const managementController = req.body.managementServer;

  if (consumerNameController == undefined) {
    console.log("consumerName is undefined");
  } else if (consumerEmailController == undefined) {
    console.log("consumerEmail is undefined");
  } else if (consumerPasswordController == undefined) {
    console.log("consumerPassowrd is undefined");
  } else if (managementController == undefined) {
    console.log("management is undefined");
  } else if (idConsumerController == undefined) {
    console.log("idConsumer is undefined");
  } else {
    userModel
      .editConsumer(
        consumerNameController,
        consumerEmailController,
        consumerPasswordController,
        managementController,
        idConsumerController
      )
      .then(function (result) {
        res.json(result);
        console.log("on userController");
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

function updateMachineAdder(req, res) {
  const fkManagerController = req.params.fkManager;
  const idConsumerController = req.params.idConsumer;

  if (fkManagerController == undefined) {
    console.log("consumerName is undefined");
  } else if (idConsumerController == undefined) {
    console.log("idConsumer is undefined");
  } else {
    userModel
      .updateMachineAdder(fkManagerController, idConsumerController)
      .then(function (result) {
        res.json(result);
        console.log("on userController");
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

function updateChildrenManager(req, res) {
  const fkManagerController = req.params.fkManager;
  const idConsumerController = req.params.idConsumer;

  if (fkManagerController == undefined) {
    console.log("consumerName is undefined");
  } else if (idConsumerController == undefined) {
    console.log("idConsumer is undefined");
  } else {
    userModel
      .updateChildrenManager(fkManagerController, idConsumerController)
      .then(function (result) {
        res.json(result);
        console.log("on userController");
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

function deleteConsumer(req, res) {
  const idConsumerController = req.params.idConsumer;

  userModel
    .deleteConsumer(idConsumerController)
    .then(function (result) {
      res.json(result);
    })
    .catch(function (error) {
      console.log(error);
      console.log("Delete user has been failed: ", error.sqlMessage);
      res.status(500).json(error.sqlMessage);
    });
}

module.exports = {
  logIn,
  showConsumers,
  addConsumer,
  editConsumer,
  updateMachineAdder,
  updateChildrenManager,
  deleteConsumer,
};
