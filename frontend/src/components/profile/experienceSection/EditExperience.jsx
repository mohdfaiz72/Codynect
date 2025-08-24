import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const EditExperience = ({ onClose, onSave, experienceToEdit }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(
    () =>
      experienceToEdit || {
        role: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-slate-950 p-6 rounded-xl border border-amber-700 shadow-lg transition-all">
        <h2 className="text-2xl font-bold text-amber-300 mb-4">
          {experienceToEdit ? "Edit Experience" : "Add Experience"}
        </h2>
        <hr className="text-amber-700 mb-3" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-amber-300">
              Role
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-amber-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 transition duration-200 text-sm"
              placeholder="e.g. Frontend Developer"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-amber-300">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-200 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 transition duration-200 text-sm"
              placeholder="e.g. XYZ Corp"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-amber-300">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-400 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 transition duration-200 text-sm"
              placeholder="e.g. Remote or San Francisco"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-amber-300">
                Start Date
              </label>
              <input
                type="text"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-400 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 transition duration-200 text-sm"
                placeholder="e.g. Jan 2022"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-amber-300">
                End Date
              </label>
              <input
                type="text"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-400 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 transition duration-200 text-sm"
                placeholder="e.g. Present"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-amber-300">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 resize-none bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 transition duration-200 text-sm"
              placeholder="Describe your responsibilities and achievements"
            />
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

export default EditExperience;
