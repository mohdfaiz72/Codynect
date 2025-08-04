import axios from "axios";

// --------- Tech News Service ---------
export const fetchTechNews = async () => {
  const apikey = process.env.NEWSDATA_API_KEY;
  const url = `https://newsdata.io/api/1/news?apikey=${apikey}&category=technology&language=en`;

  const response = await axios.get(url);
  const articles = response.data?.results || [];

  return articles.map((article) => ({
    id: article.id,
    title: article.title,
    link: article.link,
    description: article.description,
    content: article.content,
    image: article.image_url,
    publishedAt: article.pubDate,
    source_id: article.source_id,
    source_name: article.source_name,
  }));
};

// --------- Contests Service ---------
export const fetchContests = async () => {
  const USERNAME = "mohdfaiz9335";
  const today = new Date();
  const to = new Date();
  to.setDate(to.getDate() + 30);

  const url = `https://clist.by/api/v3/contest/?start__gt=${today.toISOString()}&start__lt=${to.toISOString()}&order_by=start&username=${USERNAME}&api_key=${
    process.env.CONTESTS_API_KEY
  }`;

  const response = await axios.get(url);
  return response.data.objects;
};
