import express from "express";
import mysql2 from "mysql2";
import bcrpt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import crypto, { hash } from "crypto";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";
import nodemailer from "nodemailer";
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
  database: "career_campus",
});
//users
app.post("/login", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body)
  if (!username || !email || !password)
    return res.status(404).json({ message: "there is no user infor" });

  const sql = `SELECT * FROM Users WHERE email = ?`;
  db.query(sql, [email], async (error, result) => {
    if(error) return res.status(400).json({ message: "nothing happened",error });
    console.log("here is your result", result.length)
    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrpt.compare(password, result[0].password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid  password" });
    }
   
    const { password:  hashedPassword, ...userData } = result[0];
    res.status(200).json({
      message: "Login successful",
      result: userData,
    });
  });
});

app.post("/signin", async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email)return res.status(401).json({ message: "no password or email, name" });
  const hashpassword = await bcrpt.hash(password, 10);
  console.log(hashpassword);
   
  const sql = `INSERT INTO Users(username, email, password, role) VALUES (?, ?, ?, ?)`;

  db.query(sql, [username, email, hashpassword, role], (error, result) => {
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
app.get("/questionsAnswers", (req, res) => {
  const sql = `
    SELECT 
      Question.questionID, 
      Question.text AS questionText, 
      Option.optionID, 
      Option.text AS optionText
    FROM Question
    JOIN Option ON Question.questionID = Option.questionID;
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching questions", error: err });

    // Group options under each question
    const grouped = {};
    results.forEach((row) => {
      if (!grouped[row.questionID]) {
        grouped[row.questionID] = {
          questionID: row.questionID,
          question: row.questionText,
          options: []
        };
      }
      grouped[row.questionID].options.push({ optionID: row.optionID, text: row.optionText });
    });

    const formatted = Object.values(grouped);
    res.json(formatted);
  });
});

app.post("/submitAnswers", async (req, res) => {
  const { answers } = req.body;
  if (!Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ message: "No answers provided" });
  }

  // Get all questionIDs and optionIDs
  const questionIDs = answers.map(a => a.questionID);
  const optionIDs = answers.map(a => a.optionID);

  // Fetch question texts
  const qSql = `SELECT questionID, text FROM Question WHERE questionID IN (?)`;
  db.query(qSql, [questionIDs], (qErr, qResults) => {
    if (qErr) return res.status(500).json({ message: "Error fetching questions", error: qErr });

    // Fetch option texts
    const oSql = `SELECT optionID, text FROM Option WHERE optionID IN (?)`;
    db.query(oSql, [optionIDs], async (oErr, oResults) => {
      if (oErr) return res.status(500).json({ message: "Error fetching options", error: oErr });

      // Build readable answers
      const questionMap = Object.fromEntries(qResults.map(q => [q.questionID, q.text]));
      const optionMap = Object.fromEntries(oResults.map(o => [o.optionID, o.text]));

      const readableAnswers = answers.map(a => ({
        question: questionMap[a.questionID],
        answer: optionMap[a.optionID]
      }));

      // Build prompt for Gemini
      const prompt = readableAnswers.map((qa, idx) =>
        `Q${idx + 1}: ${qa.question}\nA${idx + 1}: ${qa.answer}`
      ).join('\n\n');

      // Call Gemini
      try {
        const geminiRes = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: `Based on the user's answers and suggest a suitable career path :\n\n${prompt} make sure it is short and simple answer and explain why you chose this career path an dont show the answers and question the user selected.`
        });
        // You may need to adjust how you extract the text from geminiRes
        res.json({
          message: "Analysis complete",
          analysis: geminiRes.text || geminiRes.result || geminiRes,
          readableAnswers
        });
      } catch (aiErr) {
        res.status(500).json({ message: "Error analyzing with Gemini", error: aiErr });
      }
    });
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
app.post("/feedback", async (req, res) => {
  try {
    const { name, email, phone, message, address } = req.body;
    if (!name || !email) {
      return res.status(404).json({ message: "not able to get name and email" });
    }

    const geminiRes = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Based on the user's feedback:\n\n${message}\n\nTell them we will work on their issue shortly.`
    });

    // Extract the text from the Gemini response
    let analysis = "";
    if (
      geminiRes &&
      geminiRes.candidates &&
      geminiRes.candidates[0] &&
      geminiRes.candidates[0].content &&
      geminiRes.candidates[0].content.parts &&
      geminiRes.candidates[0].content.parts[0] &&
      geminiRes.candidates[0].content.parts[0].text
    ) {
      analysis = geminiRes.candidates[0].content.parts[0].text;
    } else {
      analysis = JSON.stringify(geminiRes); // fallback for debugging
    }
    res.status(200).json({message:"you will receive an email shortly"});

    // --- Send email to the user ---
    // Configure your email transport (use your real credentials)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mwambajason2@gmail.com", // replace with your email
        pass: "fbrn ilom zpnm ddcu"    
      }
    });

    const mailOptions = {
      from: "mwambajason2@gmail.com", // sender address
      to: email,                   // user's email
      subject: "Your Feedback Analysis",
      text: `Hello ${name},\n\nThank you for your feedback!\n\nHere is our response:\n${analysis}\n\nBest regards,\nCareer Campus Team`
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Respond to frontend
    return res.json({
      message: "Feedback received, analyzed, and emailed.",
      analysis
    });
  } catch (error) {
    return res.status(500).json({ message: "server not working", error });
  }
});

