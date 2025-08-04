import { callGemini } from "../services/gemini.service.js";

// --------- Fact Controller ---------
export const getRandomFact = async (req, res) => {
  const prompt = `Provide a short, interesting, or fun fact for developers related to programming, computer science, or technology history.
Respond ONLY in this strict JSON format:
{
  "content": "The interesting fact goes here. For example: The first computer 'bug' was a real moth stuck in a relay.",
  "category": ["tag1", "tag2", "tag3"]
}`;

  try {
    const message = await callGemini(prompt);

    if (!message) {
      return res.status(500).json({ error: "No response from Gemini." });
    }

    try {
      const cleaned = message.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);

      if (!parsed?.content || !Array.isArray(parsed?.category)) {
        return res.status(500).json({ error: "Malformed fact from Gemini." });
      }

      return res.json(parsed);
    } catch {
      return res.json({ content: message, category: ["General"] });
    }
  } catch {
    return res.status(500).json({ error: "AI failed to generate fact." });
  }
};

// --------- Enhance About Controller ---------
export const enhanceAbout = async (req, res) => {
  const { about } = req.body;

  if (!about || about.trim() === "") {
    return res.status(400).json({ error: "About content is required." });
  }

  const prompt = `Improve and rewrite the following 'About Me' section to make it sound professional, engaging, and developer-oriented:\n\n"${about}"`;

  try {
    const message = await callGemini(prompt);
    return res.json({ enhanced: message });
  } catch {
    return res.status(500).json({ error: "Failed to enhance content." });
  }
};
