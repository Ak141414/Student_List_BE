import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { connection } from "./db";
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3002;

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/students", (req: Request, res: Response) => {
  connection.query("select * from student", (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

app.post("/student", (req: Request, res: Response) => {
  const studentDetails = req.body;
  connection.query("INSERT INTO student SET ?", studentDetails, (err, rows) => {
    if (err) throw err;
    res.send("Student added successfully!");
  });
});

app.put("/student/:id", (req: Request, res: Response) => {
  const studentDetails = req.body;
  const studentId = req.params.id;
  connection.query(
    "UPDATE student SET ? WHERE stu_id = ?",
    [studentDetails, studentId],
    (err) => {
      if (err) throw err;
      res.send("Student updated successfully!");
    }
  );
});

app.delete("/student/:id", (req: Request, res: Response) => {
  const studentId = req.params.id;
  connection.query("DELETE FROM student WHERE stu_id = ?", studentId, (err) => {
    if (err) throw err;
    res.send("Student deleted successfully!");
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
