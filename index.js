var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");
var Employee = require("./class/employee");
var Role = require("./class/role");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "employee_tracker_db",
});

connection.connect(function (err) {
  if (err) throw err;
  begin();
});

function begin() {
  inquirer
    .prompt([
      {
        type: "rawlist",
        name: "addOrViewOrUpdate",
        choices: [
          "Add departments, roles, or employees",
          "View departments, roles, or employees",
          "Update employee roles",
          "Quit this application",
        ],
        message: "What would you like to do today?",
      },
    ])
    .then(function (response) {
      if (
        response.addOrViewOrUpdate === "Add departments, roles, or employees"
      ) {
        addToDB();
      } else if (
        response.addOrViewOrUpdate === "View departments, roles, or employees"
      ) {
        viewDB();
      } else if (response.addOrViewOrUpdate === "Update employee roles") {
        updateEmployeeRoles();
      } else {
        connection.end();
      }
    });
}

function addToDB() {
  inquirer
    .prompt([
      {
        type: "rawlist",
        name: "deptOrRoleOrEmployee",
        choices: ["department", "role", "employee"],
        message: "What would you like to add to the database?",
      },
    ])
    .then(function (response) {
      if (response.deptOrRoleOrEmployee === "department") {
        addDepartment();
      } else if (response.deptOrRoleOrEmployee === "role") {
        inquireRole();
      } else {
        addEmployee();
      }
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "deptName",
        message: "What is the name of the department you would like to add?",
      },
    ])
    .then(function (response) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: response.deptName,
        },
        function (err, res) {
          console.log("Added a new department!");
          begin();
        }
      );
    });
}
function inquireRole() {
  console.log("Adding a role!");
  var deptArray = [];
  var query = "SELECT name FROM department;";
  connection.query(query, function (err, res) {
    res.forEach((element) => {
      deptArray.push(element.name);
    });
    inquirer
      .prompt([
        {
          type: "rawlist",
          name: "deptName",
          message: "What department will this new role be inside of?",
          choices: deptArray,
        },
        {
          type: "input",
          name: "roleTitle",
          message: "What is the title of this new role?",
        },
        {
          type: "input",
          name: "salary",
          message:
            "What is the salary for the new role? Please type numbers only.",
        },
      ])
      .then(function (response) {
        connection.query(
          "SELECT id FROM employee_tracker_db.department WHERE name = ?;",
          response.deptName,
          function (err, res) {
            var deptID = res[0].id;
            var role = new Role(response.roleTitle, response.salary, deptID);
            addRole(role);
          }
        );
      });
  });
}

function addRole(object) {
  connection.query("INSERT INTO role SET ?", object, function (err, res) {
    console.log("Added a new role!");
    begin();
  });
}

function addEmployee() {
  console.log("Adding an employee!");
  var roleArray = [];
  var query = "SELECT title FROM role;";
  connection.query(query, function (err, res) {
    res.forEach((element) => {
      roleArray.push(element.title);
    });
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is the new employee's first name?",
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the employee's last name?",
        },
        {
          type: "rawlist",
          name: "role",
          message: "What role does this employee have?",
          choices: roleArray,
        },
      ])
      .then(function (response) {
        connection.query(
          "SELECT id FROM employee_tracker_db.role WHERE title = ?;",
          response.role,
          function (err, res) {
            var roleID = res[0].id;
            var employee = new Employee(
              response.firstName,
              response.lastName,
              roleID
            );
            console.log(employee);
          }
        );
      });
  });
}

function viewDB() {
  inquirer
    .prompt([
      {
        type: "rawlist",
        name: "deptOrRoleOrEmployee",
        choices: ["departments", "roles", "employees"],
        message: "Would you like to view departments, roles, or employees?",
      },
    ])
    .then(function (response) {
      if (response.deptOrRoleOrEmployee === "departments") {
        viewDepartments();
      } else if (response.deptOrRoleOrEmployee === "roles") {
        viewRoles();
      } else {
        viewEmployees();
      }
    });
}

function viewDepartments() {
  console.log("viewing departments!");
  var query = "SELECT * FROM department;";
  connection.query(query, function (err, res) {
    console.table(res);
    begin();
  });
}
function viewRoles() {
  console.log("Viewing roles!");
  var query = "SELECT * FROM role;";
  connection.query(query, function (err, res) {
    console.table(res);
    begin();
  });
}
function viewEmployees() {
  console.log("Viewing employees!");
  var query = "SELECT * FROM employee;";
  connection.query(query, function (err, res) {
    console.table(res);
    begin();
  });
}

function updateEmployeeRoles() {
  console.log("Updating employee roles!");
}
