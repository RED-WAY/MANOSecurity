const database = require("../database/config");

function getCollection(idCompany) {
  console.log(
    "ACCESSING COLLECTION MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function getCollection(): ",
    idCompany
  );
  const dbQuery = `
      SELECT * FROM sector WHERE fkCompany = ${idCompany}
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function showCollection(idCompany) {
  console.log(
    "ACCESSING COLLECTION MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function showCollection(): ",
    idCompany
  );
  const dbQuery = `
      SELECT * FROM sector WHERE fkCompany = ${idCompany}
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
     ('${collectionName}', '${collectionLevel}',${company});                          
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

  let insertedValues = "";
  accessArray.map((idProc, i) => {
    insertedValues += `('${idProc}', '${fkCollection}')`;
    if (i + 1 === accessArray.length) {
      insertedValues += ";";
    } else {
      insertedValues += ", ";
    }
  });

  const dbQuery = `
      INSERT INTO OperationLog(fkOperation, fkSector)VALUES
     ${insertedValues}
             `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function editCollection(idCollection, newNameCollection, newLevelCollection) {
  console.log(
    "ACCESSING COLLECTION MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function editCollection(): ",
    idCollection,
    newNameCollection,
    newLevelCollection
  );
  const dbQuery = `
     UPDATE Sector SET sectorName = "${newNameCollection}", sectorLevel = ${newLevelCollection} 
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
  addCollection,
  addCollectionAccess,
  showCollection,
  editCollection,
  editMachineCollections,
  removeFromOperationLog,
  deleteCollection,
};
