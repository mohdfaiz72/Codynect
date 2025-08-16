import { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";

const DoubtForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    code: "",
    language: "cpp",
    tags: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      code: "",
      language: "cpp",
      tags: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      code: formData.code.trim() || "",
      language: formData.language,
      tags: tagsArray,
    };

    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/post/doubt`, payload, {
        withCredentials: true,
      });
      console.log("Doubt posted:", res.data);
      resetForm();
    } catch (error) {
      console.error("Error posting doubt:", error);
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
      <h2 className="text-2xl font-bold text-amber-300 mb-4">Post a Doubt</h2>
      <hr className="border-amber-700 mb-3" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            ❓ Doubt Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a short title for your doubt"
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            ✏️ Details
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Explain your doubt in detail"
            rows={5}
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm whitespace-pre-line"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            🏷️ Tags
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Add comma-separated tags"
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-amber-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
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

export default DoubtForm;
