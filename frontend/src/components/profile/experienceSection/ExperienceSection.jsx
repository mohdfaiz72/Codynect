import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pencil, Plus, ArrowLeft, Trash2 } from "lucide-react";
import EditExperience from "./EditExperience";
import DeleteConfirmation from "../../common/DeleteConfirmation";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  addExperience,
  updateExperience,
  deleteExperience,
} from "../../../store/experienceSlice";
import { BASE_URL } from "../../../utils/constants";

const ExperienceSection = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [experienceToUpdate, setExperienceToUpdate] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isOwnProfile = useSelector((store) => store.profile.isOwnProfile);
  const experience = isOwnProfile
    ? useSelector((store) => store.experience.experience)
    : useSelector((store) => store.profile.profile.experience);

  const isEditablePage = location.pathname === "/profile/experience-section";

  // ---------- Add / Update ----------
  const handleSaveExperience = async (formData) => {
    try {
      let res;
      if (experienceToUpdate) {
        res = await axios.patch(
          `${BASE_URL}/v1/experience/${experienceToUpdate._id}`,
          formData,
          { withCredentials: true }
        );
        dispatch(updateExperience(res.data));
        alert("Experience updated!");
      } else {
        res = await axios.post(`${BASE_URL}/v1/experience/`, formData, {
          withCredentials: true,
        });
        dispatch(addExperience(res.data));
        alert("Experience added!");
      }
      setShowEditModal(false);
    } catch (err) {
      alert("Failed to save: " + (err.response?.data?.message || err.message));
    }
  };

  // ---------- Delete ----------
  const handleDeleteExperience = async () => {
    try {
      await axios.delete(
        `${BASE_URL}/v1/experience/${experienceToUpdate._id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(deleteExperience(experienceToUpdate._id));
      alert("Experience entry deleted.");
      setShowDeleteModal(false);
      setExperienceToUpdate(null);
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
          <h2 className="text-amber-400 text-lg font-semibold">Experience</h2>
          {isOwnProfile && (
            <div className="flex items-center gap-4">
              {experience.length > 0 && !isEditablePage && (
                <button
                  onClick={() => navigate("/profile/experience-section")}
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
                  <ArrowLeft size={22} className="mr-2" />
                </button>
              )}

              <button
                onClick={() => {
                  setExperienceToUpdate(null);
                  setShowEditModal(true);
                }}
                className="text-amber-400 hover:text-amber-200 hover:scale-110 transition-transform"
                title="Add Experience"
              >
                <Plus size={22} />
              </button>
            </div>
          )}
        </div>

        {experience.length > 0 ? (
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div
                key={idx}
                className="relative border border-amber-700 p-4 rounded-md bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 shadow-md hover:border-purple-600 transition duration-200"
              >
                {isEditablePage && (
                  <div className="absolute top-2 right-2 flex gap-3">
                    <button
                      onClick={() => {
                        setExperienceToUpdate(exp);
                        setShowEditModal(true);
                      }}
                      className="text-amber-400 hover:text-amber-200 hover:scale-110 transition-transform"
                      title="Edit this experience"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setExperienceToUpdate(exp);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-400 hover:text-red-300 hover:scale-110 transition-transform"
                      title="Delete this experience"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
                <h3 className="text-lg font-semibold text-amber-300">
                  💼 {exp.role}
                </h3>
                <p className="text-sm text-slate-300">
                  {exp.company} —{" "}
                  <span className="text-slate-400">{exp.location}</span>
                </p>
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>
                    📅 {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-200">{exp.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 italic">
            No experience added yet.
          </p>
        )}
      </div>

      {showEditModal && (
        <EditExperience
          experienceToEdit={experienceToUpdate}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveExperience}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmation
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteExperience}
          itemName="experience section"
        />
      )}
    </>
  );
};

export default ExperienceSection;
