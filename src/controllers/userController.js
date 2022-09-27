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
  const fkCompany = req.params.fkCompany;
  const consumerName = req.body.consumerNameServer;
  const consumerEmail = req.body.consumerEmailServer;
  const consumerPassword = req.body.consumerPasswordServer;
  const management = req.body.managementServer;
  const manager = req.body.managerServer;

  if (consumerName == undefined) {
    console.log("consumerName is undefined");
  } else if (consumerEmail == undefined) {
    console.log("consumerEmail is undefined");
  } else if (consumerPassword == undefined) {
    console.log("consumerPassowrd is undefined");
  } else if (management == undefined) {
    console.log("management is undefined");
  } else if (manager == undefined) {
    console.log("manager is undefined");
  } else if (fkCompany == undefined) {
    console.log("fkCompany is undefined");
  } else {
    userModel
      .addConsumer(
        consumerName,
        consumerEmail,
        consumerPassword,
        management,
        manager,
        fkCompany
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
  const idConsumer = req.params.idConsumer;
  const consumerName = req.body.consumerNameServer;
  const consumerEmail = req.body.consumerEmailServer;
  const consumerPassword = req.body.consumerPasswordServer;
  const management = req.body.managementServer;

  if (consumerName == undefined) {
    console.log("consumerName is undefined");
  } else if (consumerEmail == undefined) {
    console.log("consumerEmail is undefined");
  } else if (consumerPassword == undefined) {
    console.log("consumerPassowrd is undefined");
  } else if (management == undefined) {
    console.log("management is undefined");
  } else if (idConsumer == undefined) {
    console.log("idConsumer is undefined");
  } else {
    userModel
      .editConsumer(
        consumerName,
        consumerEmail,
        consumerPassword,
        management,
        idConsumer
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

function deleteConsumer(req, res) {
  const idConsumer = req.params.idConsumer;

  userModel
    .deleteConsumer(idConsumer)
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
  deleteConsumer,
};
