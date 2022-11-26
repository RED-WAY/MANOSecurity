const modelFilename = require("../models/modelFile");

function listController(req, res) {
  modelFunction
    .listModel()
    .then(function (result) {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(204).send("No results found!");
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

function listByIdController(req, res) {
  const idParamController = req.params.idParam;

  modelFunction
    .listByIdModel(idParamController)
    .then(function (result) {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(204).send("No results found!");
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

function loginController(req, res) {
  const emailController = req.body.emailServer;
  const passwordController = req.body.passwordServer;

  if (emailController == undefined) {
    res.status(400).send("Email undefined!");
  } else if (passwordController == undefined) {
    res.status(400).send("Password is undefined!");
  } else {
    modelFunction
      .loginModel(emailController, passwordController)
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

function signupController(req, res) {
  var usernameController = req.body.usernameServer;
  var emailController = req.body.emailServer;
  var passwordController = req.body.passwordServer;

  if (usernameController == undefined) {
    res.status(400).send("UsernameController is undefined!");
  } else if (emailController == undefined) {
    res.status(400).send("EmailController is undefined!");
  } else if (passwordController == undefined) {
    res.status(400).send("PasswordController is undefined!");
  } else {
    modelFunction
      .signupModel(usernameController, emailController, passwordController)
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

function publishController(req, res) {
  const contentController = req.body.contentServer;
  const idParamController = req.params.idParam;

  if (contentController == undefined) {
    res.status(400).send("ContentController is undefined!");
  } else if (idParamController == undefined) {
    res.status(403).send("idParamController is undefined!");
  } else {
    modelFunction
      .publishModel(contentController, idParamController)
      .then(function (result) {
        res.json(result);
      })
      .catch(function (error) {
        console.log(error);
        console.error(
          "\nThere was an error trying to publish!\nERROR: ",
          error.sqlMessage
        );
        res.status(500).json(error.sqlMessage);
      });
  }
}

function editController(req, res) {
  const newContentController = req.body.newContent;
  const idParamController = req.params.idParam;

  modelFunction
    .editModel(newContentController, idParamController)
    .then(function (result) {
      res.json(result);
    })
    .catch(function (error) {
      console.log(error);
      console.error(
        "\nThere was an error trying to editing!\nERROR: ",
        error.sqlMessage
      );
      res.status(500).json(error.sqlMessage);
    });
}

function removeController(req, res) {
  const idParamController = req.params.idParam;

  modelFunction
    .removeModel(idParamController)
    .then(function (result) {
      res.json(result);
    })
    .catch(function (error) {
      console.log(error);
      console.error(
        "\nThere was an error trying to remove!\nERROR: ",
        error.sqlMessage
      );
      res.status(500).json(error.sqlMessage);
    });
}

function latestController(req, res) {
  const idParamController = req.params.idParam;
  const linesController = 10;

  console.log(`Getting the last ${linesController} registers...`);

  modelFunction
    .latestModel(idParamController, linesController)
    .then(function (result) {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(204).send("No results found!");
      }
    })
    .catch(function (error) {
      console.log(error);
      console.error(
        "\nThere was an error searching the latest!\nERROR: ",
        error.sqlMessage
      );
      res.status(500).json(error.sqlMessage);
    });
}

function realTimeController(req, res) {
  const idParamController = req.params.idParam;

  console.log(`Getting real-time registers...`);

  modelFunction
    .realTimeModel(idParamController)
    .then(function (result) {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(204).send("No results found!");
      }
    })
    .catch(function (error) {
      console.log(error);
      console.error(
        "\nThere was an error searching real-time data!\nERROR: ",
        error.sqlMessage
      );
      res.status(500).json(error.sqlMessage);
    });
}

module.exports = {
  listController,
  listByIdController,
  loginController,
  signupController,
  publishController,
  editController,
  removeController,
  latestController,
  realTimeController,
};
