const database = require("../database/config");

function listModel() {
  console.log(
    "ACCESSING (--FILENAME--) MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function listModel()"
  );
  const dbQuery = `
        SELECT * FROM (--TABLE--);
    `;
  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function listByIdModel(idParamModel) {
  console.log(
    "ACCESSING (--FILENAME--) MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function listByIdModel()"
  );
  const dbQuery = `
        SELECT * FROM (--TABLE--) 
            WHERE (--idColumn--) = ${idParamModel};
    `;
  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function loginModel(emailModel, passwordModel) {
  console.log(
    "ACCESSING (--FILENAME--) MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function loginModel(): ",
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
    "ACCESSING (--FILENAME--) MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function signupModel():",
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

function publishModel(contentModel, idParamModel) {
  console.log(
    "ACCESSING (--FILENAME--) MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function publishModel(): ",
    contentModel,
    idParamModel
  );
  const dbQuery = `
        INSERT INTO (--TABLE--) ((--contentColumn--), (--fkColumn)) VALUES 
            ('${contentModel}', ${idParamModel});
    `;
  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function editModel(newContentModel, idParamModel) {
  console.log(
    "ACCESSING (--FILENAME--) MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function editModel(): ",
    newContentModel,
    idParamModel
  );
  const dbQuery = `
        UPDATE (--TABLE--) SET (--column1--) = '${newContentModel}' 
            WHERE (--idColumn--) = ${idParamModel};
    `;
  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function removeModel(idParamModel) {
  console.log(
    "ACCESSING (--FILENAME--) MODEL! \n \n\t\t >> If 'Error: connect ECONNREFUSED',\n \t\t >> verify database credentials\n \t\t >> also verify if database server is running properly! \n\n function removeModel():",
    idParamModel
  );
  const dbQuery = `
        DELETE FROM (--TABLE--) 
            WHERE (--idColumn--) = ${idParamModel};
    `;
  console.log("Executing SQL query: \n" + dbQuery);
  return database.executeQuery(dbQuery);
}

function latestModel(idParamModel, linesModel) {
  dbQuery = "";

  if (process.env.ENV == "production") {
    dbQuery = `
        SELECT TOP ${linesModel} 
            (--column1--), (--column2), (--dateColumn--), 
                CONVERT(VARCHAR, (--dateColumn--), 108) AS dateColumnFormatted 
                    FROM (--TABLE--) 
                        WHERE (--fkColumn--) = ${idParamModel} 
                            ORDER BY (--idColumn--) DESC;
    `;
  } else if (process.env.ENV == "development") {
    dbQuery = `
        SELECT 
            (--column1--), (--column2), (--dateColumn--), 
                DATE_FORMAT((--dateColumn--),'%H:%i:%s') AS dateColumnFormatted 
                    FROM (--TABLE--) 
                      WHERE (--fkColumn--) = ${idParamModel} 
                            ORDER BY (--idColumn--) DESC LIMIT ${linesModel};
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

function realTimeModel(idParamModel) {
  dbQuery = "";

  if (process.env.ENV == "production") {
    dbQuery = `
        SELECT TOP 1 
            (--column1--), (--column2--), (--fkColumn--), (--dateColumn), 
                CONVERT(VARCHAR, dateColumn, 108) AS dateColumnFormatted, 
                    FROM (--TABLE--) 
                        WHERE (--fkColumn--) = ${idParamModel} 
                            ORDER BY (--idColumn--) DESC;
    `;
  } else if (process.env.ENV == "development") {
    dbQuery = `
        SELECT (--column1--), (--column2--), (--fkColumn--), (--dateColumn), 
            DATE_FORMAT(dateColumn,'%H:%i:%s') AS dateColumnFormatted, 
                FROM (--TABLE--) 
                    WHERE (--fkColumn--) = ${idParamModel} 
                        ORDER BY (--idColumn--) DESC LIMIT 1;
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
  listModel,
  listByIdModel,
  loginModel,
  signupModel,
  publishModel,
  editModel,
  removeModel,
  latestModel,
  realTimeModel,
};
