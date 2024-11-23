const data = {
	"entrepreneur": {
		"nom": "Jean Dupont",
		"age": 45,
		"expertise": "Technologie de l'information",
		"biographie": "Jean est un entrepreneur innovant dans le secteur des logiciels."
	},
	"entreprise": {
		"nom": "TechVision",
		"secteur": "Logiciels d'entreprise",
		"fondation": 2010,
		"description": "TechVision développe des solutions logicielles pour les entreprises modernes."
	}
};

// Generic function to parse and display JSON data
function parseAndDisplayData(data, containerId) {
	const container = document.getElementById(containerId);
	container.innerHTML = Object.keys(data)
		.map(key => `<p><strong>${capitalizeFirstLetter(key)} :</strong> ${data[key]}</p>`)
		.join('');
}

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

// Parse and display data for entrepreneur and entreprise
parseAndDisplayData(data.entrepreneur, 'entrepreneur');
parseAndDisplayData(data.entreprise, 'entreprise');
