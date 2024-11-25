const data = {
    "entrepreneur": {
        "nom": "Nicolas",
        "statut": "Etudiant",
        "ville": "Orleans"
    },
    "entreprise": {
        "secteur": "Coiffure",
        "partenaires": "Mere"
    }
};
// Injecter les données directement
const entrepreneurDiv = document.getElementById('entrepreneur');
const entrepriseDiv = document.getElementById('entreprise');
entrepreneurDiv.innerHTML = `
    <p><strong>Nom :</strong> ${data.entrepreneur.nom}</p>
    <p><strong>Statut :</strong> ${data.entrepreneur.statut}</p>
    <p><strong>Ville :</strong> ${data.entrepreneur.ville}</p>
`;
entrepriseDiv.innerHTML = `
    <p><strong>Secteur :</strong> ${data.entreprise.secteur}</p>
    <p><strong>Partenaires :</strong> ${data.entreprise.partenaires}</p>
`;
