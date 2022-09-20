const database = require("../database/config");

function getCollection(idCompany) {
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

function showCollection(idCompany) {
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

function addCollection(collectionLevel, collectionName, company) {
  console.log(
    "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function loginModel(): ",

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
    "ACCESSING COLLECTION MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function collectionModel(): ",

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
    "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function loginModel(): ",
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

function deleteCollection(idSector) {
  console.log(
    "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function loginModel(): ",
    idSector
  );
  const dbQuery = `
          DELETE FROM Sector WHERE idSector = ${idSector};
              
          
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
  deleteCollection,
};
