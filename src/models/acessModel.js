const database = require("../database/config");

function checkAccessGlobaly(type, name, process) {
  console.log(
    "ACCESSING ACCESS MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function checkAccessGlobaly(): ",
    type,
    name,
    process
  );
  const dbQuery = `
          SELECT * FROM Operation
	          WHERE OperationName = '${name}' 
	          	AND OperationPath = '${process}' 
	          		AND OperationType = '${type}';
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function addAccessGlobal(type, name, process) {
  console.log(
    "ACCESSING ACCESS MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function addAcessGlobal(): ",
    type,
    name,
    process
  );
  const dbQuery = `
            INSERT INTO Operation(operationName, operationPath, OperationType) VALUES
              ('${name}','${process}','${type}');
             `;

  console.log("Executing SQL query: \n" + dbQuery);

  return database.executeQuery(dbQuery);
}

function addAccessCompany(fkOperation, fkCompany) {
  console.log(
    "ACCESSING ACCESS MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function addAccessCompany(): ",
    fkOperation,
    fkCompany
  );
  const dbQuery = `
          INSERT INTO companyOperations(fkOperation, fkCompany)values
           ( ${fkOperation}, ${fkCompany} );
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function showAcess(fkCompany) {
  console.log(
    "ACCESSING ACCESS MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function showAccess(): ",
    fkCompany
  );
  const dbQuery = `
        SELECT * FROM Operation 
          JOIN companyOperations ON fkOperation = idOperation 
            JOIN Company ON idCompany = fkCompany 
              WHERE fkCompany = ${fkCompany};
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function deleteAcess(idOperation) {
  console.log(
    "ACCESSING ACCESS MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function deleteAccess(): ",
    idOperation
  );
  const dbQuery = `
          DELETE FROM operation WHERE idOperation = ${idOperation};              
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}
module.exports = {
  checkAccessGlobaly,
  addAccessGlobal,
  addAccessCompany,
  showAcess,
  deleteAcess,
};
