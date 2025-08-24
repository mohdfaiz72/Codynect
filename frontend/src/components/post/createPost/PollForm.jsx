import { useState } from "react";
import { BASE_URL } from "../../../utils/constants";
import axios from "axios";

const PollForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    tags: "",
    options: ["", ""],
  });

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (name === "question") {
      setFormData((prev) => ({ ...prev, question: value }));
    } else if (name === "option" && index !== null) {
      const updatedOptions = [...formData.options];
      updatedOptions[index] = value;
      setFormData((prev) => ({ ...prev, options: updatedOptions }));
    } else if (name === "tags") {
      setFormData((prev) => ({ ...prev, tags: value }));
    }
  };

  const addOption = () => {
    setFormData((prev) => ({ ...prev, options: [...prev.options, ""] }));
  };

  const removeOption = (index) => {
    if (formData.options.length <= 2) return;
    const updatedOptions = formData.options.filter((_, idx) => idx !== index);
    setFormData((prev) => ({ ...prev, options: updatedOptions }));
  };

  const resetForm = () => {
    setFormData({
      question: "",
      tags: "",
      options: ["", ""],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedOptions = formData.options
      .map((opt) => opt.trim())
      .filter(Boolean);

    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (!formData.question.trim() || trimmedOptions.length < 2) {
      alert("Please enter a question and at least 2 options");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        question: formData.question,
        options: trimmedOptions,
        tags: tagsArray,
      };

      const res = await axios.post(`${BASE_URL}/v1/post/poll`, payload, {
        withCredentials: true,
      });

      console.log("Poll posted:", res.data);
      resetForm();
    } catch (error) {
      console.error("Error posting poll:", error);
      alert("Failed to post poll");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl bg-slate-950 p-6 rounded-xl border border-amber-700 shadow-lg">
      <h2 className="text-2xl font-bold text-amber-300 mb-4">Create a Poll</h2>
      <hr className="border-amber-700 mb-3" />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Question */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            ❓ Poll Question
          </label>
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
            placeholder="Enter your poll question"
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
            required
          />
        </div>

        {/* Options */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            📝 Options
          </label>
          {formData.options.map((opt, idx) => (
            <div key={idx} className="flex items-center mb-2 gap-2">
              <input
                type="text"
                name="option"
                value={opt}
                onChange={(e) => handleChange(e, idx)}
                placeholder={`Option ${idx + 1}`}
                className="flex-1 px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
                required
              />
              {formData.options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(idx)}
                  className="px-3 py-1.5 rounded-full text-sm transition duration-200 shadow-sm hover:scale-105 border border-red-500 text-red-400 hover:bg-red-900"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addOption}
            className="px-3 py-1.5 rounded-full text-sm font-semibold border border-amber-600 text-amber-300 hover:bg-slate-800 transition duration-200 hover:scale-105"
          >
            + Add Option
          </button>
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

        {/* Buttons */}
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

export default PollForm;
