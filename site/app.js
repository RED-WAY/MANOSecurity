// CHOOSE ENVIRONMENT
// process.env.ENV = "development";
process.env.ENV = "production";

const express = require("express");
const cors = require("cors");
const path = require("path");
const PORT = process.env.ENV == "development" ? 3333 : 8080;

const app = express();

const indexRouter = require("./src/routes/index");
const userRouter = require("./src/routes/users");
const machineRouter = require("./src/routes/machine");
const familyRouter = require("./src/routes/family");
const accessRouter = require("./src/routes/access");
const dashRouter = require("./src/routes/dash");
// ADD ROUTES HERE

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/machine", machineRouter);
app.use("/family", familyRouter);
app.use("/access", accessRouter);
app.use("/dash", dashRouter);

// ADD ROUTES HERE TOO

console.clear();
app.listen(PORT, function () {
  console.log(`Server running at: http://localhost:${PORT} \n
    Application at ${process.env.ENV} process mode \n
    \t\tIf "development" => connected to local database (MySQL - Workbench). \n
    \t\tIf "production" => connected to remote database (SQL Server - Azure) \n
    \t\t\tTo SWITCH ENVIRONMENT, comment or uncomment the first 2 lines at: app.js`);
});
