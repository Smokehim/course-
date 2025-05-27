import express from "express";
import mysql2 from "mysql2";
import bcrpt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import crypto, { hash } from "crypto";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 1000;
app.listen(port, (result, error) => {
  if (error) return console.log("not able to connect to port");
  console.log("port connected");
});

const ai = new GoogleGenAI({
  apiKey: "AIzaSyC7HxWo_6sW8UuP2DcRr4VvUvCuVVkznMo",
});
const userInput =
  "I am interested in technology and enjoy problem-solving. I also like working with people and have good communication skills. What career path should I consider?";

const db = mysql2.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "careercampus",
});
//users
app.post("/login", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(404).json({ message: "there is no user infor" });

  const sql = `SELECT * FROM Users WHERE email = ?`;
  db.query(sql, [email], async (error, result) => {
    if (error)
      return res
        .status(404)
        .json({ message: "not able to insert users", error });
    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the user exists
    // Compare the provided password with the hashed password in the database
    // use proper variable name to easily convey meaning or what code is doing. its a good practice
    // Uncomment the following lines if you want to use bcrypt for password hashing
    
    const isMatch = await bcrpt.compare(password, result[0].password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
   

    // If the password matches, return the user data (excluding the password)
    // It's a good practice to exclude sensitive information like passwords from the response
    const { password: password, ...userData } = result[0];
    res.status(200).json({
      message: "Login successful",
      result: userData,
    });
  });
});

app.post("/signin", async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email)
    return res.status(401).json({ message: "no password or email, name" });
  const sql = `INSERT INTO Users(username, email, password, role) VALUES (?, ?, ?, ?)`;

  db.query(sql, [username, email, password, role], (error, result) => {
    if (error)
      return res
        .status(404)
        .json({ message: "not able to insert users", error });
    if (!result.affectedRows)
      return res.status(404).json({ message: "not affectedrows", affectrows });
    res.status(200).json({ message: "users have been insert", result });
  });
});

app.put("/putusers/:id", (req, res) => {
  const { username, email, password, role, userID } = req.body;
  if (!userID)
    return res.status(404).json({ message: "not able to get userID" });
  const sql = `UPDATE Users SET username=  COALESCE (?, username), email=COALESCE (?, email), password=COALESCE (?, password), role=COALESCE (?, role) WHERE userID=?`;
  db.query(sql, [username, email, password, role, userID], (error, result) => {
    if (error)
      return res
        .status(404)
        .json({ message: "not able to update users", error });
    if (!result.affectedRows)
      return res.status(400).json({ message: "no rows affected" });
    res.status(200).json({ message: "users have been updated", result });
  });
});
app.get("/getusers", (req, res) => {
  const sql = `SELECT * FROM Users`;

  db.query(sql, (error, result) => {
    if (error)
      return res.status(404).json({ message: "not able to get users", error });
    res.status(200).json({ message: "users have been get", result });
  });
});
app.get("/getusers/:id", (req, res) => {
  const id = req.body.userID;
  if (!id) return res.status(404).json({ message: "not able to get userID" });
  const sql = `SELECT * FROM Users WHERE userID=?`;
  db.query(sql, [id], (error, result) => {
    if (error)
      return res.status(404).json({ message: "not able to get users", error });
    console.log("Requested userID:", id);
    console.log("Query result:", result);

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found", result });
    }

    res.status(200).json({ message: "here is your users", result });
  });
});
app.delete("/deleteusers/:id", (req, res) => {
  const id = req.body.userID;
  if (!id) return res.status(404).json({ message: "not able to get userID" });
  const sql = `DELETE FROM Users WHERE userID=?`;
  db.query(sql, [id], (error, result) => {
    if (error)
      return res
        .status(404)
        .json({ message: "not able to delete users", error });
    console.log("Requested userID:", id);
    console.log("Query result:", result);

    if (result.length === 0) {
      return res.status(404).json({ message: "User not delete", result });
    }

    res.status(200).json({ message: "here is your deleted use ", result });
  });
});
//question
app.post("/postquestion", (req, res) => {
  const { text } = req.body;
  const sql = `INSERT INTO Question(text) VALUES ( ?)`;

  db.query(sql, [text], (error, result) => {
    if (error)
      return res
        .status(404)
        .json({ message: "not able to insert question", error });
    res.status(200).json({ message: "question have been insert", result });
  });
});
app.put("/putquestion/:id", (req, res) => {
  const { text, questionID } = req.body;
  if (!questionID)
    return res.status(404).json({ message: "not able to get questionID" });
  const sql = `UPDATE Question SET text=  COALESCE (?, text) WHERE questionID=?`;
  db.query(sql, [text, questionID], (error, result) => {
    if (error)
      return res
        .status(404)
        .json({ message: "not able to update question", error });
    res.status(200).json({ message: "question have been updated", result });
  });
});
app.get("/getquestion", (req, res) => {
  const sql = `SELECT * FROM Question`;
  db.query(sql, (error, result) => {
    if (error)
      return res
        .status(404)
        .json({ message: "not able to get question", error });
    res.status(200).json({ message: "question have been get", result });
  });
});
app.get("/getquestion/:id", (req, res) => {
  const id = req.body.questionID;
  if (!id)
    return res.status(404).json({ message: "not able to get questionID" });
  const sql = `SELECT * FROM Question WHERE questionID=?`;
  db.query(sql, [id], (error, result) => {
    if (error)
      return res
        .status(404)
        .json({ message: "not able to get question", error });
    console.log("Requested question:", id);
    console.log("Query result:", result);

    if (result.length === 0) {
      return res.status(404).json({ message: "question not found", result });
    }

    res.status(200).json({ message: "here is your users", result });
  });
});
app.delete("/deletequestion/:id", (req, res) => {
  const id = req.body.questionID;
  if (!id)
    return res.status(404).json({ message: "not able to get questionID" });
  const sql = `DELETE  FROM Question WHERE questionID=?`;
  db.query(sql, [id], (error, result) => {
    if (error)
      return res
        .status(404)
        .json({ message: "not able to DELETE question", error });
    console.log("Requested question:", id);
    console.log("Query result:", result);

    if (result.length === 0) {
      return res.status(404).json({ message: "question not found", result });
    }

    res.status(200).json({ message: "here is your users", result });
  });
});

