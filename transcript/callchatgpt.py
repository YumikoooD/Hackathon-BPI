from dotenv import load_dotenv
import os
import json
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
    prompt = f"""
    Voici un texte non structuré contenant plusieurs informations :
    {data}

    Ignore les informations superflues et extrais uniquement les informations nécessaires pour remplir les champs suivants :
    - Nom et prénom : Nom de la personne.
    - Intention de l'entrepreneur : Intention de l'entrepreneur (par exemple, gestion, création, cession ou reprise).
    - Status de l'entreprise : Status de l'entreprise.

    Fournis une réponse sous forme de JSON, avec un champ correspondant à chaque clé demandée.
    """
    response = llm.invoke(prompt)
    try:
        return json.loads(response)
    except json.JSONDecodeError:
        print("Erreur : Impossible de convertir la réponse en JSON.")
        print("Réponse brute :", response)
        return {}

data = """
Tu m'as demander mon nom, je croyais que tu voulais savoir d'ou je venais mais bon tempis. Je m'appel Jean Michel. Dis moi Jane de quel couleur sont tes yeux ? J'ai longement hesiter a continuer sur mon chemin. finalement je vais céder mon entreprise car je n'ai plus suffisement de fonds pour la faire tourner. Si je continue, je risque la fahite. Mieux vaut m'arreter avant qu'il ne soit trop tard.Je ne sais pas quel status choisir pour mon entreprise.
"""

extracted_data = extract_information(data)

with open("dataset.json", "w", encoding="utf-8") as f:
    json.dump(extracted_data, f, ensure_ascii=False, indent=4)

for field, value in extracted_data.items():
    print(f"Champ '{field}': {value}")
