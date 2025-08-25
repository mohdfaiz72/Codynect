import { useState } from "react";
import Editor from "@monaco-editor/react";
import api from "../../../utils/api";

const SnippetForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    intuition: "",
    approach: "",
    timeComplexity: "",
    spaceComplexity: "",
    language: "cpp",
    link: "",
    tags: "",
    code: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      intuition: "",
      approach: "",
      timeComplexity: "",
      spaceComplexity: "",
      language: "cpp",
      link: "",
      tags: "",
      code: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.code.trim() ||
      !formData.language.trim()
    )
      return;

    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    try {
      setLoading(true);
      const payload = {
        ...formData,
        code: formData.code.trim(),
        tags: tagsArray,
      };
      const res = await api.post("/v1/post/snippet", payload);

      console.log("Snippet posted:", res.data);
      resetForm();
    } catch (error) {
      console.error("Error posting snippet:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditorWillMount = (monaco) => {
    monaco.editor.defineTheme("my-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#000011",
      },
    });
  };

  return (
    <div className="w-full max-w-3xl bg-slate-950 p-6 rounded-xl border border-amber-700 shadow-lg">
      <h2 className="text-2xl font-bold text-amber-300 mb-4">
        Post a Code Snippet
      </h2>
      <hr className="text-amber-700 mb-3" />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            🎯 Problem Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Two Sum"
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
            required
          />
        </div>

        {/* Intuition */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            🧠 Intuition
          </label>
          <textarea
            name="intuition"
            rows={2}
            value={formData.intuition}
            onChange={handleChange}
            placeholder="Explain your thought process..."
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm resize-none"
          />
        </div>

        {/* Approach */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            🚀 Approach
          </label>
          <textarea
            name="approach"
            rows={3}
            value={formData.approach}
            onChange={handleChange}
            placeholder="Explain your approach in detail..."
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm resize-none"
          />
        </div>

        {/* Time Complexity */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            📊 Time Complexity
          </label>
          <input
            type="text"
            name="timeComplexity"
            value={formData.timeComplexity}
            onChange={handleChange}
            placeholder="e.g. O(n log n)"
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
          />
        </div>

        {/* Space Complexity */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            📦 Space Complexity
          </label>
          <input
            type="text"
            name="spaceComplexity"
            value={formData.spaceComplexity}
            onChange={handleChange}
            placeholder="e.g. O(1)"
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
          />
        </div>

        {/* Language */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            ⚙️ Language
          </label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-900 text-amber-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 transition duration-200 text-sm"
            required
          >
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>

        {/* Link */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            🔗 Problem Link
          </label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://leetcode.com/problems/example"
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
            placeholder="e.g. Array, Two Pointers"
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-amber-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
          />
        </div>

        {/* Code */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            💻 Code
          </label>
          <div className="border border-amber-700 rounded-md overflow-hidden">
            <Editor
              height="300px"
              language={formData.language}
              value={formData.code}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, code: value || "" }))
              }
              theme="my-dark"
              beforeMount={handleEditorWillMount}
              options={{
                padding: { top: 20, bottom: 20 },
                minimap: { enabled: false },
              }}
            />
          </div>
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

export default SnippetForm;
