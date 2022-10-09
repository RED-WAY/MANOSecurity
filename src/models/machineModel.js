const database = require("../database/config");
const encrypter = process.env.AES_ENCRYPT;
const env = process.env.ENV;

function addMachine(machineName, fkConsumer, fkCompany, fkFamily) {
  console.log(
    "ACCESSING MACHINE MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function addMachine(): ",
    machineName,
    fkConsumer,
    fkCompany,
    fkFamily
  );
  const dbQuery = `
        INSERT INTO machine(machineName, fkConsumer, fkCompany, fkFamily) VALUES 
          ('${machineName}','${fkConsumer}', '${fkCompany}', ${fkFamily});
        `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function showMachines(fkCompany) {
  console.log(
    "ACCESSING MACHINE MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function showMachines(): ",
    fkCompany
  );
  let dbQuery = "";
  if (env === "development") {
    dbQuery = `       
    SELECT idMachine, machineName, isUsing, consumerName, familyName, idFamily, 
      DATE_FORMAT(machine.dtAdded, '%d/%m/%Y-%H:%i') AS dtAdded 
        FROM machine 
          LEFT JOIN Family ON idFamily = fkFamily 
            JOIN consumer ON idConsumer = fkConsumer 
              WHERE Machine.fkCompany = ${fkCompany};
    `;
  } else if (env === "production") {
    dbQuery = `       
    SELECT idMachine, machineName, consumerName, familyName, idFamily, 
      FORMAT(SWITCHOFFSET(machine.dtAdded, '-03:00'), 'dd/MM/yy-HH:mm') AS dtAdded
        FROM machine 
          LEFT JOIN Family ON idFamily = fkFamily 
            JOIN consumer ON idConsumer = fkConsumer 
              WHERE Machine.fkCompany = ${fkCompany};
    `;
  } else {
    console.error(
      "\nENVIRONMENT (development | production) WAS NOT DEFINED AT: app.js\n"
    );
    return;
  }

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function editMachine(idMachine, machineName, fkFamily) {
  console.log(
    "ACCESSING MACHINE MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function editMachine(): ",
    idMachine,
    machineName,
    fkFamily
  );
  const dbQuery = `
          UPDATE Machine 
            SET machineName = '${machineName}', 
            fkFamily = ${fkFamily} 
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
  showMachines,
  editMachine,
  deleteMachine,
};
