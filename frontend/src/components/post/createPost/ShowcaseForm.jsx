import { useState } from "react";
import { CirclePlus } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";

const ShowcaseForm = () => {
  const [techInput, setTechInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    techStack: [],
    duration: "",
    link: "",
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const resetForm = () => {
    setFormData({
      projectName: "",
      description: "",
      techStack: [],
      duration: "",
      link: "",
      tags: "",
    });
    setTechInput("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.projectName.trim() || !formData.description.trim()) return;

    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    try {
      setLoading(true);

      const payload = {
        ...formData,
        techStack: formData.techStack,
        tags: tagsArray,
      };

      const res = await axios.post(`${BASE_URL}/v1/post/showcase`, payload, {
        withCredentials: true,
      });
      console.log("Showcase posted:", res.data);
      resetForm();
    } catch (error) {
      console.error("Error posting showcase:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl bg-slate-950 p-6 rounded-xl border border-amber-700 shadow-lg">
      <h2 className="text-2xl font-bold text-amber-300 mb-4">
        Showcase Your Work
      </h2>
      <hr className="text-amber-700 mb-3" />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Project Name */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            💡 Project Name
          </label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            placeholder="Project Name"
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            📝 Description
          </label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your project..."
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm resize-none"
            required
          />
        </div>

        {/* Tech Stack */}
        <div>
          <label className="text-sm font-medium text-amber-300">
            🛠️ Tech Stack
          </label>
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

        {/* Duration */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            ⏳ Duration
          </label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="1st July 2025 - 15th Aug 2025"
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
          />
        </div>

        {/* Project Link */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            🔗 Project Link
          </label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://github.com/username/project"
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-blue-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            🏷 Tags (comma separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="OpenSource, React, FullStack"
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-amber-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 rounded-full text-sm font-semibold border border-amber-600 text-amber-300 hover:bg-slate-800 transition duration-200 hover:scale-105"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-full font-semibold text-sm text-slate-900 bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 shadow-md hover:scale-105 transition duration-200 ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:from-amber-800 hover:to-amber-700"
            }`}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShowcaseForm;
