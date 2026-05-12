const express = require("express");
const path = require("path");
const elements = require("./public/data/element.json");
const app = express();

// STATIC FILES ARE SUCCESSFULLY SERVED
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/quiz", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "quiz.html"));
});

app.get("/table", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "table.html"));
});

app.get("/chart", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "chart.html"));
});

// JSON IS CONNECTED WITH THE BACKEND
app.get("/elements", (req, res) => {
  res.json(elements);
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
