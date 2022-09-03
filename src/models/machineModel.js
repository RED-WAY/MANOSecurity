const database = require("../database/config");
const encrypter = process.env.AES_ENCRYPT;


function addMachine(nameController, idUserController, nameUserController, colectionController, company) {
  console.log(
    "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function loginModel(): ",
    nameController,
    idUserController,
    nameController,
    colectionController,
    company
  );
  const dbQuery = `
        insert into Machine(machineName,fkConsumerAdder, NameUserAdder, fkCompany) values
           ('${nameController}','${idUserController}','${nameUserController}', '${company}');
              
          
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function showMachine(company) {
  console.log(
    "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function loginModel(): ",
    company
  );
  const dbQuery = `
       
         SELECT *, machineName as nomeMaquina, nameUserAdder as user FROM Machine WHERE fkCompany = ${company};

         
              
          
           `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function deleteMachine(idMachine) {
  console.log(
    "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function loginModel(): ",
    idMachine
  );
  const dbQuery = `
        DELETE FROM Machine WHERE idMachine = ${idMachine};
            
        
         `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function editMachine(idMachine, newName, newCollection){
  console.log(
    "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function loginModel(): ",
    idMachine,
    newName,
    newCollection
  );
  const dbQuery = `
   UPDATE Machine SET machineName = "${newName}", fkSector = ${newCollection} WHERE idMachine = ${idMachine};
 
            
        
         `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

module.exports = {
  addMachine,
  showMachine,
  deleteMachine,
  editMachine
};
