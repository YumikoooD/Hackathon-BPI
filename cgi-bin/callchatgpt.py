import os
import cgi
import json
#from selenium import webdriver
from dotenv import load_dotenv
from langchain_openai import OpenAI  # type: ignore
from httpx import Client, AsyncClient

load_dotenv()
LLM_KEY = os.getenv("LLM_KEY")
LLM_URL = os.getenv("LLM_URL")
MODEL_CHAT = os.getenv("MODEL_CHAT")

llm = OpenAI(
    http_client=Client(http2=True, verify=False),
    http_async_client=AsyncClient(http2=True, verify=False),
    openai_api_base=LLM_URL,
    openai_api_key=LLM_KEY,
    model=MODEL_CHAT,
)

def extract_information(data):
    '''prompt = f"""
    Voici un texte non structuré contenant plusieurs informations :
    {data}

    Ignore les informations superflues et extrais uniquement les informations nécessaires pour remplir les champs suivants :
    - Nom et prénom : Nom de la personne.
    - Intention de l'entrepreneur : Intention de l'entrepreneur (par exemple, gestion, création, cession ou reprise).
    - Status de l'entreprise : Status de l'entreprise.

    Fournis une réponse sous forme de JSON, avec un champ correspondant à chaque clé demandée.
    """'''

    prompt = f"""Voici une discussion longue et non structurée entre un chargé d'affaires BPI nommé Sofia et un entrepreneur. Cette discussion contient des informations importantes sur le profil de l'entrepreneur et son entreprise. Ignore les informations superflues, répétées ou non pertinentes, et extrais uniquement les informations nécessaires pour compléter les champs suivants dans un fichier JSON structuré.

    Le JSON doit être divisé en deux blocs :
    1. `entrepreneur` : Inclure uniquement les données pertinentes au profil personnel de l'entrepreneur.
    2. `entreprise` : Inclure uniquement les données pertinentes à l'entreprise.

    Les champs à extraire doivent inclure (mais ne sont pas limités à) :
    - **Pour le bloc `entrepreneur`** :
    - `nom` : Nom complet de l'entrepreneur.
    - `age` : Âge de l'entrepreneur (si mentionné ou déductible).
    - `intention` : Intention de l'entrepreneur (ex. gestion, création, cession, reprise, etc.).
    - `expertise` : Expertise ou secteur de compétence de l'entrepreneur.
    - `biographie` : Une brève description de l'entrepreneur, basée sur les informations données.

    - **Pour le bloc `entreprise`** :
    - `nom` : Nom de l'entreprise.
    - `secteur` : Secteur d'activité principal de l'entreprise.
    - `status` : Statut actuel de l'entreprise (par ex. active, en démarrage, en cessation, etc.).
    - `fondation` : Année de fondation de l'entreprise (si mentionnée).
    - `description` : Une brève description de l'entreprise, ses activités principales ou sa mission.

    Fournis le résultat final sous forme de JSON structuré, trié par ordre d'importance :

    Exemple attendu :
    {
    "entrepreneur": {
        "nom": "Jean Dupont",
        "age": 45,
        "intention": "Création",
        "expertise": "Technologie de l'information",
        "biographie": "Jean est un entrepreneur innovant dans le secteur des logiciels."
    },
    "entreprise": {
        "nom": "TechVision",
        "secteur": "Logiciels d'entreprise",
        "status": "Active",
        "fondation": 2010,
        "description": "TechVision développe des solutions logicielles pour les entreprises modernes."
    }
    }

    Si une information n’est pas disponible ou déductible, laisse le champ vide ou ne l’inclus pas dans la réponse.

    Texte de la discussion :
    {data}
    """

    response = llm.invoke(prompt)
    print(response)
    try:
        return json.loads(response)
    except json.JSONDecodeError:
        print("Erreur : Impossible de convertir la réponse en JSON.")
        print("Réponse brute :", response)
        return {}


def handle_transcript():

    driver = webdriver.Chrome()
    driver.get("http://localhost:4242")
    data = driver.execute_script("return window.localStorage.getItem('data');")

    if not data:
        print("Error: LocalStorage is empty.")
    else:
        extracted_data = extract_information(data)

        with open("finalData.json", "w", encoding="utf-8") as f:
            json.dump(extracted_data, f, ensure_ascii=False, indent=4)

        for field, value in extracted_data.items():
            print(f"Champ '{field}': {value}")


def handle_cgi_request():
    # Parse CGI form data
    form = cgi.FieldStorage()

    # Get the 'data' field from the form
    data = form.getvalue('data')

    if not data:
        print("Content-Type: application/json\n")
        print(json.dumps({"error": "No data received"}))
        return

    # Process the extracted data
    extracted_data = extract_information(data)

    # Save the extracted data to a JSON file
    with open("finalData.json", "w", encoding="utf-8") as f:
        json.dump(extracted_data, f, ensure_ascii=False, indent=4)

    # Send the extracted data back to the client
    print("Content-Type: application/json\n")
    print(json.dumps(extracted_data))

handle_cgi_request()
