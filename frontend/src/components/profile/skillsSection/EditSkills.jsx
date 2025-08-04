import { useEffect, useState } from "react";
import { CirclePlus } from "lucide-react";

const EditSkills = ({ onClose, onSave, skillToEdit }) => {
  const [skillInput, setSkillInput] = useState("");
  const [formData, setFormData] = useState(
    () =>
      skillToEdit || {
        category: "",
        skills: [],
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
      [name]: value,
    }));
  };

  const handleAddSkill = () => {
    const newSkill = skillInput.trim();
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.category && formData.skills.length > 0) {
      onSave(formData);
    } else {
      alert("Please enter a category and at least one skill.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-slate-950 p-6 rounded-xl border border-amber-700 shadow-lg transition-all">
        <h2 className="text-2xl font-bold text-amber-300 mb-4">
          {skillToEdit ? "Edit Skill Category" : "Add Skill Category"}
        </h2>
        <hr className="text-amber-700 mb-3" />

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-amber-300">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 rounded-md bg-slate-900 border border-amber-700 text-amber-300 focus:border-purple-600 focus:border-2 transition duration-200 text-sm outline-none"
              placeholder="e.g. Frontend, Backend, Tools"
            />
          </div>

          <div>
            <label className="text-sm text-amber-300">Skills</label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="e.g. React"
                className="flex-1 px-3 py-2 rounded-md bg-slate-900 border border-amber-700 text-slate-300 focus:border-purple-600 focus:border-2 transition duration-200 text-sm outline-none"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="p-2 text-amber-400 hover:text-amber-200 shadow-md hover:scale-105 transition duration-200"
                title="Add Skill"
              >
                <CirclePlus size={24} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skills.map((skill, idx) => (
                <span
                  key={idx}
                  onClick={() => handleRemoveSkill(skill)}
                  className="bg-amber-700/70 text-xs px-2 py-1 rounded-full text-white hover:bg-red-900 hover:text-red-400 cursor-pointer hover:line-through"
                >
                  {skill}
                </span>
              ))}
            </div>
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

export default EditSkills;
