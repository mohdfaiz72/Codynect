import { useState } from "react";
import { Pencil, Plus, ArrowLeft, Trash2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import EditCodingProfile from "./EditCodingProfile";
import DeleteConfirmation from "../../../common/DeleteConfirmation";
import { addUser } from "../../../store/userSlice";
import { BASE_URL } from "../../../utils/constants";

const CodingProfilesSection = () => {
  const isOwnProfile = useSelector((store) => store.profile.isOwnProfile);
  const user = isOwnProfile
    ? useSelector((store) => store.user.user)
    : useSelector((store) => store.profile.profile);
  const [showEditModal, setShowEditModal] = useState(false);
  const [codingProfileToUpdate, setCodingProfileToUpdate] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEditablePage =
    location.pathname === "/profile/coding-profiles-section";

  const handleSaveCodingProfile = async (formData) => {
    let updatedProfiles;
    if (codingProfileToUpdate) {
      updatedProfiles = user.codingProfiles.map((cp) =>
        cp === codingProfileToUpdate ? formData : cp
      );
    } else {
      updatedProfiles = [...(user.codingProfiles || []), formData];
    }

    try {
      const res = await axios.patch(
        `${BASE_URL}/user/update-coding-profiles`,
        { codingProfiles: updatedProfiles },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      alert(
        codingProfileToUpdate ? "Coding profile updated!" : "Profile added!"
      );
      setShowEditModal(false);
    } catch (err) {
      alert("Failed to save: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteCodingProfile = async () => {
    const updatedProfiles = user.codingProfiles.filter(
      (cp) => cp !== codingProfileToUpdate
    );
    try {
      const res = await axios.patch(
        `${BASE_URL}/user/update-coding-profiles`,
        { codingProfiles: updatedProfiles },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      alert("Coding profile deleted.");
      setShowDeleteModal(false);
      setCodingProfileToUpdate(null);
    } catch (err) {
      alert(
        "Failed to delete: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 border border-amber-700 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-amber-400 text-lg font-semibold">
            Coding Profiles
          </h2>
          {isOwnProfile && (
            <div className="flex items-center gap-4">
              {user.codingProfiles.length > 0 && !isEditablePage && (
                <button
                  onClick={() => navigate("/profile/coding-profiles-section")}
                  className="text-amber-400 hover:text-amber-200 hover:scale-110 transition-transform"
                  title="Go to Edit Page"
                >
                  <Pencil size={22} />
                </button>
              )}
              {isEditablePage && (
                <button
                  onClick={() => navigate("/profile")}
                  className="text-amber-400 hover:text-amber-200 hover:scale-110 transition-transform"
                  title="Back to Profile"
                >
                  <ArrowLeft size={22} />
                </button>
              )}
              <button
                onClick={() => {
                  setCodingProfileToUpdate(null);
                  setShowEditModal(true);
                }}
                className="text-amber-400 hover:text-amber-200 hover:scale-110 transition-transform"
                title="Add Coding Profile"
              >
                <Plus size={22} />
              </button>
            </div>
          )}
        </div>

        {user.codingProfiles.length === 0 ? (
          <p className="text-slate-400 text-sm">
            No coding profiles added yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {user.codingProfiles.map((profile, idx) => (
              <div
                key={idx}
                className="relative border border-amber-700 p-3 rounded-md bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 shadow-md hover:border-purple-600 transition duration-200 text-sm"
              >
                {isEditablePage && (
                  <div className="absolute top-2 right-2 flex gap-3">
                    <button
                      onClick={() => {
                        setCodingProfileToUpdate(profile);
                        setShowEditModal(true);
                      }}
                      className="text-amber-400 hover:text-amber-200 hover:scale-110 transition-transform"
                      title="Edit this profile"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => {
                        setCodingProfileToUpdate(profile);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-400 hover:text-red-300 hover:scale-110 transition-transform"
                      title="Delete this profile"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
                <div className="text-amber-300 text-base font-semibold mb-1">
                  🔗 {profile.platform}
                </div>

                <div className="text-slate-300 text-sm space-y-1">
                  {profile.currentTitle && (
                    <div>
                      Current Title:{" "}
                      <span className="text-amber-400">
                        {profile.currentTitle}
                      </span>
                    </div>
                  )}
                  {profile.currentRating > 0 && (
                    <div>
                      Current Rating:{" "}
                      <span className="text-amber-400">
                        {profile.currentRating}
                      </span>
                    </div>
                  )}
                  {profile.maxTitle && (
                    <div>
                      Max Title:{" "}
                      <span className="text-amber-400">{profile.maxTitle}</span>
                    </div>
                  )}
                  {profile.maxRating > 0 && (
                    <div>
                      Max Rating:{" "}
                      <span className="text-amber-400">
                        {profile.maxRating}
                      </span>
                    </div>
                  )}
                </div>
                {profile.link && (
                  <div className="mb-1">
                    <a
                      href={profile.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-blue-400 underline text-sm hover:text-blue-500 transition"
                    >
                      profile link
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showEditModal && (
        <EditCodingProfile
          codingProfileToEdit={codingProfileToUpdate}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveCodingProfile}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmation
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteCodingProfile}
          itemName="coding profile"
        />
      )}
    </>
  );
};

export default CodingProfilesSection;
