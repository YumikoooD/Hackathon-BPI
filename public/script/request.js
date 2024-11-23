// js/api.js

export async function callChatGPT(prompt) {
    try {
        const openAiUrl = "https://api.openai.com/v1/chat/completions";
        const openAiApiKey = "your_openai_api_key"; // Replace securely

        const requestBody = {
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are an assistant that extracts structured data from discussions." },
                { role: "user", content: prompt },
            ],
            temperature: 0.5,
        };

        const response = await fetch(openAiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${openAiApiKey}`,
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return JSON.parse(data.choices[0].message.content); // Return structured JSON
    } catch (error) {
        console.error("Error in API call:", error);
        return null;
    }
}
