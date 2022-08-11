const userModel = require("../models/userModel");

function listController(req, res) {
  userModel
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

function loginController(req, res) {
  const emailController = req.body.emailServer;
  const passwordController = req.body.passwordServer;

  if (emailController == undefined) {
    res.status(400).send("Email undefined!");
  } else if (passwordController == undefined) {
    res.status(400).send("Password is undefined!");
  } else {
    userModel
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
    userModel
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

module.exports = {
  listController,
  loginController,
  signupController,
};