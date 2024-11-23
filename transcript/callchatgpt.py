from dotenv import load_dotenv
import os
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

texts = {
    "Nom et prénom": "Tu m'as demander mon nom, je croyais que tu voulais savoir d'ou je venais mais bon tempis. Je m'appel Jean Michel. Dis moi Jane de quel couleur sont tes yeux ?",
    "Intention de l'entrepreneur": "J'ai longement hesiter a continuer sur mon chemin. finalement je vais céder mon entreprise car je n'ai plus suffisement de fonds pour la faire tourner. Si je continue, je risque la fahite. Mieux vaut m'arreter avant qu'il ne soit trop tard.",
    "Status de l'entreprise": "Je ne sais pas quel status choisir pour mon entreprise."
}

def extract_information(text, field_name):
    prompt = f"""
    Voici un texte non structuré :
    {text}

    Ignore les informations superflues et extrais uniquement les informations nécessaires pour remplir le champ suivant (ne me donne que la reponse) : {field_name}.
    """
    response = llm.invoke(prompt)
    return response.strip()

results = {}
for field, text in texts.items():
    results[field] = extract_information(text, field)

for field, value in results.items():
    print(f"Champ '{field}': {value}")
