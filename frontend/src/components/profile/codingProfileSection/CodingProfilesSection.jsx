import { useState } from "react";
import { Pencil, Plus, ArrowLeft, Trash2, RotateCcw } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import AddCodingProfile from "./AddCodingProfile";
import EditCodingProfile from "./EditCodingProfile";
import DeleteConfirmation from "../../../common/DeleteConfirmation";
import { codingPlatforms } from "../../../utils/codingPlatforms";
import { toast } from "react-toastify";
import {
  addCoding,
  deleteCoding,
  updateCoding,
} from "../../../store/codingSlice";
import { BASE_URL } from "../../../utils/constants";

const CodingProfilesSection = () => {
  const isOwnProfile = useSelector((store) => store.profile.isOwnProfile);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [codingProfileToUpdate, setCodingProfileToUpdate] = useState(null);
  const [loadingIds, setLoadingIds] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEditablePage =
    location.pathname === "/profile/coding-profiles-section";
  const profiles = useSelector((store) =>
    store.profile.isOwnProfile ? store.coding.coding : store.profile.coding
  );

  const handleSaveCodingProfile = async (formData) => {
    try {
      const res = await axios.post(`${BASE_URL}/coding/add-profile`, formData, {
        withCredentials: true,
      });
      dispatch(addCoding(res.data));
      toast.success("Profile added!");
      setShowAddModal(false);
    } catch (err) {
      toast.error(
        "Failed to save: " + (err.response?.data?.message || err.message)
      );
    }
  };

  const handleUpdateCodingProfile = async (formData) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/coding/update-profile/${formData.id}`,
        formData,
        { withCredentials: true }
      );
      dispatch(updateCoding(res.data));
      toast.success("Profile updated!");
      setShowEditModal(false);
    } catch (err) {
      toast.error(
        "Failed to save: " + (err.response?.data?.message || err.message)
      );
    }
  };

  const handleRefreshProfile = async (profile) => {
    setLoadingIds((prev) => ({ ...prev, [profile._id]: true }));
    try {
      const res = await axios.post(
        `${BASE_URL}/coding/fetch-profile`,
        { platform: profile.platform, username: profile.username },
        { withCredentials: true }
      );
      dispatch(updateCoding(res.data));
      toast.info(`Live data for ${profile.platform} fetched!`);
    } catch (err) {
      toast.error(
        "Failed to fetch live data: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoadingIds((prev) => ({ ...prev, [profile._id]: false }));
    }
  };

  const handleDeleteCodingProfile = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/coding/delete-profile/${id}`, {
        withCredentials: true,
      });
      dispatch(deleteCoding(id));
      toast.success("Coding profile deleted.");
      setShowDeleteModal(false);
    } catch (err) {
      toast.error(
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
              {profiles?.length > 0 && !isEditablePage && (
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
                onClick={() => setShowAddModal(true)}
                className="text-amber-400 hover:text-amber-200 hover:scale-110 transition-transform"
                title="Add Coding Profile"
              >
                <Plus size={22} />
              </button>
            </div>
          )}
        </div>

        {profiles.length === 0 ? (
          <p className="text-slate-400 text-sm">
            No coding profiles added yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {profiles.map((profile) => (
              <div
                key={profile._id}
                className="relative border border-amber-700 p-4 rounded-md bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 shadow-md hover:border-purple-600 transition duration-200 text-sm"
              >
                {isEditablePage && (
                  <div className="absolute top-2 right-2 flex gap-3">
                    {profile.platform.toLowerCase() === "codechef" ? (
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
                    ) : (
                      <button
                        onClick={() => handleRefreshProfile(profile)}
                        disabled={loadingIds[profile._id]}
                        className={`text-amber-400 hover:text-amber-200 transition ${
                          loadingIds[profile._id]
                            ? "animate-spin cursor-wait"
                            : ""
                        }`}
                        title="Refresh profile"
                      >
                        <RotateCcw size={18} />
                      </button>
                    )}

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

                <div className="flex items-center gap-2 mb-1">
                  <img
                    src={codingPlatforms[profile.platform.toLowerCase()]?.logo}
                    alt={profile.platform}
                    className="w-5 h-5"
                  />
                  <span className="text-amber-300 text-base font-semibold">
                    {codingPlatforms[profile.platform.toLowerCase()]?.name ||
                      profile.platform}
                  </span>
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
                  {profile.solvedCount > 0 && (
                    <div>
                      Problem Solved:{" "}
                      <span className="text-amber-400">
                        {profile.solvedCount}
                      </span>
                    </div>
                  )}
                </div>
                {profile.link && (
                  <div className="mb-1 text-sm text-blue-400">
                    <a
                      href={profile.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center hover:underline"
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
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdateCodingProfile}
          codingProfileToEdit={codingProfileToUpdate}
        />
      )}
      {showAddModal && (
        <AddCodingProfile
          onClose={() => setShowAddModal(false)}
          onSave={handleSaveCodingProfile}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmation
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => handleDeleteCodingProfile(codingProfileToUpdate._id)}
          itemName="coding profile"
        />
      )}
    </>
  );
};

export default CodingProfilesSection;