//option
app.post("/postOption", (req, res) => {
  const { text, questionID } = req.body;
  if (!questionID || !text)
    return res.status(404).json({ message: "not able to get questionID" });
  const sql = `INSERT INTO Option(text, questionID) VALUES (?, ?)`;
  db.query(sql, [text, questionID], (error, result) => {
    if (error)
      return res
        .status(404)
        .json({ message: "not able to insert Option", error });
    if (!result.affectedRows)
      return res.status(400).json({ message: "no rows affected" });
    res.status(200).json({ message: "Option have been insert", result });
  });
});
app.put("/putOption/:id", (req, res) => {
  const { text, optionID } = req.body;
  if (!optionID)
    return res.status(404).json({ message: "not able to get OptionID" });
  const sql = `UPDATE Option SET text=  COALESCE (?, text) WHERE optionID=?`;
  db.query(sql, [text, optionID], (error, result) => {
    if (error)
      return res
        .status(404)
        .json({ message: "not able to update Option", error });
    if (!result.affectedRows)
      return res.status(400).json({ message: "no rows affected" });
    res.status(200).json({ message: "Option have been updated", result });
  });
});
app.get("/getOption", (req, res) => {
  const sql = `SELECT * FROM Option`;
  db.query(sql, (error, result) => {
    if (error)
      return res.status(404).json({ message: "not able to get Option", error });
    res.status(200).json({ message: "Option have been get", result });
  });
});
app.get("/getOption/:id", (req, res) => {
  const id = req.body.optionID;
  if (!id)
    return res.status(404).json({ message: "not able to get questionID" });
  const sql = `SELECT * FROM Option WHERE optionID=?`;
  db.query(sql, [id], (error, result) => {
    if (error)
      return res.status(404).json({ message: "not able to get Option", error });
    console.log("Requested Option:", id);
    console.log("Query result:", result);

    if (result.length === 0) {
      return res.status(404).json({ message: "Option not found", result });
    }

    res.status(200).json({ message: "here is your Option", result });
  });
});

