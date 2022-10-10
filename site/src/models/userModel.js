const database = require("../database/config");
const env = process.env.ENV;

function logIn(emailModel, passwordModel) {
  console.log(
    "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function loginModel(): ",
    emailModel,
    passwordModel
  );
  let dbQuery = "";
  if (env === "development") {
    dbQuery = `
    SELECT *, fkCompany as company 
      FROM Consumer
        WHERE consumerEmail = '${emailModel}' 
          AND consumerPassword = AES_ENCRYPT('${passwordModel}', '${encrypter}');
    `;
  } else if (env === "production") {
    dbQuery = `
    SELECT *, fkCompany as company 
      FROM Consumer
        WHERE consumerEmail = '${emailModel}' 
          AND consumerPassword = '${passwordModel}';
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

function showConsumers(idCompany, idConsumer) {
  console.log(
    "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function showConsumers()",
    idCompany,
    idConsumer
  );
  let dbQuery = "";
  if (env === "development") {
    dbQuery = `
    SELECT consumer.idConsumer, consumer.consumerName, consumer.consumerEmail, 
      DATE_FORMAT(consumer.dtAdded, "%d/%m/%Y") AS dtAdded, 
        consumer.management, manager.consumerName AS managerName, manager.idConsumer AS fkManager 
          FROM consumer 
            JOIN consumer AS manager ON manager.idConsumer = consumer.fkManager 
              JOIN company ON idCompany = consumer.fkCompany 
                WHERE idCompany = ${idCompany} 
                  AND consumer.idConsumer != ${idConsumer} 
                    ORDER BY consumer.dtAdded DESC;
      `;
  } else if (env === "production") {
    dbQuery = `
    SELECT consumer.idConsumer, consumer.consumerName, consumer.consumerEmail, 
      FORMAT(SWITCHOFFSET(consumer.dtAdded, '-03:00'), 'dd/MM/yyyy') AS dtAdded, 
        consumer.management, manager.consumerName AS managerName, manager.idConsumer AS fkManager 
          FROM consumer 
            JOIN consumer AS manager ON manager.idConsumer = consumer.fkManager 
              JOIN company ON idCompany = consumer.fkCompany 
                WHERE idCompany = ${idCompany} 
                    AND consumer.idConsumer != ${idConsumer} 
                      ORDER BY consumer.dtAdded DESC;
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

function addConsumer(
  consumerName,
  consumerEmail,
  consumerPassword,
  management,
  fkManager,
  fkCompany
) {
  console.log(
    "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function addConsumer():",
    consumerName,
    consumerEmail,
    consumerPassword,
    management,
    fkManager,
    fkCompany
  );

  let dbQuery = "";
  if (env === "development") {
    dbQuery = `
    INSERT INTO consumer(consumerName, consumerEmail, consumerPassword, management, fkManager, fkCompany) VALUES 
      ("${consumerName}","${consumerEmail}", AES_ENCRYPT('${consumerPassword}', '${encrypter}'), "${management}", ${fkManager}, ${fkCompany});
    `;
  } else if (env === "production") {
    dbQuery = `
    INSERT INTO consumer(consumerName, consumerEmail, consumerPassword, management, fkManager, fkCompany) VALUES 
      ('${consumerName}','${consumerEmail}', '${consumerPassword}', '${management}', ${fkManager}, ${fkCompany});
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

function editConsumer(
  consumerName,
  consumerEmail,
  consumerPassword,
  management,
  idConsumer
) {
  console.log(
    "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function editConsumer():",
    consumerName,
    consumerEmail,
    consumerPassword,
    management,
    idConsumer
  );

  let dbQuery = "";
  if (env === "development") {
    dbQuery = `
    UPDATE consumer 
      SET consumerName = "${consumerName}", consumerEmail = "${consumerEmail}", 
        consumerPassword = AES_ENCRYPT('${consumerPassword}', '${encrypter}'),  
          management = "${management}" 
            WHERE idConsumer = ${idConsumer};
    `;
  } else if (env === "production") {
    dbQuery = `
    UPDATE consumer 
      SET consumerName = '${consumerName}', consumerEmail = '${consumerEmail}', 
        consumerPassword = '${consumerPassword}',  
          management = '${management}' 
            WHERE idConsumer = ${idConsumer};
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

function updateMachineAdder(fkManager, idConsumer) {
  console.log(
    "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function updateMachineAdder():",
    fkManager,
    idConsumer
  );

  const dbQuery = `
        UPDATE machine 
          SET fkConsumer = ${fkManager}
            WHERE fkConsumer = ${idConsumer};
    `;
  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function updateChildrenManager(fkManager, idConsumer) {
  console.log(
    "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function updateChildrenManager():",
    fkManager,
    idConsumer
  );

  const dbQuery = `
        UPDATE consumer 
          SET fkManager = ${fkManager}
            WHERE fkManager = ${idConsumer};
    `;
  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function deleteConsumer(idConsumer) {
  console.log(
    "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function deleteConsumer(): ",
    idConsumer
  );
  const dbQuery = `
        DELETE FROM consumer 
          WHERE idConsumer = ${idConsumer};
         `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

module.exports = {
  logIn,
  showConsumers,
  addConsumer,
  editConsumer,
  updateMachineAdder,
  updateChildrenManager,
  deleteConsumer,
};
