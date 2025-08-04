import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { BASE_URL } from "../../../utils/constants";

const TrendingNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/external/tech-news`);
      if (!res.ok) throw new Error("Failed to fetch news");
      const data = await res.json();
      setNews(data.articles || []);
    } catch (err) {
      console.error("Error fetching tech news:", err);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 p-4 rounded-lg border border-amber-700 shadow-xl mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-amber-400">
          🔥 Trending Tech News
        </h3>
        <button
          onClick={fetchNews}
          disabled={loading}
          title="Refresh"
          className={`text-amber-400 hover:text-amber-200 transition ${
            loading ? "animate-spin cursor-wait" : ""
          }`}
        >
          <RotateCcw size={18} />
        </button>
      </div>
      {loading ? (
        <p className="text-slate-400 text-sm">Loading news...</p>
      ) : news.length ? (
        <div className="space-y-4">
          {news.map((item, index) => (
            <a
              key={item.id || index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 border border-amber-700 hover:border-purple-600 rounded-md shadow-md p-4 transition duration-200"
            >
              {/* Image */}
              {item.image && (
                <img
                  src={
                    item.image ||
                    "https://via.placeholder.com/80x80?text=No+Image"
                  }
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg border border-slate-700 shadow-sm"
                />
              )}

              {/* Text */}
              <div className="flex flex-col justify-between w-full">
                <div>
                  <h4 className="text-base font-semibold text-slate-100 group-hover:text-white line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="text-[11px] text-slate-500 mt-2 flex flex-wrap gap-1">
                  <span>📰 {item.source_name || "Unknown"}</span>
                  <span>🕒 {new Date(item.publishedAt).toLocaleString()}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="text-sm text-slate-400 italic">
          Server didn't cooperate today...
        </div>
      )}
    </div>
  );
};

export default TrendingNews;
