import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";

const JobForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    location: "",
    eligibility: "",
    salaryType: "CTC",
    ctc: "",
    stipend: "",
    applyLink: "",
    description: "",
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      company: "",
      role: "",
      location: "",
      eligibility: "",
      salaryType: "CTC",
      ctc: "",
      stipend: "",
      applyLink: "",
      description: "",
      tags: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.company.trim() ||
      !formData.role.trim() ||
      !formData.location.trim()
    )
      return;

    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const payload = {
      company: formData.company.trim(),
      role: formData.role.trim(),
      location: formData.location.trim(),
      eligibility: formData.eligibility.trim() || "Open to all",
      salary: {
        type: formData.salaryType,
        ctc: Number(formData.ctc) || 0,
        stipend: Number(formData.stipend) || 0,
      },
      applyLink: formData.applyLink.trim(),
      description: formData.description.trim(),
      tags: tagsArray,
    };

    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/v1/post/job`, payload, {
        withCredentials: true,
      });
      console.log("Job posted:", res.data);
      resetForm();
    } catch (error) {
      console.error("Error posting job:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-slate-950 p-6 rounded-xl border border-amber-700 shadow-lg">
      <h2 className="text-2xl font-bold text-amber-300 mb-4">
        Post a Job Opening
      </h2>
      <hr className="border-amber-700 mb-3" />
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Company */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            📢 Company
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Amazon"
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
            required
          />
        </div>

        {/* Role */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            💼 Role
          </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="e.g. Full Stack Developer"
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            📍 Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Bangalore, India"
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
            required
          />
        </div>

        {/* Eligibility */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            🎓 Eligibility
          </label>
          <input
            type="text"
            name="eligibility"
            value={formData.eligibility}
            onChange={handleChange}
            placeholder="e.g. 2026 passout batch"
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
          />
        </div>

        {/* Salary Type */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            💰 Salary Type
          </label>
          <select
            name="salaryType"
            value={formData.salaryType}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-900 text-amber-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 transition duration-200 text-sm"
          >
            <option value="CTC">CTC</option>
            <option value="Stipend">Stipend</option>
          </select>
        </div>

        {/* Conditionally render input based on salary type */}
        {formData.salaryType === "CTC" && (
          <div>
            <label className="block mb-1 text-sm font-medium text-amber-300">
              💰 CTC (₹ LPA)
            </label>
            <input
              type="number"
              name="ctc"
              value={formData.ctc}
              onChange={handleChange}
              placeholder="e.g. 8"
              className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
              required={formData.salaryType === "CTC"}
            />
          </div>
        )}

        {formData.salaryType === "Stipend" && (
          <div>
            <label className="block mb-1 text-sm font-medium text-amber-300">
              💰 Stipend (₹)
            </label>
            <input
              type="number"
              name="stipend"
              value={formData.stipend}
              onChange={handleChange}
              placeholder="e.g. 25000"
              className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
              required={formData.salaryType === "Stipend"}
            />
          </div>
        )}

        {/* Apply Link */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            🔗 Apply Link
          </label>
          <input
            type="url"
            name="applyLink"
            value={formData.applyLink}
            onChange={handleChange}
            placeholder="https://example.com/apply"
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            📝 Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Write a brief description of the job..."
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
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
            placeholder="e.g. Node.js, React, MongoDB"
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

export default JobForm;
