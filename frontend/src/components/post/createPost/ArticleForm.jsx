import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";

const ArticleForm = () => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
    tags: "",
    externalLink: "",
  });

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
    setFormData({
      title: "",
      content: "",
      tags: "",
      image: null,
      externalLink: "",
    });
    setPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) return;

    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("title", formData.title.trim());
      payload.append("content", formData.content.trim());
      payload.append("externalLink", formData.externalLink.trim());
      tagsArray.forEach((tag) => payload.append("tags[]", tag));
      if (formData.image) payload.append("file", formData.image);

      const res = await axios.post(`${BASE_URL}/v1/post/article`, payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Article posted:", res.data);
      resetForm();
    } catch (error) {
      console.error("Error posting article:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl bg-slate-950 p-6 rounded-xl border border-amber-700 shadow-lg">
      <h2 className="text-2xl font-bold text-amber-300 mb-4">
        Create a Article
      </h2>
      <hr className="border-amber-700 mb-3" />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            📝 Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter article title"
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            ✏️ Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your article here..."
            rows={8}
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm scrollbar-hide"
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            🏷️ Tags (comma separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="React, JavaScript, Frontend"
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-amber-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
          />
        </div>

        {/* External Link */}
        <div>
          <label className="block mb-1 text-sm font-medium text-amber-300">
            🔗 External Link (optional)
          </label>
          <input
            type="url"
            name="externalLink"
            value={formData.externalLink}
            onChange={handleChange}
            placeholder="https://example.com"
            className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
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

export default ArticleForm;
