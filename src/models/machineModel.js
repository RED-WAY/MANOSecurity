const database = require("../database/config");
const encrypter = process.env.AES_ENCRYPT;

function addMachine(
  nameController,
  idUserController,
  nameUserController,
  colectionController,
  company
) {
  console.log(
    "ACCESSING MACHINE MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function addMachine(): ",
    nameController,
    idUserController,
    nameController,
    colectionController,
    company
  );
  const dbQuery = `
        INSERT INTO Machine(machineName,fkConsumerAdder, NameUserAdder, fkCompany, fkSector) VALUES 
           ('${nameController}','${idUserController}','${nameUserController}', '${company}', ${colectionController});
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function showMachine(fkCompany) {
  console.log(
    "ACCESSING MACHINE MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function showMachine(): ",
    fkCompany
  );
  const dbQuery = `       
          SELECT idMachine, machineName, nameUserAdder, sectorName, idSector, 
            DATE_FORMAT(dtAdded, '%d/%m/%Y-%H:%i') AS dtAdded 
              FROM Machine 
                LEFT JOIN Sector ON idSector = fkSector 
                  WHERE Machine.fkCompany = ${fkCompany};
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function editMachine(idMachine, newName, newCollection) {
  console.log(
    "ACCESSING MACHINE MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function editMachine(): ",
    idMachine,
    newName,
    newCollection
  );
  const dbQuery = `
          UPDATE Machine 
            SET machineName = "${newName}", 
            fkSector = ${newCollection} 
              WHERE idMachine = ${idMachine};
         `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function deleteMachine(idMachine) {
  console.log(
    "ACCESSING MACHINE MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function deleteMachine(): ",
    idMachine
  );
  const dbQuery = `
        DELETE FROM Machine 
          WHERE idMachine = ${idMachine};
         `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

module.exports = {
  addMachine,
  showMachine,
  editMachine,
  deleteMachine,
};
