import { useState } from "react";

const AchievementForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    image: "",
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert tags from comma-separated string to array
    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    onSubmit?.({
      ...formData,
      tags: tagsArray,
      date: formData.date || new Date().toISOString(),
    });

    // Reset form
    setFormData({
      title: "",
      description: "",
      date: "",
      image: "",
      tags: "",
    });
  };

  return (
    <div className="w-full max-w-3xl bg-slate-950 p-6 rounded-xl border border-amber-700 shadow-lg">
      <h2 className="text-2xl font-bold text-amber-300 mb-4">
        Celebrate an Achievement
      </h2>
      <hr className="border-amber-700 mb-3" />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            🏆 Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Achievement Title"
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
            placeholder="Describe your achievement..."
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm resize-none"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            📅 Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            🖼 Image URL
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
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
            placeholder="DP, Combinatorics, Math"
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
          />
        </div>

        {/* Action Button */}
        <div className="flex justify-center gap-3 mt-6">
          <button
            type="submit"
            className="px-6 py-2 rounded-full font-semibold text-sm text-slate-900 bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 hover:from-amber-800 hover:to-amber-700 shadow-md hover:scale-105 transition duration-200"
          >
            Add Achievement
          </button>
        </div>
      </form>
    </div>
  );
};

export default AchievementForm;
