const database = require("../database/config");
const encrypter = process.env.AES_ENCRYPT;

function showUsers(idCompany) {
  console.log(
    "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function listModel()",
    idCompany
  );
  const dbQuery = `
  SELECT consumer.*, gestor.consumerName as gerente,
  YEAR(Consumer.dttAdd) as ano,
 MONTH(Consumer.dttAdd) as mes,
      DAY(Consumer.dttAdd) As dia FROM Consumer join consumer as gestor 
       on gestor.idConsumer = Consumer.manager
         where Consumer.fkCompany = ${idCompany};
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

function deleteUser(idUser) {
  console.log(
    "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function loginModel(): ",
    idSector
  );
  const dbQuery = `
        DELETE FROM Consumer WHERE idConsumer = ${idUser};
            
        
         `;

  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function addUser(idUser, userName, 
  userEmail, userPassword, carg) {
  console.log(
    "ACCESSING USER MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function signupModel():",
    idUser, 
    userName, 
    userEmail, 
    userPassword, 
    carg
  );

  const dbQuery = `
     UPDATE Consumer SET consumerName = "${userName}" , consumerEmail = "${userEmail}"
     , consumerPassword = "${userPassword}" , responsability ="${carg}"
     WHERE idConsumer = ${idUser};
    `;
  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

module.exports = {
  showUsers,
  logIn,
  signUp,
  addUser,
  deleteUser
};
