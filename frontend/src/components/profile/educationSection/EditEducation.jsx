import { useState, useEffect } from "react";

const EditEducation = ({ onClose, onSave, educationToEdit }) => {
  const [formData, setFormData] = useState(
    () =>
      educationToEdit || {
        degree: "",
        institution: "",
        startYear: "",
        endYear: "",
        grade: "",
      }
  );

  // Effect to prevent background scrolling when the modal is open
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-slate-950 p-6 rounded-xl border border-amber-700 shadow-lg transition-all">
        <h2 className="text-2xl font-bold text-amber-300 mb-4">
          {educationToEdit ? "Edit Education" : "Add Education"}
        </h2>

        <hr className="text-amber-700 mb-3" />

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Degree Field */}
          <div>
            <label className="block mb-1 text-sm font-medium text-amber-300">
              Degree
            </label>
            <input
              type="text"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-amber-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 transition duration-200 text-sm"
              placeholder="e.g. B.Tech in Computer Science"
              required
            />
          </div>

          {/* Institution Field */}
          <div>
            <label className="block mb-1 text-sm font-medium text-amber-300">
              Institution
            </label>
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-200 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 transition duration-200 text-sm"
              placeholder="e.g. Indian Institute of Technology, Bombay"
              required
            />
          </div>

          {/* Start and End Year */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-amber-300">
                Start Year
              </label>
              <input
                type="text"
                name="startYear"
                value={formData.startYear}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-400 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 transition duration-200 text-sm"
                placeholder="e.g. 2020"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-amber-300">
                End Year
              </label>
              <input
                type="text"
                name="endYear"
                value={formData.endYear}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-400 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 transition duration-200 text-sm"
                placeholder="e.g. 2024"
                required
              />
            </div>
          </div>

          {/* Grade Field */}
          <div>
            <label className="block mb-1 text-sm font-medium text-amber-300">
              Grade (Optional)
            </label>
            <input
              type="text"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-400 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 transition duration-200 text-sm"
              placeholder="e.g. 8.5 CGPA"
            />
          </div>

          {/* Action Buttons */}
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

export default EditEducation;
