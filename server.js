// Import necessary modules
const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const app = express();
const PORT = 4242;

// Serve static files (CSS, JS, images, etc.) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle /run-python
app.get("/run-python", (req, res) => {
  // Command to run a Python script
  const pythonScript = "python3 ./transcript/callchatgpt.py"; // Replace 'script.py' with your Python script path

  exec(pythonScript, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error.message}`);
      return res.status(500).send(`Error: ${error.message}`);
    }

    if (stderr) {
      console.error(`Python script stderr: ${stderr}`);
      return res.status(500).send(`stderr: ${stderr}`);
    }

    console.log(`Python script stdout: ${stdout}`);
    res.send(`Python script output: ${stdout}`);
  });
});


app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "src", "index.html"));
});

app.get("/sofia", (req, res) => {
	res.sendFile(path.join(__dirname, "src", "sofia.html"));
});

app.get("/result", (req, res) => {
	res.sendFile(path.join(__dirname, "src", "result.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
