const database = require("../database/config");
const env = process.env.ENV;

function getMachineConstantHardware(idMachine) {
  console.log(
    "ACCESSING MACHINE MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function getMachineConstantHardware(): ",
    idMachine
  );
  const dbQuery = `       
    SELECT machineName, 
            operationalSystem, 
            cpuName, 
            cpuCore, 
            ramSize AS ramUsable, 
            diskModel, 
            diskSize 
        FROM machine 
          LEFT JOIN constantHardware ON idMachine = fkMachine 
            WHERE idMachine = ${idMachine};
    `;
  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function getStartupData(column, fkMachine, qttData) {
  console.log(
    "ACCESSING MACHINE MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function getStartupData(): ",
    column,
    fkMachine,
    qttData
  );
  let dbQuery = "";
  if (env === "development") {
    dbQuery = `
      SELECT ${column}, DATE_FORMAT(dtAdded, '%H:%i') AS dtAdded 
        FROM dynamicHardware 
          WHERE fkMachine = ${fkMachine} 
            ORDER BY idDynamicHardware DESC 
              LIMIT ${qttData};
    `;
  } else if (env === "production") {
    dbQuery = `
      SELECT TOP ${qttData} ${column}, 
        FORMAT(SWITCHOFFSET(dtAdded, '-03:00'), 'HH:mm') AS dtAdded 
          FROM dynamicHardware 
            WHERE fkMachine = ${fkMachine} 
              ORDER BY idDynamicHardware DESC;
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

function getCurrentData(column, fkMachine) {
  console.log(
    "ACCESSING MACHINE MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function getCurrentData(): ",
    column,
    fkMachine
  );
  let dbQuery = "";
  if (env === "development") {
    dbQuery = `
      SELECT ${column}, DATE_FORMAT(dtAdded, '%H:%i') AS dtAdded 
        FROM dynamicHardware 
          WHERE fkMachine = ${fkMachine} 
            ORDER BY idDynamicHardware DESC 
              LIMIT 1;
    `;
  } else if (env === "production") {
    dbQuery = `
      SELECT TOP 1 ${column}, 
        FORMAT(SWITCHOFFSET(dtAdded, '-03:00'), 'HH:mm') AS dtAdded 
          FROM dynamicHardware 
            WHERE fkMachine = ${fkMachine} 
              ORDER BY idDynamicHardware DESC;
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

module.exports = {
  getMachineConstantHardware,
  getStartupData,
  getCurrentData,
};
