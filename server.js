// backend/server.js

const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const connectToDatabase = require("./db");

app.use(cors());
app.use(express.json());

connectToDatabase();

// Serve the React app's static files from the build directory
//app.use(express.static(path.join(__dirname, 'build')));

//Use the app in development mode
app.get("/", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.use("/patients", require("./routes/api"));
app.use("/login", require("./routes/post"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
