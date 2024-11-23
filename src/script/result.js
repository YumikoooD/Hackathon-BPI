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

// Injecter les données directement
const entrepreneurDiv = document.getElementById('entrepreneur');
const entrepriseDiv = document.getElementById('entreprise');

entrepreneurDiv.innerHTML = `
	<p><strong>Nom :</strong> ${data.entrepreneur.nom}</p>
	<p><strong>Âge :</strong> ${data.entrepreneur.age}</p>
	<p><strong>Expertise :</strong> ${data.entrepreneur.expertise}</p>
	<p><strong>Biographie :</strong> ${data.entrepreneur.biographie}</p>
`;

entrepriseDiv.innerHTML = `
	<p><strong>Nom :</strong> ${data.entreprise.nom}</p>
	<p><strong>Secteur :</strong> ${data.entreprise.secteur}</p>
	<p><strong>Fondation :</strong> ${data.entreprise.fondation}</p>
	<p><strong>Description :</strong> ${data.entreprise.description}</p>
`;