//answers


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
        userName VARCHAR(250), email VARCHAR(250) UNIQUE, password VARCHAR(250), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
  const sql = `CREATE TABLE IF NOT EXISTS Suggestion(suggestionID INT AUTO_INCREMENT PRIMARY KEY, 
        userID INT NOT NULL, text VARCHAR(500),created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         FOREIGN KEY(userID) REFERENCES Users(userID))`;
  db.query(sql, (error, result) => {
    if (error)
      return console.error("not able to create Suggestion table", error);
    console.log("Suggestion table has been created");
  });
});

const data=[
  {
    question: "What activity do you enjoy the most?",
    options: [
      { text: "Solving puzzles or building things", "type": "A" },
      { text: "Helping others and caring for their needs", "type": "B" },
      { text: "Leading a team or organizing events", "type": "C" },
      { text: "Drawing, writing, or creating music", "type": "D" }
    ]
  },
  {
    question: "Which subject did you enjoy most in school?",
    options: [
      { text: "Math or Science", type: "A" },
      { text: "Biology or Social Studies", type: "B" },
      { text: "Business or Economics", type: "C" },
      { text: "Literature or Art", type: "D" }
    ]
  },
  {
    question: "What kind of work environment do you prefer?",
    options: [
      { text: "Quiet and focused, working on computers or data", type: "A" },
      { text: "Busy and people-focused, like hospitals or schools", type: "B" },
      { text: "Fast-paced and dynamic, like offices or startups", type: "C" },
      { text: "Open and expressive, like studios or stages", type: "D" }
    ]
  },
  {
    question: "How do you usually solve problems?",
    options: [
      { text: "Analyze it logically and find a technical solution", type: "A" },
      { text: "Talk it through and offer emotional support", type: "B" },
      { text: "Find a practical and efficient way to get it done", type: "C" },
      { text: "Think creatively and explore different ideas", type: "D" }
    ]
  },
  {
    question: "What motivates you the most?",
    options: [
      { text: "Creating innovative solutions or new technology"},
      { text: "Making a difference in someone’s life"},
      { text: "Achieving goals and gaining recognition" },
      { text: "Expressing yourself and inspiring others" }
    ]
  },
  {
    question: "If you could choose a weekend project, which one would it be?",
    options: [
      { text: "Building a website or repairing electronics" },
      { text: "Volunteering at a clinic or teaching kids" },
      { text: "Starting an online store or planning an event" },
      { text: "Painting a mural or writing a short story" }
    ]
  },
  {
    question: "How do you feel about working with technology?",
    options: [
      { text: "I love it—I enjoy programming, gadgets, or systems" },
      { text: "I use it when needed, mostly for communication or records" },
      { text: "I use it for business, marketing, or organization"},
      { text: "I use it to design, edit, or share creative work" }
    ]
  },
  {
    question: "Which task sounds most enjoyable to you?",
    options: [
      { text: "Writing code to solve a complex problem"},
      { text: "Talking to someone to understand their feelings" },
      { text: "Pitching an idea to potential clients" },
      { text: "Shooting or editing a creative video" }
    ]
  },
  {
    question: "What role do you usually take in group projects?",
    options: [
      { text: "The planner or technical contributor" },
      { text: "The communicator and team support" },
      { text: "The leader or decision-maker"},
      { text: "The idea generator or designer" }
    ]
  },
  {
    question: "What type of success matters most to you?",
    options: [
      { text: "Building something useful and functional" },
      { text: "Positively impacting someone’s life" },
      { text: "Reaching high positions or financial goals" },
      { text: "Being recognized for creative expression" }
    ]
  },
  {
    "question": "How do you approach learning something new?",
    "options": [
      { text: "Research deeply and test it logically", type: "A" },
      { text: "Learn from experience or asking others", type: "B" },
      { text: "Take the quickest route to apply it", type: "C" },
      { text: "Explore different methods and styles", type: "D" }
    ]
  },
  {
    question: "Which of these would you rather do on your day off?",
    options: [
      { text: "Tinker with gadgets or build a model" },
      { text: "Visit someone and talk about life"},
      { text: "Work on a side hustle or plan a trip" },
      { text: "Take photos or write poetry" }
    ]
  },
  {
    question: "What do people often compliment you for?",
    options: [
      { text: "Being smart or good at solving problems" },
      { text: "Being kind and a good listener" },
      { text: "Being ambitious and driven" },
      { text: "Being imaginative or expressive" }
    ]
  },
  {
    question: "What kind of job title sounds most exciting to you?",
    options: [
      { text: "Software Engineer or Data Analyst" },
      { text: "Nurse or Social Worker" },
      { text: "Project Manager or Entrepreneur" },
      { text: "Graphic Designer or Film Director" }
    ]
  },
  {
    question: "What type of tasks do you avoid the most?",
    options: [
      { text: "Speaking in front of big crowds" },
      { text: "Working with machines or tech" },
      { text: "Long, repetitive tasks with no results" },
      { text: "Strict procedures or rules" }
    ]
  },
  {
    question: "What kind of impact do you want to have on the world?",
    options: [
      { text: "Solve real-world problems using technology",  },
      { text: "Improve lives and communities" },
      { text: "Drive innovation and grow businesses" },
      { text: "Inspire people through creativity" }
    ]
  }
]
function InsertData() {
  data.forEach((item) => {
    const checkQuestionSql = `SELECT questionID FROM Question WHERE text = ?`;
    db.query(checkQuestionSql, [item.question], (err, questionResults) => {
      if (err) return console.error("Error checking question", err);

      if (questionResults.length > 0) {
        // Question already exists, skip insertion
        console.log("Question already exists, skipping:", item.question);
        return;
      }

      // Insert new question
      const insertQuestionSql = `INSERT INTO Question(text) VALUES (?)`;
      db.query(insertQuestionSql, [item.question], (error, result) => {
        if (error) return console.error("Not able to insert question", error);
        console.log("Question inserted:", item.question);
        const questionID = result.insertId;

        // Insert options for the new question
        item.options.forEach((option) => {
          const insertOptionSql = `INSERT INTO Option(text, questionID) VALUES (?, ?)`;
          db.query(insertOptionSql, [option.text, questionID], (optionErr) => {
            if (optionErr) return console.error("Not able to insert option", optionErr);
            console.log("Option inserted:", option.text);
          });
        });
      });
    });
  });
}


InsertData();
// db.connect(()=>{
//     const sql = `DROP TABLE Suggestion`
//     db.query(sql, (error, result)=>{
//         if(error)return console.log("error not deleted")
//         console.log(" here is yoyr table", result)
//     })
// })
// db.connect(()=>{
//     const sql = `ALTER TABLE Users ADD COLUMN  UNIQUE (email)`
//     db.query(sql, (error,result)=>{
//         if(error) return console.error("not able to create Suggestion table", error)
//         console.log("Suggestion table has been created")
//     })
// })

