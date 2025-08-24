import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";

const ThoughtForm = () => {
  const [formData, setFormData] = useState({
    content: "",
    tags: "",
    image: null,
  });
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setFormData({ content: "", tags: "", image: null });
    setPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.content.trim()) return;

    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    try {
      setLoading(true);

      // Prepare FormData for file upload
      const data = new FormData();
      data.append("content", formData.content);
      data.append("tags", JSON.stringify(tagsArray));
      if (formData.image) {
        data.append("file", formData.image);
      }

      const res = await axios.post(`${BASE_URL}/v1/post/thought`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Thought posted:", res.data);
      resetForm();
    } catch (error) {
      console.error("Error posting thought:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-slate-950 p-6 rounded-xl border border-amber-700 shadow-lg transition-all">
      <h2 className="text-2xl font-bold text-amber-300 mb-4">
        Share Your Thought
      </h2>
      <hr className="text-amber-700 mb-3" />
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Thought Content */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            💭 Thought
          </label>
          <textarea
            name="content"
            rows={8}
            value={formData.content}
            onChange={handleChange}
            placeholder="What's on your mind?"
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm resize-none scrollbar-hide"
            required
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
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-amber-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
            placeholder="e.g. Nature, Life, AI"
          />
        </div>

        {/* Image */}
        <div>
          <div className="flex justify-center mb-4">
            <label className="cursor-pointer bg-amber-600 hover:bg-amber-700 text-slate-900 font-semibold py-1 px-3 rounded-full transition">
              Upload Image (optional)
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          {preview && (
            <div className="mt-3">
              <img
                src={preview}
                alt="Preview"
                className="w-full object-cover rounded-md border border-amber-700 shadow-md"
              />
            </div>
          )}
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

export default ThoughtForm;
