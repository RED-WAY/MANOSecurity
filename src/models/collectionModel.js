const database = require("../database/config");

function getCollection(fkCompany) {
  console.log(
    "ACCESSING COLLECTION MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function getCollection(): ",
    fkCompany
  );
  const dbQuery = `
      SELECT * FROM sector WHERE fkCompany = ${fkCompany}
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function getSpecificCollection(idCollection) {
  console.log(
    "ACCESSING COLLECTION MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function getSpecificCollection(): ",
    idCollection
  );
  const dbQuery = `
          SELECT sectorName, sectorLevel, fkOperation 
            FROM sector 
              JOIN operationlog ON idSector = fkSector 
                WHERE idSector = ${idCollection};
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function showCollection(fkCompany) {
  console.log(
    "ACCESSING COLLECTION MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function showCollection(): ",
    fkCompany
  );
  const dbQuery = `
      SELECT * FROM sector WHERE fkCompany = ${fkCompany}
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function addCollection(collectionLevel, collectionName, company) {
  console.log(
    "ACCESSING COLLECTION MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function addCollection(): ",
    collectionLevel,
    collectionName,
    company
  );
  const dbQuery = `
      INSERT INTO Sector(sectorName, sectorLevel, fkCompany)VALUES
     ('${collectionName}', '${collectionLevel}', ${company});                          
             `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}
function addCollectionAccess(accessArray, fkCollection) {
  console.log(
    "ACCESSING COLLECTION MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function addCollectionAccess(): ",
    accessArray,
    fkCollection
  );

  let command = "INSERT INTO OperationLog(fkOperation, fkSector) VALUES";
  let insertedValues = "";
  if (accessArray.length > 0) {
    accessArray.map((idProc, i) => {
      insertedValues += `('${idProc}', '${fkCollection}')`;
      if (i + 1 === accessArray.length) {
        insertedValues += ";";
      } else {
        insertedValues += ", ";
      }
    });
  } else {
    command = "SELECT * FROM";
    insertedValues = "operation log;";
  }

  const dbQuery = `
      ${command} 
     ${insertedValues}
             `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function editCollection(idCollection, collectionLevel, collectionName) {
  console.log(
    "ACCESSING COLLECTION MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function editCollection(): ",
    idCollection,
    collectionLevel,
    collectionName
  );
  const dbQuery = `
          UPDATE Sector 
            SET sectorName = "${collectionName}", sectorLevel = ${collectionLevel} 
              WHERE idSector = ${idCollection};
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function editMachineCollections(idFamily) {
  console.log(
    "ACCESSING COLLECTION MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function editMachineCollections(): ",
    idFamily
  );
  const dbQuery = `
        UPDATE machine 
          SET fkSector = null 
            WHERE fkSector = ${idFamily}
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function removeFromOperationLog(fkFamily) {
  console.log(
    "ACCESSING COLLECTION MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function removeFromOperationLog(): ",
    fkFamily
  );
  const dbQuery = `
          DELETE FROM operationlog 
              WHERE fkSector = ${fkFamily};            
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function deleteCollection(idFamily) {
  console.log(
    "ACCESSING COLLECTION MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function deleteCollection(): ",
    idFamily
  );
  const dbQuery = `
          DELETE FROM sector 
              WHERE idSector = ${idFamily};            
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

module.exports = {
  getCollection,
  getSpecificCollection,
  showCollection,
  addCollection,
  addCollectionAccess,
  editCollection,
  editMachineCollections,
  removeFromOperationLog,
  deleteCollection,
};
