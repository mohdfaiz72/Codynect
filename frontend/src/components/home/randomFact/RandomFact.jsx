import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RotateCcw } from "lucide-react";
import { BASE_URL } from "../../../utils/constants";
import { setFact } from "../../../store/factSlice";

const RandomFact = () => {
  const dispatch = useDispatch();
  const fact = useSelector((store) => store.fact.fact);
  const [loading, setLoading] = useState(false);

  const fetchFact = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/ai/random-fact`, {
        withCredentials: true,
      });
      dispatch(setFact(res.data));
    } catch (err) {
      dispatch(setFact(null));
      console.error(
        "Failed to generate fact: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!fact) fetchFact();
  }, []);

  return (
    <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 p-4 rounded-lg border border-amber-700 shadow-xl mb-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-amber-400">
          🤖 Did You Know?
        </h3>
        <button
          onClick={fetchFact}
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
        <p className="text-slate-400 text-sm">Generating the fact...</p>
      ) : fact ? (
        <div>
          <p className="text-slate-200 text-sm mt-1 leading-relaxed">
            {fact.content}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {fact.category?.map((tag, i) => (
              <span
                key={i}
                className="bg-slate-800 text-xs text-amber-300 px-2 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm text-slate-400 italic">
          Even I need a break sometimes...
        </p>
      )}
    </div>
  );
};

export default RandomFact;
