const mysql = require("mysql2");
const sql = require("mssql");

// SQL SERVER - AZURE (CLOUD)
const sqlServerConfig = {
  server: "NAME.database.windows.net",
  database: "DATABASE_NAME",
  user: "ADMIN-USER",
  password: "PASSWORD",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true,
  },
};

// MYSQL WORKBENCH (LOCAL)
const mySqlConfig = {
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
};

function executeQuery(modelQuery) {
  if (process.env.ENV == "production") {
    return new Promise(function (resolve, reject) {
      sql
        .connect(sqlServerConfig)
        .then(function () {
          return sql.query(modelQuery);
        })
        .then(function (results) {
          console.log(results);
          resolve(results.recordset);
        })
        .catch(function (error) {
          reject(error);
          console.log("ERROR: ", error);
        });
      sql.on("error", function (error) {
        return "SQL SERVER - AZURE ERROR: ", error;
      });
    });
  } else if (process.env.ENV == "development") {
    return new Promise(function (resolve, reject) {
      const connection = mysql.createConnection(mySqlConfig);
      connection.connect();
      connection.query(modelQuery, function (error, results) {
        connection.end();
        if (error) {
          reject(error);
        }
        console.log(results);
        resolve(results);
      });
      connection.on("error", function (error) {
        return "MySQL - WORKBENCH ERROR: ", error.sqlMessage;
      });
    });
  } else {
    return new Promise(function (resolve, reject) {
      console.log(
        "\nENVIRONMENT (development | production) WAS NOT DEFINED AT: app.js\n"
      );
      reject("ENVIRONMENT NOT CONFIGURED AT: app.js");
    });
  }
}

module.exports = {
  executeQuery,
};
