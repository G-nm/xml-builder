//101833 Mwaniki George Ng'ang'a - ICS 4A

const mysql = require("mysql2");
const { create } = require("xmlbuilder2");
const fs = require("fs");

// database connection
let connection = mysql.createConnection({
  host: "localhost",
  user: "",
  password: "",
  database: "studentsdb",
});
// Connection to db
connection.connect((error) => {
  if (error) throw error;
  console.log("connected");
});

let sql = "SELECT * FROM `Students`";
connection.execute(sql, (err, results, fields) => {
  //   console.log(results[0].student_name);

  const users = create().ele("users");

  results.forEach((value, index) => {
    console.log(value.student_name);
    const name = users.ele("name");
    const grade = users.ele("grade");
    name.txt(value.student_name);
    grade.txt(value.student_grade);
  });

  const xml = users.end({ prettyPrint: true });
  console.log(xml);
  //   Create xml file
  fs.appendFile("./students.xml", xml, { encoding: "utf-8" }, () => {
    console.log("file created");
  });
});
