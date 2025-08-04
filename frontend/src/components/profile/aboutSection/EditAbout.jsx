import { useEffect, useState } from "react";

const EditAbout = ({ aboutToEdit, onClose, onSave }) => {
  const [formData, setFormData] = useState(() => aboutToEdit || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-slate-950 p-6 rounded-xl border border-amber-700 shadow-lg transition-all">
        <h2 className="text-2xl font-bold text-amber-300 mb-4">Edit About</h2>
        <hr className="text-amber-700 mb-3" />

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* About Textarea */}
          <div>
            <label className="block mb-1 text-sm font-medium text-amber-300">
              About You
            </label>
            <textarea
              value={formData}
              onChange={(e) => setFormData(e.target.value)}
              rows={8}
              placeholder="Tell us about yourself..."
              className="w-full p-3 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-200 placeholder-amber-400 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 transition-colors duration-200 text-sm"
            />
          </div>

          {/* Enhance Button */}
          <div className="flex justify-start">
            <button
              type="button"
              // onClick={handleEnhance}
              className="px-4 py-2 rounded-full text-sm font-semibold bg-purple-800/70 text-slate-200 hover:bg-purple-800 shadow-md transition hover:scale-105 disabled:opacity-50"
            >
              ✨ Enhance with AI
            </button>
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAbout;
