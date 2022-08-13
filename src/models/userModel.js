const database = require("../database/config");
// const encrypter = process.env.AES_ENCRYPT;

function listModel() {
  console.log(
    "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function listModel()"
  );
  const dbQuery = `
        SELECT * FROM userTable;
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
        SELECT * 
          FROM user
            WHERE userEmail = '${emailModel}' 
              AND userPassword = '${passwordModel}';
            `;
              // AND (--passwordColumn--) = AES_ENCRYPT('${passwordModel}', '${encrypter}');
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
          ('${usernameModel}', '${emailModel}', '${passwordModel}');
    `;
  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

module.exports = {
  listModel,
  logIn,
  signUp,
};
