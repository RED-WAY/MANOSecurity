const database = require("../database/config");

function checkAccessGlobaly(operationName, operationPath, operationType) {
  console.log(
    "ACCESSING ACCESS MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function checkAccessGlobaly(): ",
    operationName,
    operationPath,
    operationType,
  );
  const dbQuery = `
          SELECT * FROM operation
	          WHERE operationName = '${operationName}' 
	          	AND operationPath = '${operationPath}' 
	          		AND operationType = '${operationType}';
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function addAccessGlobal(operationName, operationPath, operationType) {
  console.log(
    "ACCESSING ACCESS MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function addAccessGlobal(): ",
    operationName,
    operationPath,
    operationType
  );
  const dbQuery = `
            INSERT INTO operation (operationName, operationPath, operationType) VALUES 
              ('${operationName}','${operationPath}','${operationType}');
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
          INSERT INTO companyOperations(fkOperation, fkCompany) VALUES 
           (${fkOperation}, ${fkCompany});
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function showAccess(fkCompany) {
  console.log(
    "ACCESSING ACCESS MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function showAccess(): ",
    fkCompany
  );
  const dbQuery = `
        SELECT * FROM operation 
          JOIN companyOperations ON fkOperation = idOperation 
            JOIN Company ON idCompany = fkCompany 
              WHERE fkCompany = ${fkCompany};
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function deleteAccessCompany(fkCompany, fkOperation) {
  console.log(
    "ACCESSING ACCESS MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function deleteAccessCompany(): ",
    fkCompany,
    fkOperation
  );
  const dbQuery = `
          DELETE FROM companyOperations 
            WHERE fkCompany = ${fkCompany}
              AND fkOperation = ${fkOperation};              
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function deleteAccessFamily(fkCompany, fkOperation) {
  console.log(
    "ACCESSING ACCESS MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function deleteAccessFamily(): ",
    fkCompany,
    fkOperation
  );
  const dbQuery = `
          DELETE familyOperations FROM familyOperations 
	          JOIN family ON fkFamily = idFamily 
              WHERE fkCompany = ${fkCompany} 
                AND fkOperation =${fkOperation};
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function verifyGlobalAccessUsing(idOperation) {
  console.log(
    "ACCESSING ACCESS MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function verifyGlobalAccessUsing(): ",
    idOperation
  );
  const dbQuery = `
          SELECT companyOperations.fkOperation AS company, familyOperations.fkOperation AS familiesUsing 
            FROM companyOperations 
	            RIGHT JOIN operation ON companyOperations.fkOperation = idOperation 
	            	LEFT JOIN familyOperations ON familyOperations.fkOperation = idOperation 
	            		WHERE idOperation = ${idOperation};
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function deleteAccessGlobal(idOperation) {
  console.log(
    "ACCESSING ACCESS MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function deleteAccessGlobal(): ",
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
  showAccess,
  deleteAccessCompany,
  deleteAccessFamily,
  verifyGlobalAccessUsing,
  deleteAccessGlobal,
};
