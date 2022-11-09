const database = require("../database/config");
const env = process.env.ENV;

function showKilledProcesses(idCompany, idMachine) {
  console.log(
    "ACCESSING DASH MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function showKilledProcesses()",
    idCompany,
    idMachine
  );
  let dbQuery = "";
  if (env === "development") {
    dbQuery = `
    SELECT operationName, fkMachine, machineName, classroom, 
      DATE_FORMAT(operationKilled.dtAdded, '%d/%m/%Y - %H:%i') AS dtAdded 
        FROM operationKilled JOIN operation ON idOperation = fkOperation 
          JOIN machine ON idMachine = fkMachine 
            WHERE fkCompany = ${idCompany} 
              AND fkMachine = ${
                typeof idMachine === "string" ? idMachine : `'${idMachine}'`
              } 
                AND operationKilled.dtAdded >= NOW() - INTERVAL 7 DAY 
                  ORDER BY dtAdded ASC;
      `;
  } else if (env === "production") {
    dbQuery = `
    SELECT operationName, fkMachine, machineName, classroom, 
      FORMAT(SWITCHOFFSET(operationKilled.dtAdded, '-03:00'), 'dd/MM/yy - HH:mm') AS dtAdded 
        FROM operationKilled JOIN operation ON idOperation = fkOperation 
          JOIN machine ON idMachine = fkMachine 
            WHERE fkCompany = ${idCompany} 
              AND fkMachine = ${
                typeof idMachine === "string" ? idMachine : `'${idMachine}'`
              } 
                AND operationKilled.dtAdded >= DATEADD(day, -7, GETDATE()) 
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

function showMachineRank(idCompany) {
  console.log(
    "ACCESSING DASH MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function showMachineRank()",
    idCompany
  );
  let dbQuery = "";
  if (env === "development") {
    dbQuery = `
    SELECT machineName, classroom AS data1, COUNT(fkMachine) AS data2  
      FROM operationKilled 
        JOIN machine ON idMachine = fkMachine 
          WHERE fkCompany = ${idCompany} 
            GROUP BY machineName, classroom 
    UNION
    SELECT machineName, AVG(cpu) AS data1, AVG(ram) AS data2 
      FROM machine 
        JOIN dynamicHardware ON idMachine = fkMachine 
          WHERE fkCompany = ${idCompany} 
            AND dynamicHardware.dtAdded >= NOW() - INTERVAL 1 DAY 
              GROUP BY machineName;
      `;
  } else if (env === "production") {
    dbQuery = `
    SELECT machineName, classroom AS data1, COUNT(fkMachine) AS data2  
      FROM operationKilled 
        JOIN machine ON idMachine = fkMachine 
          WHERE fkCompany = ${idCompany} 
            GROUP BY machineName, classroom 
    UNION
    SELECT machineName, AVG(cpu) AS data1, AVG(ram) AS data2 
      FROM machine 
        JOIN dynamicHardware ON idMachine = fkMachine 
          WHERE fkCompany = ${idCompany} 
            AND dynamicHardware.dtAdded >= DATEADD(day, -1, GETDATE()) 
              GROUP BY machineName;
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

function showClassroomRank(idCompany) {
  console.log(
    "ACCESSING DASH MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function showClassroomRank()",
    idCompany
  );
  let dbQuery = "";
  if (env === "development") {
    dbQuery = `
    SELECT classroom, COUNT(idMachine) AS data1, COUNT(idMachine) AS data2 
      FROM machine 
        WHERE fkCompany = ${idCompany} 
          GROUP BY classroom 
    UNION 
    SELECT classroom, COUNT(fkMachine) AS data1, COUNT(fkMachine) AS data2 
      FROM operationKilled 
        JOIN machine ON idMachine = fkMachine 
          WHERE fkCompany = ${idCompany} 
            GROUP BY classroom 
    UNION 
    SELECT classroom, AVG(cpu) AS data1, AVG(ram) AS data2 
      FROM dynamicHardware 
        JOIN machine ON idMachine = fkMachine 
          WHERE fkCompany = ${idCompany} 
            AND dynamicHardware.dtAdded >= NOW() - INTERVAL 1 DAY 
              GROUP BY classroom;
      `;
  } else if (env === "production") {
    dbQuery = `
    SELECT classroom, COUNT(idMachine) AS data1, COUNT(idMachine) AS data2 
    FROM machine 
        WHERE fkCompany = ${idCompany} 
            GROUP BY classroom 
    UNION 
    SELECT classroom, COUNT(fkMachine) AS data1, COUNT(fkMachine) AS data2 
      FROM operationKilled 
        JOIN machine ON idMachine = fkMachine 
          WHERE fkCompany = ${idCompany} 
            GROUP BY classroom 
    UNION 
    SELECT classroom, AVG(cpu) AS data1, AVG(ram) AS data2 
      FROM dynamicHardware 
        JOIN machine ON idMachine = fkMachine 
          WHERE fkCompany = ${idCompany} 
            AND dynamicHardware.dtAdded >= DATEADD(day, -1, GETDATE()) 
              GROUP BY classroom;
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

function showProcessRank(idCompany) {
  console.log(
    "ACCESSING DASH MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function showProcessRank()",
    idCompany
  );
  let dbQuery = "";
  if (env === "development") {
    dbQuery = `
    SELECT operationName, CONVERT(VARCHAR(10), COUNT(operationKilled.fkOperation)) as data 
      FROM operation 
        JOIN operationKilled ON idOperation = fkOperation 
          JOIN machine ON idMachine = fkMachine 
            WHERE fkCompany = ${idCompany} 
              GROUP BY operationName 
    UNION 
    SELECT operationName, machineName 
      FROM operation 
        JOIN operationKilled ON idOperation = fkOperation 
          JOIN machine ON idMachine = fkMachine 
            WHERE fkCompany = ${idCompany} 
              AND machineName = (SELECT m.machineName 
                                    FROM machine AS m 
                                      JOIN operationKilled AS ok ON m.idMachine = ok.fkMachine 
                                        JOIN operation AS op ON op.idOperation = ok.fkOperation 
                                          WHERE op.operationName = operation.operationName 
                                            AND fkCompany = ${idCompany} 
                                              GROUP BY m.machineName 
                                                ORDER BY COUNT(ok.fkOperation) DESC 
                                                  LIMIT 1) 
                GROUP BY operationName, machineName 
    UNION 
    SELECT operationName, CONVERT(VARCHAR(10), classroom) 
      FROM operation 
        JOIN operationKilled ON idOperation = fkOperation 
          JOIN machine ON idMachine = fkMachine 
            WHERE fkCompany = ${idCompany} 
              AND classroom = (SELECT m.classroom 
                                  FROM machine AS m 
                                    JOIN operationKilled AS ok ON m.idMachine = ok.fkMachine 
                                      JOIN operation AS op ON op.idOperation = ok.fkOperation 
                                        WHERE op.operationName = operation.operationName 
                                          AND fkCompany = ${idCompany} 
                                            GROUP BY m.classroom 
                                              ORDER BY COUNT(ok.fkOperation) DESC 
                                                LIMIT 1) 
                GROUP BY operationName, classroom;
      `;
  } else if (env === "production") {
    dbQuery = `
    SELECT operationName, CONVERT(VARCHAR(10), COUNT(operationKilled.fkOperation)) as data 
      FROM operation 
        JOIN operationKilled ON idOperation = fkOperation 
          JOIN machine ON idMachine = fkMachine 
            WHERE fkCompany = ${idCompany} 
              GROUP BY operationName 
    UNION 
    SELECT operationName, machineName 
      FROM operation 
        JOIN operationKilled ON idOperation = fkOperation 
          JOIN machine ON idMachine = fkMachine 
            WHERE fkCompany = ${idCompany} 
              AND machineName = (SELECT TOP 1 m.machineName 
                                    FROM machine AS m 
                                      JOIN operationKilled AS ok ON m.idMachine = ok.fkMachine 
                                        JOIN operation AS op ON op.idOperation = ok.fkOperation 
                                          WHERE op.operationName = operation.operationName 
                                            AND fkCompany = ${idCompany} 
                                              GROUP BY m.machineName
                                                ORDER BY COUNT(ok.fkOperation) DESC) 
                GROUP BY operationName, machineName 
    UNION 
    SELECT operationName, CONVERT(VARCHAR(10), classroom) 
      FROM operation 
        JOIN operationKilled ON idOperation = fkOperation 
          JOIN machine ON idMachine = fkMachine 
            WHERE fkCompany = ${idCompany} 
              AND classroom = (SELECT TOP 1 m.classroom 
                                  FROM machine AS m 
                                    JOIN operationKilled AS ok ON m.idMachine = ok.fkMachine 
                                      JOIN operation AS op ON op.idOperation = ok.fkOperation 
                                        WHERE op.operationName = operation.operationName 
                                          AND fkCompany = ${idCompany} 
                                            GROUP BY m.classroom
                                              ORDER BY COUNT(ok.fkOperation) DESC) 
                GROUP BY operationName, classroom;
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

function getMachineConstantHardware(idMachine) {
  console.log(
    "ACCESSING DASH MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function getMachineConstantHardware(): ",
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
    "ACCESSING DASH MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function getStartupData(): ",
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
    "ACCESSING DASH MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function getCurrentData(): ",
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
  showKilledProcesses,
  showMachineRank,
  showClassroomRank,
  showProcessRank,
  getMachineConstantHardware,
  getStartupData,
  getCurrentData,
};
