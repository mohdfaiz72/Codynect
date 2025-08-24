import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../store/userSlice";
import DeleteConfirmation from "../../common/DeleteConfirmation";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";
import { dummyUser } from "../../../utils/dummyUser";

const EditProfilePhoto = ({ onClose }) => {
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(
    user.profileImage || dummyUser.profileImage
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = async () => {
    try {
      const formData = new FormData();
      formData.append("remove", true);

      const res = await axios.patch(
        `${BASE_URL}/v1/user/profile-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        dispatch(setUser(res.data.user));
        alert("Profile image removed!");
        setSelectedImage(null);
        setPreview(dummyUser.profileImage);
        onClose();
      } else {
        alert("Failed to remove profile image.");
      }
    } catch (error) {
      console.error("Remove error:", error);
      alert("Something went wrong while removing the image.");
    }
  };

  const handleSaveImage = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      alert("Please select an image to upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedImage);

      const res = await axios.patch(
        `${BASE_URL}/v1/user/profile-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        dispatch(setUser(res.data.user));
        alert("Profile photo updated!");
        onClose();
      } else {
        alert("Failed to update profile photo.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong while uploading.");
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
        <div className="bg-slate-950 p-6 rounded-xl border border-amber-700 shadow-xl w-full max-w-md transition-all">
          <h2 className="text-2xl font-bold text-amber-300 mb-4">
            Edit Profile Photo
          </h2>
          <hr className="mb-4 border-amber-700" />

          <form onSubmit={handleSaveImage}>
            {/* Preview */}
            <div className="flex justify-center mb-4">
              <img
                src={preview}
                alt="Preview"
                className="w-40 h-40 rounded-full border-3 border-amber-700 object-cover bg-slate-900"
              />
            </div>

            {/* File Input */}
            <div className="flex justify-center mb-4">
              <label className="cursor-pointer bg-amber-600 hover:bg-amber-700 text-slate-900 font-semibold py-2 px-4 rounded-full transition">
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Buttons */}
            <div className="flex justify-between gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition duration-200 border border-red-500 text-red-400 hover:bg-red-900"
              >
                Delete
              </button>

              <div className="flex gap-2 ml-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-full text-sm font-semibold border border-amber-600 text-amber-300 hover:bg-slate-800 transition duration-200 hover:scale-105"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-full font-semibold text-slate-900 text-sm bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 hover:from-amber-800 hover:to-amber-700 shadow-md hover:scale-105 transition duration-200"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {showDeleteModal && (
        <DeleteConfirmation
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleRemoveImage}
          itemName="Profile Image"
        />
      )}
    </>
  );
};

export default EditProfilePhoto;
