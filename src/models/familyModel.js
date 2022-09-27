const database = require("../database/config");

function getFamily(fkCompany) {
  console.log(
    "ACCESSING FAMILY MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function getFamily(): ",
    fkCompany
  );
  const dbQuery = `
      SELECT * FROM family WHERE fkCompany = ${fkCompany};
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function getSpecificFamily(idFamily) {
  console.log(
    "ACCESSING FAMILY MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function getSpecificFamily(): ",
    idFamily
  );
  const dbQuery = `
          SELECT familyName, familyLevel, fkOperation 
            FROM family 
              LEFT JOIN familyOperations ON idFamily = fkFamily 
                WHERE idFamily = ${idFamily};
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function showFamilies(fkCompany) {
  console.log(
    "ACCESSING FAMILY MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function showFamilies(): ",
    fkCompany
  );
  const dbQuery = `
          SELECT idFamily, familyLevel, familyName, operationName FROM Family 
	          LEFT JOIN familyOperations ON idFamily = fkFamily 
	          	LEFT JOIN operation ON idOperation = fkOperation 
	          		WHERE fkCompany = ${fkCompany}
	          			ORDER BY idFamily ASC;
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function addFamily(familyName, familyLevel, fkCompany) {
  console.log(
    "ACCESSING FAMILY MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function addFamily(): ",
    familyName,
    familyLevel,
    fkCompany
  );
  const dbQuery = `
      INSERT INTO family (familyName, familyLevel, fkCompany) VALUES
     ('${familyName}', '${familyLevel}', ${fkCompany});                          
             `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}
function addFamilyAccess(accessArray, fkFamily) {
  console.log(
    "ACCESSING FAMILY MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function addFamilyAccess(): ",
    accessArray,
    fkFamily
  );

  let command = "INSERT INTO familyOperations (fkOperation, fkFamily) VALUES";
  let insertedValues = "";
  if (accessArray.length > 0) {
    accessArray.map((idProc, i) => {
      insertedValues += `('${idProc}', '${fkFamily}')`;
      if (i + 1 === accessArray.length) {
        insertedValues += ";";
      } else {
        insertedValues += ", ";
      }
    });
  } else {
    command = "SELECT * FROM";
    insertedValues = "familyOperations;";
  }

  const dbQuery = `
      ${command} 
     ${insertedValues}
             `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function editFamily(idFamily, familyName, familyLevel) {
  console.log(
    "ACCESSING FAMILY MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function editFamily(): ",
    idFamily,
    familyName,
    familyLevel
  );
  const dbQuery = `
          UPDATE Family 
            SET familyName = "${familyName}", familyLevel = "${familyLevel}" 
              WHERE idFamily = ${idFamily};
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function editMachineFamilies(idFamily) {
  console.log(
    "ACCESSING FAMILY MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function editMachineFamilies(): ",
    idFamily
  );
  const dbQuery = `
        UPDATE machine 
          SET fkFamily = null 
            WHERE fkFamily = ${idFamily}
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function removeFromFamilyOperations(fkFamily) {
  console.log(
    "ACCESSING FAMILY MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function removeFromFamilyOperations(): ",
    fkFamily
  );
  const dbQuery = `
          DELETE FROM familyOperations 
              WHERE fkFamily = ${fkFamily};            
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function deleteFamily(idFamily) {
  console.log(
    "ACCESSING FAMILY MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function deleteFamily(): ",
    idFamily
  );
  const dbQuery = `
          DELETE FROM family 
              WHERE idFamily = ${idFamily};            
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

module.exports = {
  getFamily,
  getSpecificFamily,
  showFamilies,
  addFamily,
  addFamilyAccess,
  editFamily,
  editMachineFamilies,
  removeFromFamilyOperations,
  deleteFamily,
};