app.delete("/deleteOption/:id", (req, res) => {
  const id = req.body.optionID;
  if (!id)
    return res.status(404).json({ message: "not able to get questionID" });
  const sql = `DELETE FROM Option WHERE optionID=?`;
  db.query(sql, [id], (error, result) => {
    if (error)
      return res.status(404).json({ message: "not able to get Option", error });
    console.log("Requested Option:", id);
    console.log("Query result:", result);

    if (result.length === 0) {
      return res.status(404).json({ message: "Option not found", result });
    }

    res.status(200).json({ message: "here is your deleted Option", result });
  });
});
//suggestion
app.post("/postSuggestion", async (req, res) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `You are a career guidance AI. Based on the user's interest, suggest the best suitable career path. User says: "${userInput}"`,
  });
  console.log(response.text);
  const { text, userID } = req.body;
  if (!userID || !text)
    return res
      .status(404)
      .json({ message: "not able to get questionID and text" });
  const sql2 = `SELECT * FROM Users  WHERE userID=?`;
  const sql = `INSERT INTO Suggestion(text, userID ) VALUES (?, ?)`;
  const values = [text, userID];
  db.query(sql, values, (error, result) => {
    if (error)
      return res
        .status(404)
        .json({ message: "not able to insert Suggestion", error });
    if (!result.affectedRows)
      return res.status(400).json({ message: "no rows affected" });
    res.status(200).json({ message: "Suggestion have been insert", result });
  });
});
app.put("/putSuggestion/:id", (req, res) => {
  const { text, suggestionID } = req.body;
  if (!suggestionID)
    return res.status(404).json({ message: "not able to get SuggestionID" });
  const sql = `UPDATE Suggestion SET text=  COALESCE (?, text) WHERE suggestionID=?`;
  db.query(sql, [text, suggestionID], (error, result) => {
    if (error)
      return res
        .status(404)
        .json({ message: "not able to update Suggestion", error });
    if (!result.affectedRows)
      return res.status(400).json({ message: "no rows affected" });
    res.status(200).json({ message: "Option have been updated", result });
  });
});
app.get("/getSuggestion", (req, res) => {
  const sql = `SELECT * FROM Suggestion`;
  db.query(sql, (error, result) => {
    if (error)
      return res
        .status(404)
        .json({ message: "not able to get Suggestion", error });
    res.status(200).json({ message: "Suggestion have been get", result });
  });
});
app.get("/getSuggestion/:id", (req, res) => {
  const id = req.body.suggestionID;
  if (!id)
    return res.status(404).json({ message: "not able to get suggestionID" });
  const sql = `SELECT * FROM Suggestion WHERE suggestionID=?`;
  db.query(sql, [id], (error, result) => {
    if (error)
      return res
        .status(404)
        .json({ message: "not able to getSuggestion", error });
    console.log("Requested Suggestion:", id);
    console.log("Query result:", result);

    if (result.length === 0) {
      return res.status(404).json({ message: "Suggestion not found", result });
    }

    res.status(200).json({ message: "here is your Suggestion", result });
  });
});

app.delete("/deleteSuggestion/:id", (req, res) => {
  const id = req.body.suggestionID;
  if (!id)
    return res.status(404).json({ message: "not able to get SuggestionID" });
  const sql = `DELETE FROM Suggestion WHERE suggestionID=?`;
  db.query(sql, [id], (error, result) => {
    if (error)
      return res
        .status(404)
        .json({ message: "not able to get Suggestion", error });
    console.log("RequestedSuggestion:", id);
    console.log("Query result:", result);

    if (result.length === 0) {
      return res.status(404).json({ message: "Suggestion not found", result });
    }

    res
      .status(200)
      .json({ message: "here is your deleted Suggestion", result });
  });
});
//answers

app.post("/postAnswers", async (req, res) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `You are a career guidance AI. Based on the user's interest, suggest the best suitable career path. User says: "${userInput}"`,
  });
  console.log(response.text);
  // const {usertext, userID} = req.body
  // if(!userID) return res.status(404).json({message:"not able to get questionID"})

  // const sql =`INSERT INTO Option(text, userID) VALUES ( ?)`
  // db.query(sql2,[text], (errors)=>{
  //     if(errors) return res.status(400).json({message: "no Answers found"})
  //     db.query(sql, [text], (error, result)=>{
  //         if(error) return res.status(404).json({message:"not able to insert Answers", error})
  //         if(!result.affectedRows) return res.status(400).json({message:"no rows affected"});
  //         res.status(200).json({message:"Answers have been insert", result})
  //     })

  // })
});

app.put("/putAnswers/:id", (req, res) => {
  const { text, answersID } = req.body;
  if (!answersID)
    return res.status(404).json({ message: "not able to get SuggestionID" });
  const sql = `UPDATE Answers SET text=  COALESCE (?, text), userID=  COALESCE (?, userID), optionID=  COALESCE (?, optionID),questionID=  COALESCE (?, questionID) WHERE suggestionID=?`;
  db.query(sql, [text, answersID], (error, result) => {
    if (error)
      return res
        .status(404)
        .json({ message: "not able to update Answers", error });
    if (!result.affectedRows)
      return res.status(400).json({ message: "no rows affected" });
    res.status(200).json({ message: "Option have been Answers", result });
  });
});
app.get("/getAnswers", (req, res) => {
  const sql = `SELECT * FROM Answers`;
  db.query(sql, (error, result) => {
    if (error)
      return res
        .status(404)
        .json({ message: "not able to get Answers", error });
    res.status(200).json({ message: "Answers have been get", result });
  });
});
app.get("/getSuggestion/:id", (req, res) => {
  const id = req.body.answersID;
  if (!id)
    return res.status(404).json({ message: "not able to get AnswersID" });
  const sql = `SELECT * FROM Answers WHERE answersID=?`;
  db.query(sql, [id], (error, result) => {
    if (error)
      return res
        .status(404)
        .json({ message: "not able to get Answers", error });
    console.log("Requested Answers", id);
    console.log("Query result:", result);

    if (result.length === 0) {
      return res.status(404).json({ message: "Answers not found", result });
    }

    res.status(200).json({ message: "here is your Answers", result });
  });
});

