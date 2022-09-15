var collectionModel = require("../models/collectionModel");




function getCollection(req, res) {
  const company = req.params.idCompany;

  if (company == undefined) {
    console.log("company undefined on getCollection")
    return false;
  } else {
    collectionModel.getCollection(company)
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

module.exports = {
  getCollection
  };