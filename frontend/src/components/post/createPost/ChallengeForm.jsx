import { useState } from "react";

const ChallengeForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    rewards: "",
    description: "",
    link: "",
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.startDate || !formData.endDate)
      return;

    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    onSubmit?.({
      ...formData,
      tags: tagsArray,
      createdAt: new Date().toISOString(),
    });

    // Reset form
    setFormData({
      title: "",
      startDate: "",
      endDate: "",
      rewards: "",
      description: "",
      link: "",
      tags: "",
    });
  };

  return (
    <div className="w-full max-w-3xl bg-slate-950 p-6 rounded-xl border border-amber-700 shadow-lg">
      <h2 className="text-2xl font-bold text-amber-300 mb-4">
        Launch a Challenge
      </h2>
      <hr className="border-amber-700 mb-3" />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            🎯 Challenge Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter challenge title"
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
            required
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            📅 Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
            required
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            ⏰ End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
            required
          />
        </div>

        {/* Rewards */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            🏅 Rewards
          </label>
          <input
            type="text"
            name="rewards"
            value={formData.rewards}
            onChange={handleChange}
            placeholder="Enter rewards (if any)"
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
          />
        </div>

        {/* Link */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            🔗 Challenge Link
          </label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://example.com/challenge"
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-blue-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
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
            placeholder="Describe the challenge..."
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm resize-none"
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
            placeholder="e.g. React, JavaScript, OpenSource"
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="px-6 py-2 rounded-full font-semibold text-sm text-slate-900 bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 hover:from-amber-800 hover:to-amber-700 shadow-md hover:scale-105 transition duration-200"
          >
            Create Challenge
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChallengeForm;
