const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 4242;

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to execute the Python script
app.get('/run-script', (req, res) => {
	const pythonScript = path.join(__dirname, '/transcript/callchatgpt.py');

	// Execute the Python script
	exec(`python3 ${pythonScript}`, (error, stdout, stderr) => {
		if (error) {
			console.error(`Error executing Python script: ${error.message}`);
			return res.status(500).send('Error executing Python script.');
		}
		if (stderr) {
			console.error(`Python script error: ${stderr}`);
			return res.status(500).send('Python script error.');
		}

		console.log(`Python script output:\n${stdout}`);

		// Redirect to the result page
		res.redirect('./src/result.html');
	});
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
