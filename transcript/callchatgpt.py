import os
import json
from selenium import webdriver
from dotenv import load_dotenv
from langchain_openai import OpenAI  # type: ignore
from httpx import Client, AsyncClient
from selenium import webdriver

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

handle_transcript()