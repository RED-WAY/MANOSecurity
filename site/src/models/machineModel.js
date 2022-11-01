const database = require("../database/config");
const env = process.env.ENV;

function addMachine(machineName, classroom, fkConsumer, fkCompany, fkFamily) {
  console.log(
    "ACCESSING MACHINE MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function addMachine(): ",
    machineName,
    classroom,
    fkConsumer,
    fkCompany,
    fkFamily
  );
  const dbQuery = `
        INSERT INTO machine(machineName, fkConsumer, fkCompany, fkFamily, classroom) VALUES 
          ('${machineName}','${fkConsumer}', '${fkCompany}', ${fkFamily}, ${classroom});
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
    SELECT idMachine, machineName, classroom, isUsing, consumerName, familyName, idFamily, 
      DATE_FORMAT(machine.dtAdded, '%d/%m/%Y-%H:%i') AS dtAdded 
        FROM machine 
          LEFT JOIN family ON idFamily = fkFamily 
            JOIN consumer ON idConsumer = fkConsumer 
              WHERE machine.fkCompany = ${fkCompany} 
                ORDER BY dtAdded ASC;
    `;
  } else if (env === "production") {
    dbQuery = `       
    SELECT idMachine, machineName, isUsing, consumerName, familyName, idFamily, 
      FORMAT(SWITCHOFFSET(machine.dtAdded, '-03:00'), 'dd/MM/yy-HH:mm') AS dtAdded 
        FROM machine 
          LEFT JOIN family ON idFamily = fkFamily 
            JOIN consumer ON idConsumer = fkConsumer 
              WHERE machine.fkCompany = ${fkCompany} 
                ORDER BY dtAdded ASC;
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

function getMachinesData(fkCompany) {
  console.log(
    "ACCESSING MACHINE MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function getMachinesData(): ",
    fkCompany
  );
  let dbQuery = `
      SELECT fkMachine, cpu, ram 
        FROM dynamicHardware 
          JOIN machine ON idMachine = fkMachine 
            WHERE fkCompany = ${fkCompany} 
              ORDER BY dynamicHardware.dtAdded DESC;
  `;
  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function editMachine(idMachine, machineName, classroom, fkFamily) {
  console.log(
    "ACCESSING MACHINE MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function editMachine(): ",
    idMachine,
    machineName,
    classroom,
    fkFamily
  );
  const dbQuery = `
          UPDATE machine 
            SET machineName = '${machineName}', 
            classroom = ${classroom}, 
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
        DELETE FROM machine 
          WHERE idMachine = ${idMachine};
        `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function deleteMachineHardware(hardwareType, fkMachine) {
  console.log(
    "ACCESSING MACHINE MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function deleteMachineHardware(): ",
    hardwareType,
    fkMachine
  );
  const dbQuery = `
        DELETE FROM ${hardwareType} 
          WHERE fkMachine = ${fkMachine};
        `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

module.exports = {
  addMachine,
  showMachines,
  getMachinesData,
  editMachine,
  deleteMachine,
  deleteMachineHardware,
};
