var acessModel = require("../models/acessModel");

function addAcess(req, res) {

    var type = req.body.typeServer;
    var name = req.body.nameServer;
    var process = req.body.processServer;
    const company = req.body.companyServer
  
    if (type == undefined) {
      res.status(400).send("collectionLevel is undefined!");
    } else if (name == undefined) {
      res.status(400).send("collectionName is undefined!");
    } else if(process == undefined){
        res.status(400).send("process is undefined")
    }else{
      acessModel.addAcess(type, name, process, company)
        .then(function (result) {
          res.json(result);
          console.log('estou aqui, collectionController')
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

  function addAccessCompany(req, res) {

    var type = req.body.typeServer;
    var name = req.body.nameServer;
    var process = req.body.processServer;
    const company = req.body.companyServer
  
    if (type == undefined) {
      res.status(400).send("collectionLevel is undefined!");
    } else if (name == undefined) {
      res.status(400).send("collectionName is undefined!");
    } else if(process == undefined){
        res.status(400).send("process is undefined")
    }else{
      acessModel.addAccessCompany(type, name, process, company)
        .then(function (result) {
          res.json(result);
          console.log('estou aqui, collectionController')
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

  function showAcess(req, res) {
    
    const company = req.params.idCompany;
  
    if (company == undefined) {
      console.log("company undefined on showCollection")
      return false;
    } else {
      acessModel.showAcess(company)
        .then(function (result) {
          res.json(result);
          console.log('estou aqui, collectionController')
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

  function deleteAcess(req, res) {
    const acess = req.params.idAcess;
  
    acessModel.deleteAcess(acess)
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
  

module.exports = {
    addAcess,
    showAcess,
    deleteAcess,
    addAccessCompany
  };