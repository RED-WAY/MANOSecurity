const database = require("../database/config");
const encrypter = process.env.AES_ENCRYPT;

function getCollection(idCompany){
    console.log(
      "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function loginModel(): ",
      idCompany
    );
    const dbQuery = `
      select * from sector where fkCompany = ${idCompany}
   
           `;
  
    console.log("Executing SQL query: \n" + dbQuery);
    return database.executeQuery(dbQuery);
  }

module.exports = {
     getCollection
  };
  