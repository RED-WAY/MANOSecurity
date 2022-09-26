const database = require("../database/config");
const encrypter = process.env.AES_ENCRYPT;

function logIn(emailModel, passwordModel) {
  console.log(
    "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function loginModel(): ",
    emailModel,
    passwordModel
  );
  const dbQuery = `
        SELECT *, fkCompany as company 
          FROM Consumer
            WHERE consumerEmail = '${emailModel}' 
              AND consumerPassword = AES_ENCRYPT('${passwordModel}', '${encrypter}');
            `;
  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function signUp(usernameModel, emailModel, passwordModel) {
  console.log(
    "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function signupModel():",
    usernameModel,
    emailModel,
    passwordModel
  );

  const dbQuery = `
        INSERT INTO user (userName, userEmail, userPassword) VALUES 
          ('${usernameModel}', '${emailModel}', AES_ENCRYPT('${passwordModel}', '${encrypter}'));
    `;
  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function showConsumers(idCompany, idConsumer) {
  console.log(
    "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function showConsumers()",
    idCompany,
    idConsumer
  );
  const dbQuery = `
          SELECT consumer.idConsumer, consumer.consumerName, consumer.consumerEmail, 
	          DATE_FORMAT(consumer.dtAdded, "%d/%m/%Y") AS dtAdded, 
	          	consumer.management, manager.consumerName AS managerName 
	          		FROM consumer 
	          			JOIN consumer AS manager ON manager.idConsumer = consumer.fkManager 
	          				JOIN company ON idCompany = consumer.fkCompany 
	          					WHERE idCompany = ${idCompany} 
                        AND consumer.idConsumer != ${idConsumer} 
                          ORDER BY consumer.dtAdded DESC;
    `;
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

  const dbQuery = `
          INSERT INTO consumer(consumerName, consumerEmail, consumerPassword, management, fkManager, fkCompany) VALUES 
            ("${consumerName}","${consumerEmail}", AES_ENCRYPT('${consumerPassword}', '${encrypter}'), "${management}", ${fkManager}, ${fkCompany});
    `;
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

  const dbQuery = `
          UPDATE consumer 
            SET consumerName = "${consumerName}", consumerEmail = "${consumerEmail}", 
              consumerPassword = AES_ENCRYPT('${consumerPassword}', '${encrypter}'),  
                management = "${management}" 
                  WHERE idConsumer = ${idConsumer};
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
  signUp,
  showConsumers,
  addConsumer,
  editConsumer,
  deleteConsumer,
};
