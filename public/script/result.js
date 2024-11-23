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

// Function to load JSON data from localStorage and display it
function loadAndDisplayFromLocalStorage() {
	try {
		// Get JSON from localStorage
		const rawData = sessionStorage.getItem('chatGPTResult');
		if (!rawData) {
			throw new Error('No data found in localStorage.');
		}

		// Parse JSON
		console.log(rawData);
		const data = JSON.parse(rawData);

		// Display entrepreneur data
		if (data.entrepreneur) {
			parseAndDisplayData(data.entrepreneur, 'entrepreneur');
		}

		// Display entreprise data
		if (data.entreprise) {
			parseAndDisplayData(data.entreprise, 'entreprise');
		}
	} catch (error) {
		console.error('Erreur lors du chargement des données depuis localStorage :', error);
	}
}

// Call the function to load and display JSON
document.addEventListener('DOMContentLoaded', loadAndDisplayFromLocalStorage);
