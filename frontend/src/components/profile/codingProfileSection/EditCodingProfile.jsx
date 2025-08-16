import { useState, useEffect } from "react";

const StarInput = ({ value, onChange, max = 7 }) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, idx) => {
        const starNumber = idx + 1;
        return (
          <button
            type="button"
            key={idx}
            className={`text-amber-400 text-xl transition-transform ${
              starNumber <= value ? "scale-110" : "text-slate-600"
            }`}
            onClick={() => onChange(starNumber)}
          >
            ★
          </button>
        );
      })}
    </div>
  );
};

const EditCodingProfile = ({ onClose, onSave, codingProfileToEdit }) => {
  const [formData, setFormData] = useState(
    () =>
      codingProfileToEdit || {
        currentTitle: "",
        maxTitle: "",
        currentRating: 0,
        maxRating: 0,
        solvedCount: 0,
        link: "",
      }
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name.includes("Rating") || name === "solvedCount"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      id: codingProfileToEdit._id,
      currentTitle: "★".repeat(formData.currentTitle),
      maxTitle: "★".repeat(formData.maxTitle),
    };

    onSave(payload);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-slate-950 p-6 rounded-xl border border-amber-700 shadow-lg transition-all">
        <h2 className="text-2xl font-bold text-amber-300 mb-4">
          Edit Coding Profile
        </h2>
        <hr className="text-amber-700 mb-3" />

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Title */}
          <div className="flex items-center gap-2">
            <label className="text-sm mr-5 font-medium text-amber-300 whitespace-nowrap">
              Current Title:
            </label>
            <StarInput
              value={formData.currentTitle}
              onChange={(val) =>
                setFormData({ ...formData, currentTitle: val })
              }
            />
          </div>

          {/* Max Title */}
          <div className="flex items-center gap-2">
            <label className="text-sm mr-10 font-medium text-amber-300 whitespace-nowrap">
              Max Title:
            </label>
            <StarInput
              value={formData.maxTitle}
              onChange={(val) => setFormData({ ...formData, maxTitle: val })}
            />
          </div>

          {/* Current Rating */}
          <div>
            <label className="block mb-1 text-sm font-medium text-amber-300">
              Current Rating
            </label>
            <input
              type="number"
              name="currentRating"
              value={formData.currentRating}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-900 text-amber-300 rounded-md border border-amber-700 outline-none focus:border-purple-600 transition text-sm"
              placeholder="e.g. 1450"
            />
          </div>

          {/* Max Rating */}
          <div>
            <label className="block mb-1 text-sm font-medium text-amber-300">
              Max Rating
            </label>
            <input
              type="number"
              name="maxRating"
              value={formData.maxRating}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-900 text-amber-300 rounded-md border border-amber-700 outline-none focus:border-purple-600 transition text-sm"
              placeholder="e.g. 1900"
            />
          </div>

          {/* Solved Count */}
          <div>
            <label className="block mb-1 text-sm font-medium text-amber-300">
              Solved Count
            </label>
            <input
              type="number"
              name="solvedCount"
              value={formData.solvedCount}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-900 text-amber-300 rounded-md border border-amber-700 outline-none focus:border-purple-600 transition text-sm"
              placeholder="e.g. 500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-sm font-semibold border border-amber-600 text-amber-300 hover:bg-slate-800 transition duration-200 hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full font-semibold text-sm text-slate-900 bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 hover:from-amber-800 hover:to-amber-700 shadow-md hover:scale-105 transition duration-200"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCodingProfile;
