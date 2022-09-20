const database = require("../database/config");
const encrypter = process.env.AES_ENCRYPT;

function showUsers(idCompany) {
  console.log(
    "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function listModel()",
    idCompany
  );
  const dbQuery = `
        SELECT * FROM Consumer where fkCompany = ${idCompany};
    `;
  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

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

function addUser(idCompany, userName, 
  userEmail, userPassword,manager, carg) {
  console.log(
    "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function signupModel():",
    idCompany, 
    userName,  
    userEmail, 
    userPassword, 
    carg,
    manager
  );

  const dbQuery = `
  insert into Consumer(consumerName, consumerEmail, consumerPassword, responsability, manager, fkCompany) values
  ( "${userName}","${userEmail}","${userPassword}","${carg}",${manager},${idCompany});
    `;
  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

module.exports = {
  showUsers,
  logIn,
  signUp,
  addUser
};
