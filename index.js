var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

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
  inquirer.prompt([
    {
      type: "rawlist",
      name: "addOrViewOrUpdate",
      choices: [
        "Add departments, roles, or employees",
        "View departments, roles, or employees",
        "Update employee roles",
      ],
      message: "What would you like to do today?"
    },
  ]).then(function(response){
      if(response.addOrViewOrUpdate === "Add departments, roles, or employees"){
        addToDB();
      } else if(response.addOrViewOrUpdate === "View departments, roles, or employees"){
        viewDB();
      }else{
        updateEmployeeRoles();
      };
  });
};

function addToDB(){
    inquirer
    .prompt([
        {
            type: "rawlist",
            name: "deptOrRoleOrEmployee",
            choices: ["department", "role", "employee"],
            message: "What would you like to add to the database?"
        }
    ]).then(function(response){
        if(response.deptOrRoleOrEmployee === "department"){
            addDepartment();
        } else if(response.deptOrRoleOrEmployee === "role"){
            addRole();
        } else{
            addEmployee();
        }
    })
};

function addDepartment(){
    console.log("Adding department!")
};
function addRole(){
    console.log("Adding a role!")
};
function addEmployee(){
    console.log("Adding an employee!")
};

function viewDB(){
    inquirer
    .prompt([
        {
            type: "rawlist",
            name: "deptOrRoleOrEmployee",
            choices: ["departments", "roles", "employees"],
            message: "Would you like to view departments, roles, or employees?"
        }
    ]).then(function(response){
        if(response.deptOrRoleOrEmployee === "departments"){
            viewDepartments();
        }else if(response.deptOrRoleOrEmployee === "roles"){
            viewRoles();
        } else{
            viewEmployees();
        };
    });
};

function viewDepartments(){
    console.log("viewing departments!");
};
function viewRoles(){
    console.log("Viewing roles!");
};
function viewEmployees(){
    console.log("Viewing employees!");
};

function updateEmployeeRoles(){
    console.log("Updating employee roles!");
}