import axios from "axios";

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent`;

export const callGemini = async (prompt) => {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const message = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return message?.trim();
  } catch (err) {
    console.error("Gemini API error:", err?.response?.data || err.message);
    throw new Error("Failed to call Gemini API");
  }
};
