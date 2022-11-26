// CHOOSE ENVIRONMENT
// process.env.ENV = "development";
process.env.ENV = "production";

const express = require("express");
const cors = require("cors");
const path = require("path");
const PORT = process.env.ENV == "development" ? 1900 : 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

console.clear();
app.listen(PORT, function () {
  console.log(`Server running at: http://localhost:${PORT} \n
    Application at ${process.env.ENV} process mode \n
    \t\tIf "development" => connected to local database (MySQL - Workbench). \n
    \t\tIf "production" => connected to remote database (SQL Server - Azure) \n
    \t\t\tTo SWITCH ENVIRONMENT, comment or uncomment the first 2 lines at: app.js`);
});
