import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pencil, Plus, ArrowLeft, Trash2 } from "lucide-react";
import EditAbout from "./EditAbout";
import DeleteConfirmation from "../../../common/DeleteConfirmation";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { addUser } from "../../../store/userSlice";
import { BASE_URL } from "../../../utils/constants";

const AboutSection = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isOwnProfile = useSelector((store) => store.profile.isOwnProfile);
  const user = isOwnProfile
    ? useSelector((store) => store.user.user)
    : useSelector((store) => store.profile.profile);

  const isEditablePage = location.pathname === "/profile/about-section";

  const handleSaveAbout = async (updatedText) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/user/update-about`,
        { about: updatedText },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
      alert(user.about ? "About updated!" : "About added!");
      setShowEditModal(false);
    } catch (err) {
      alert("Failed to save: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteAbout = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/user/update-about`,
        { about: "" },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      alert("About section deleted.");
      setShowDeleteModal(false);
    } catch (err) {
      alert(
        "Failed to delete: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 border border-amber-700 rounded-lg p-4 mb-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-amber-400 text-lg font-semibold">About</h2>
          {isOwnProfile ? (
            !isEditablePage ? (
              <button
                onClick={() =>
                  user.about
                    ? navigate("/profile/about-section")
                    : setShowEditModal(true)
                }
                className="text-amber-400 hover:text-amber-200 hover:scale-110 transition-transform"
              >
                {user.about ? <Pencil size={22} /> : <Plus size={22} />}
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/profile")}
                  className="text-amber-400 hover:text-amber-200 hover:scale-110 transition-transform"
                  title="Back to Profile"
                >
                  <ArrowLeft size={22} />
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="text-red-400 hover:text-red-300 hover:scale-110 transition-transform"
                  title="Delete this profile"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={() => setShowEditModal(true)}
                  className="text-amber-400 hover:text-amber-200 hover:scale-110 transition-transform"
                  title="Edit this profile"
                >
                  <Pencil size={18} />
                </button>
              </div>
            )
          ) : null}
        </div>

        {/* About Text or Empty State */}
        {user.about ? (
          <div className="relative border border-amber-700 p-4 rounded-md bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 shadow-md hover:border-purple-600 transition duration-200">
            <p className="text-sm leading-relaxed text-slate-300 whitespace-pre-line">
              {user.about}
            </p>
          </div>
        ) : (
          <p className="text-sm text-slate-400 italic">No about added yet.</p>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditAbout
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveAbout}
          aboutToEdit={user.about}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteConfirmation
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteAbout}
          itemName="about section"
        />
      )}
    </>
  );
};

export default AboutSection;
