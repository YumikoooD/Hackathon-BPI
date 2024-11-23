// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

// Generic function to parse and display JSON data
function parseAndDisplayData(data, containerId) {
	const container = document.getElementById(containerId);
	container.innerHTML = Object.keys(data)
		.map(key => `<p><strong>${capitalizeFirstLetter(key)} :</strong> ${data[key]}</p>`)
		.join('');
}

// Fetch the JSON file and display its contents
function loadAndDisplayJSON() {
	fetch('finalData.json')
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			// Display entrepreneur data
			if (data.entrepreneur) {
				parseAndDisplayData(data.entrepreneur, 'entrepreneur');
			}

			// Display entreprise data
			if (data.entreprise) {
				parseAndDisplayData(data.entreprise, 'entreprise');
			}
		})
		.catch(error => {
			console.error('Erreur lors du chargement du fichier JSON :', error);
		});
}

// Call the function to load and display JSON
document.addEventListener('DOMContentLoaded', loadAndDisplayJSON);
