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
  const pythonScript = "python3 ./cgi-bin/callchatgpt.py"; // Replace 'script.py' with your Python script path

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

app.get("/run-chatgpt", async (req, res) => {
  try {
    const openAiUrl = "https://apiv2.cloud.bpifrance.fr/prd/mta/hackathon/llm";
    const openAiApiKey = "sk-uZfC_9RKabzEeHo1XthBtg"; // Replace securely

    const requestBody = {
        model: "gpt-4",
        messages: [
            { role: "system", content: "You are an assistant that extracts structured data from discussions." },
            { role: "user", content: req.body.promptInput },
        ],
        temperature: 0.5,
    };

    const response = await fetch(openAiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openAiApiKey}`,
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    res.send(JSON.parse(data.choices[0].message.content)); // Return structured JSON
  } catch (error) {
      console.error("Error in API call:", error);
      return null;
  }
})

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
