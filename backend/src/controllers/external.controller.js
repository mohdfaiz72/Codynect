import { fetchTechNews, fetchContests } from "../services/external.service.js";

// --------- Tech News Controller ---------
export const getTechNews = async (req, res) => {
  try {
    const articles = await fetchTechNews();

    if (!articles.length) {
      return res.status(500).json({ error: "Unable to fetch tech news." });
    }

    res.json({
      message: "Top tech news",
      articles,
    });
  } catch (error) {
    console.error("Error fetching tech news:", error.message);
    res.status(500).json({ error: "Failed to fetch tech news." });
  }
};

// --------- Contests Controller ---------
export const getContests = async (req, res) => {
  try {
    const contests = await fetchContests();
    res.json(contests);
  } catch (error) {
    console.error("Error fetching contests:", error.message);
    res.status(500).json({ error: "Failed to fetch contests" });
  }
};
