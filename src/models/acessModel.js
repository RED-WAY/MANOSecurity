const database = require("../database/config");


function addAcess(type, name, process, company) {
    console.log(
        "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function loginModel(): ",
        type,
        name,
        process,
        company
    );
    const dbQuery = `
              INSERT INTO Operation(operationName, operationPath, OperationType) 
              VALUES
            ('${name}','${process}','${type}');

            INSERT INTO companyOperations(fkOperation, fkCompany)values
             ( (SELECT (idOperation)
             FROM Operation
             WHERE 
             operationName = '${name}' and
             operationPath = '${process}' and
             OperationType ='${type}'), ${company} );
             `;

    console.log("Executing SQL query: \n" + dbQuery);
    return database.executeQuery(dbQuery);
}


function showAcess(idCompany){
    console.log(
      "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function loginModel(): ",
      idCompany
    );
    const dbQuery = `
        SELECT * FROM Operation 
        JOIN companyOperations 
        ON fkOperation = idOperation
        JOIN Company 
        ON idCompany = fkCompany
        WHERE fkCompany = ${idCompany};
           `;
  
    console.log("Executing SQL query: \n" + dbQuery);
    return database.executeQuery(dbQuery);
  }
  
  function deleteAcess(acess) {
    console.log(
      "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function loginModel(): ",
      acess
    );
    const dbQuery = `
          DELETE FROM operation WHERE idOperation = ${acess};
              
          
           `;
  
    console.log("Executing SQL query: \n" + dbQuery);
    return database.executeQuery(dbQuery);
  }
module.exports = {
    addAcess,
    showAcess,
    deleteAcess
};