app.delete("/deleteAnswers/:id", (req, res) => {
  const id = req.body.answersID;
  if (!id)
    return res.status(404).json({ message: "not able to get SuggestionID" });
  const sql = `DELETE FROM Answers WHERE answersID=?`;
  db.query(sql, [id], (error, result) => {
    if (error)
      return res
        .status(404)
        .json({ message: "not able to delete Answers", error });
    console.log("RequestedSuggestion:", id);
    console.log("Query result:", result);

    if (result.length === 0) {
      return res.status(404).json({ message: "Answers not found", result });
    }

    res.status(200).json({ message: "here is your deleted Answers", result });
  });
});
db.connect((error) => {
  if (error) return console.log("not able to connect to databse");
  console.log("connected to database mysql");
  const sql = `CREATE DATABASE IF NOT EXISTS CareerCampus`;
  db.query(sql, (error, result) => {
    if (error) return console.error("not able to create a database");
    console.log("connected to database careercampus");
  });
});

db.connect(() => {
  const sql = `CREATE TABLE IF NOT EXISTS Users(userID INT AUTO_INCREMENT PRIMARY KEY, 
        userName VARCHAR(250), email VARCHAR(250), password VARCHAR(250), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         role ENUM('student', 'admin'))`;
  db.query(sql, (error, result) => {
    if (error) return console.error("not able to create user table", error);
    console.log("user table has been created");
  });
});
db.connect(() => {
  const sql = `CREATE TABLE IF NOT EXISTS Question(questionID INT AUTO_INCREMENT PRIMARY KEY, text VARCHAR(500))`;
  db.query(sql, (error, result) => {
    if (error) return console.error("not able to create question table", error);
    console.log("QUESTION table has been created");
  });
});
db.connect(() => {
  const sql = `CREATE TABLE IF NOT EXISTS Option(optionID INT AUTO_INCREMENT PRIMARY KEY, questionID INT NOT NULL, text VARCHAR(500), FOREIGN KEY(questionID) REFERENCES Question(questionID))`;
  db.query(sql, (error, result) => {
    if (error) return console.error("not able to create option table", error);
    console.log("option table has been created");
  });
});
db.connect(() => {
  const sql = `CREATE TABLE IF NOT EXISTS Answers(answersID INT AUTO_INCREMENT PRIMARY KEY, userID INT NOT NULL,optionID INT NOT NULL, questionID INT NOT NULL, text VARCHAR(500), FOREIGN KEY(questionID) REFERENCES Question(questionID), FOREIGN KEY(optionID) REFERENCES Option(optionID),
         FOREIGN KEY(userID) REFERENCES Users(userID))`;
  db.query(sql, (error, result) => {
    if (error) return console.error("not able to create answers table", error);
    console.log("answers table has been created");
  });
});
db.connect(() => {
  const sql = `CREATE TABLE IF NOT EXISTS Suggestion(suggestionID INT AUTO_INCREMENT PRIMARY KEY, 
        userID INT NOT NULL, text VARCHAR(500),created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         FOREIGN KEY(userID) REFERENCES Users(userID))`;
  db.query(sql, (error, result) => {
    if (error)
      return console.error("not able to create Suggestion table", error);
    console.log("Suggestion table has been created");
  });
});
// db.connect(()=>{
//     const sql = `DROP TABLE Suggestion`
//     db.query(sql, (error, result)=>{
//         if(error)return console.log("error not deleted")
//         console.log(" here is yoyr table", result)
//     })
// })
// db.connect(()=>{
//     const sql = `ALTER TABLE Suggestion ADD COLUMN userID INT NOT NULL`
//     db.query(sql, (error,result)=>{
//         if(error) return console.error("not able to create Suggestion table", error)
//         console.log("Suggestion table has been created")
//     })
// })
