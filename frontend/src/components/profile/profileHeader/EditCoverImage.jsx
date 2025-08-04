import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";

const EditCoverImage = ({ onClose }) => {
  const [coverImage, setCoverImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  useEffect(() => {
    // Prevent background scrolling
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemove = () => {
    setCoverImage(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!coverImage) return alert("Please select an image to upload.");

    try {
      const formData = new FormData();
      formData.append("coverImage", coverImage);

      await axios.put(`${BASE_URL}/profile/cover`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Cover image updated!");
      onClose();
    } catch (error) {
      console.error("Upload error:", error.message);
      alert("Failed to upload cover image.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-slate-950 p-6 rounded-xl border border-amber-700 shadow-xl w-full max-w-2xl transition-all">
        <h2 className="text-2xl font-bold text-amber-300 mb-4">
          Edit Cover Image
        </h2>
        <hr className="text-amber-700 mb-4" />

        {/* Preview */}
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-md border border-slate-700 mb-4"
          />
        ) : (
          <div className="w-full h-48 sm:h-56 md:h-64 bg-slate-800 flex items-center justify-center text-slate-500 rounded-md mb-4 border border-slate-700">
            No cover image selected
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-700 file:text-slate-900 hover:file:bg-amber-800"
          />

          <div className="flex justify-between gap-3">
            {/* Remove Button */}
            <button
              type="button"
              onClick={handleRemove}
              className="px-4 py-2 rounded-full text-sm font-semibold border border-red-500 text-red-400 hover:bg-red-900 transition duration-200 hover:scale-105"
            >
              Remove
            </button>

            <div className="flex gap-2 ml-auto">
              {/* Cancel */}
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full text-sm font-semibold border border-amber-600 text-amber-300 hover:bg-slate-800 transition duration-200 hover:scale-105"
              >
                Cancel
              </button>

              {/* Save */}
              <button
                type="submit"
                className="px-4 py-2 rounded-full font-semibold text-slate-900 text-sm bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 hover:from-amber-800 hover:to-amber-700 shadow-md hover:scale-105 transition duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCoverImage;
