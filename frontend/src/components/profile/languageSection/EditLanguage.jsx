import { useState, useEffect } from "react";

const levels = ["Beginner", "Intermediate", "Fluent", "Native"];

const EditLanguage = ({ onClose, onSave, languageToEdit }) => {
  const [formData, setFormData] = useState(
    () =>
      languageToEdit || {
        name: "",
        level: "Beginner",
      }
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-950 p-6 rounded-xl border border-amber-700 shadow-lg transition-all">
        <h2 className="text-2xl font-bold text-amber-300 mb-4">
          {languageToEdit ? "Edit Language" : "Add Language"}
        </h2>
        <hr className="text-amber-700 mb-3" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-amber-300">
              Language
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-white rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 transition duration-200 text-sm"
              placeholder="e.g. English"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-amber-300">
              Proficiency Level
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-900 text-amber-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 transition duration-200 text-sm"
            >
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>

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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLanguage;
