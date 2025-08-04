import { useEffect, useState } from "react";
import { CirclePlus } from "lucide-react";

const EditProject = ({ onClose, onSave, projectToEdit }) => {
  const [techInput, setTechInput] = useState("");
  const [formData, setFormData] = useState(
    () =>
      projectToEdit || {
        title: "",
        description: "",
        techStack: [],
        github: "",
        demo: "",
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

  const handleAddTech = () => {
    if (techInput && !formData.techStack.includes(techInput)) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, techInput],
      }));
      setTechInput("");
    }
  };

  const handleRemoveTech = (tech) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((t) => t !== tech),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-slate-950 p-6 rounded-xl border border-amber-700 shadow-lg">
        <h2 className="text-2xl font-bold text-amber-300 mb-4">
          {projectToEdit ? "Edit Project" : "Add Project"}
        </h2>
        <hr className="text-amber-700 mb-3" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-amber-300">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. AI-Powered Chatbot"
              className="w-full px-3 py-2 rounded-md bg-slate-900 border border-amber-700 text-slate-300 focus:border-purple-600 focus:border-2 transition duration-200 text-sm outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm text-amber-300">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of your project, key features, and purpose..."
              rows={4}
              className="w-full px-3 py-2 rounded-md bg-slate-900 border border-amber-700 text-slate-300 focus:border-purple-600 focus:border-2 transition duration-200 text-sm outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm text-amber-300">Tech Stack</label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="e.g. React"
                className="flex-1 px-3 py-2 rounded-md bg-slate-900 border border-amber-700 text-slate-300 focus:border-purple-600 focus:border-2 transition duration-200 text-sm outline-none"
              />

              <button
                type="button"
                onClick={handleAddTech}
                className="p-2 text-amber-400 hover:text-amber-200 shadow-md hover:scale-105 transition duration-200"
                title="Add Tech Stack"
              >
                <CirclePlus size={24} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  onClick={() => handleRemoveTech(tech)}
                  className="bg-amber-700/70 text-xs px-2 py-1 rounded-full text-white cursor-pointer hover:line-through"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-amber-300">GitHub Link</label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="e.g. https://github.com/username/project"
              className="w-full px-3 py-2 rounded-md bg-slate-900 border border-amber-700 text-slate-300 focus:border-purple-600 focus:border-2 transition duration-200 text-sm outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-amber-300">Live Demo Link</label>
            <input
              type="url"
              name="demo"
              value={formData.demo}
              onChange={handleChange}
              placeholder="e.g. https://yourproject.live"
              className="w-full px-3 py-2 rounded-md bg-slate-900 border border-amber-700 text-slate-300 focus:border-purple-600 focus:border-2 transition duration-200 text-sm outline-none"
            />
          </div>

          <div className="flex justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-sm font-semibold border border-amber-600 text-amber-300 hover:bg-slate-800 duration-200 hover:scale-105 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full text-sm font-semibold text-slate-900 bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 hover:from-amber-800 hover:to-amber-700 shadow-md hover:scale-105 transition duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProject;
