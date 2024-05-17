import express, { Request, Response } from "express";
import bodyParser from "body-parser";
const connection = require("./db");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3002;

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/students", async (req: Request, res: Response) => {
  try {
    const { rows } = await connection.query("select * from student");
    res.send(rows);
  } catch (err) {
    console.log("Error in fetching student data");
    throw err;
  }
});

app.post("/student", async (req: Request, res: Response) => {
  try {
    const studentDetails = req.body;
    await connection.query(
      `INSERT INTO student (name, email, phone, enroll_number, date_of_admission) VALUES ($1, $2, $3, $4, $5)`,
      [
        studentDetails.name,
        studentDetails.email,
        studentDetails.phone,
        studentDetails.enroll_number,
        studentDetails.date_of_admission,
      ]
    );
    res.send("Student added successfully!");
  } catch (err) {
    console.log("Error in adding student data");
    throw err;
  }
});

app.put("/student/:id", async (req: Request, res: Response) => {
  try {
    const studentDetails = req.body;
    const studentId = req.params.id;
    await connection.query(
      "UPDATE student SET name=$1, email=$2, phone=$3, enroll_number=$4, date_of_admission=$5 WHERE stu_id = $6",
      [
        [
          studentDetails.name,
          studentDetails.email,
          studentDetails.phone,
          studentDetails.enroll_number,
          studentDetails.date_of_admission,
          studentId,
        ],
      ]
    );
    res.send("Student updated successfully!");
  } catch (err) {
    console.log("Error in updating student data");
    throw err;
  }
});

app.delete("/student/:id", async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id;
    await connection.query("DELETE FROM student WHERE stu_id = $1", [
      studentId,
    ]);
    res.send("Student deleted successfully!");
  } catch (err) {
    console.log("Error in deleting student data");
    throw err;
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
