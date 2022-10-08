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
          JOIN constantHardware ON idMachine = fkMachine 
            WHERE idMachine = ${idMachine};
    `;
  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

module.exports = {
  getMachineConstantHardware,
};
