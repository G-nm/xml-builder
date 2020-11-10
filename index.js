//101833 Mwaniki George Ng'ang'a - ICS 4A

const mysql = require("mysql2");
const fs = require("fs");
const { create } = require("xmlbuilder2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "e1f",
  password: "P4m6BUJRFN6LK5y",
});

connection.connect((error) => {
  if (error) {
    console.log(error);
  }
  console.log(`connected`);
});

// check if database is present
let name = '"students"';
let sql = `SHOW DATABASES like ${name}`;
connection.query(sql, (error, result) => {
  if (error) {
    console.log(error);
  }
  // removing quotes from databse name
  let nameString = name.replace(/['"]+/g, "");
  // if there is a databse by the name students
  if (result[0]) {
    connection.query(`USE ${nameString}`, (error, result) => {
      if (error) {
        console.log(error);
      }
    });

    selectstudents();
  } else {
    createdatabse(nameString);
  }
});

// create databse if none
function createdatabse(nameString) {
  let sql = "CREATE DATABASE " + nameString;
  connection.execute(sql, (error, result) => {
    if (error) {
      console.log(error);
    }

    connection.query(`USE ${nameString}`, (error, result) => {
      if (error) {
        console.log(error);
      }
    });

    let createtablesql =
      "CREATE TABLE students_table (student_name varchar(1000),student_grade varchar(3)) ";
    connection.execute(createtablesql, (error, response) => {
      if (error) {
        console.log(error);
      }
    });
    insertintotable();
    selectstudents();
  });
}

// Inserts initial records
function insertintotable() {
  let names = ["George Mwaniki", "John Doe", "Lisa Doe"];
  let grades = ["A", "B+", "A+"];

  for (let index = 0; index < names.length; index++) {
    let insertsql = `INSERT INTO students_table VALUES(?,?)`;
    connection.execute(
      insertsql,
      [names[index], grades[index]],
      (error, result) => {
        if (error) {
          console.log(error);
        }
      }
    );
  }
}

// select database if present
function selectstudents() {
  connection.execute(
    "SELECT student_name,student_grade FROM `students_table`",
    (error, results) => {
      if (error) {
        console.log(error);
      }

      // Working well
      const users = create().ele("users");

      results.forEach((value, index) => {
        console.log(value.student_name);
        const student = users.ele("student");
        const name = student.ele("name");
        const grade = student.ele("grade");
        name.txt(value.student_name);
        grade.txt(value.student_grade);
      });

      const xml = users.end({ prettyPrint: true });
      console.log(xml);
      // Create xml file
      fs.writeFile("./students.xml", xml, () => {
        console.log("file created");
      });
    }
  );
}

function closeconnection() {
  connection.end((error) => {
    if (error) {
      console.log(error);
    }
    console.log(`disconnected`);
  });
}
