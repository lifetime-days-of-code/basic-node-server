const fs = require("fs");
const path = require("path");

const express = require("express");
const { kill } = require("process");

const app = express();

//! NOTE--1.0 middleware is a function that runs between express seeing that request and our code handling that request

//! NOTE--1.1 `urlencoded` will set up a body parser(incoming request data parser) will look to all incoming requests and if they carry on data (thats what urlencoded will look for) it will parse that data and turn it into js object
app.use(express.urlencoded({ extended: false }));

app.get("/currenttime", (req, res) => {
  res.send(`<h1>${new Date().toISOString()}</h2>`);
}); // localhost:3000/currenttime

app.get("/", (req, res) => {
  res.send(`
  <form action="/store-user" method="POST">
    <label for="username">Your name:</label>
    <input type="text" id="username" name="username">
    <button>Submit</button>
  </form>`);
}); // localhost:3000

app.post("/store-user", function (req, res) {
  const userName = req.body.username;

  //!!! we should use absolute path

  //!NOTE-2.0 __dirname is a special globally available variable exposed by Node js.Holds the absolute path to this directory

  // constructs the path
  const filePath = path.join(__dirname, "data", "users.json");

  //raw data read from that file. It will be the file content interpreted as text. In order to work with it we need to transform it.

  /*! NOTE--2.1 
  JSON helper object:
    parse -> translate text to js object or array
    stringify -> translate to plain text
  */
  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);

  existingUsers.push(userName);

  // writeFileSync will perform the operation instantly
  // filePath tells where the file in which we will write is
  fs.writeFileSync(filePath, JSON.stringify(existingUsers));
  /*
  NOTE-2.2 steps: 
  const filePath = path.join(__dirname, "data", "users.json");
  -first we need to read that file so we can extract existing data out of it. 

  -Then we need to add the username to that existing data 
  - then we need to write that updated data back to the file.
  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);
  existingUsers.push(userName);
  fs.writeFileSync(filePath, JSON.stringify(existingUsers));
  */
  res.send("<h1>Username stored</h1>");
});

app.get("/users", (req, res) => {
  //read the data and translate it from raw text to js array
  // send back a response with that data
  //! not the best practice.(copy/paste repeated code) We can create a function and reuse it.
  const filePath = path.join(__dirname, "data", "users.json");
  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);

  let responseData = "<ul>";
  for (const user of existingUsers) {
    responseData += "<li>" + user + "</li>";
  }
  responseData += "</ul>";

  res.send(responseData);
});

app.listen(3000);
