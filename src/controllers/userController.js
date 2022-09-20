var userModel = require("../models/userModel");



function showUsers(req, res) {

   const idCompany = req.params.idCompany;
   if(idCompany == undefined){
    return false;
   }else{
  userModel
    .showUsers(idCompany)
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
}
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

function signUp(req, res) {
  const usernameController = req.body.usernameServer;
  const emailController = req.body.emailServer;
  const passwordController = req.body.passwordServer;

  if (usernameController == undefined) {
    res.status(400).send("UsernameController is undefined!");
  } else if (emailController == undefined) {
    res.status(400).send("EmailController is undefined!");
  } else if (passwordController == undefined) {
    res.status(400).send("PasswordController is undefined!");
  } else {
    userModel.signUp(usernameController, emailController, passwordController)
      .then(function (result) {
        res.json(result);
        console.log('estou aqui')
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

function addUser(req, res){
  const idCompany = req.params.idCompany;
  const userName = req.body.userNameServer;
  const userEmail = req.body.userEmailServer;
  const userPassword = req.body.userPasswordServer;
  const carg = req.body.cargServer;
  const manager = req.body.manegerServer;
 
  if (userEmail == undefined) {
    console.log('userName is not defined')
} else if (userPassword == undefined) {
 
    console.log('userPassowrd is not defined')
} else if (carg == undefined){
    console.log('user Carg is not defined')


}else if(userName == undefined){
    console.log('userName is not defined')
}else if(manager == undefined){
  console.log('user manager is not defined')
}{

    userModel.addUser(idCompany, userName, 
      userEmail, userPassword,manager, carg)
    .then(function (result) {
      res.json(result);
      console.log('estou aqui, userController')
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
  showUsers,
  logIn,
  signUp,
 addUser
};
