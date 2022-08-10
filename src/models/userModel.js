const database = require("../database/config");
const encrypter = process.env.AES_ENCRYPT;

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

function loginModel(emailModel, passwordModel) {
  console.log(
    "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function loginModel(): ",
    emailModel,
    "password"
  );
  const dbQuery = `
        SELECT * 
          FROM (--TABLE--) 
            WHERE (--emailColumn--) = '${emailModel}' 
              AND (--passwordColumn--) = AES_ENCRYPT('${passwordModel}', '${encrypter}');
    `;
  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function signupModel(usernameModel, emailModel, passwordModel) {
  console.log(
    "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function signupModel():",
    usernameModel,
    emailModel,
    "password"
  );

  const dbQuery = `
        INSERT INTO (--TABLE--) ((--usernameColumn--), (--emailColumn--), (--passwordColumn--)) VALUES 
          ('${usernameModel}', '${emailModel}', AES_ENCRYPT('${passwordModel}', '${encrypter}'));
    `;
  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

module.exports = {
  listModel,
  loginModel,
  signupModel,
};
