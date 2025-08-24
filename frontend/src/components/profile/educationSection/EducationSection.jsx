import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pencil, Plus, ArrowLeft, Trash2 } from "lucide-react";
import EditEducation from "./EditEducation";
import DeleteConfirmation from "../../common/DeleteConfirmation";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  addEducation,
  updateEducation,
  deleteEducation,
} from "../../../store/educationSlice";
import { BASE_URL } from "../../../utils/constants";

const EducationSection = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [educationToUpdate, setEducationToUpdate] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isOwnProfile = useSelector((store) => store.profile.isOwnProfile);
  const education = isOwnProfile
    ? useSelector((store) => store.education.education)
    : useSelector((store) => store.profile.profile.education);

  const isEditablePage = location.pathname === "/profile/education-section";

  // ---------- Add / Update ----------
  const handleSaveEducation = async (formData) => {
    try {
      let res;
      if (educationToUpdate) {
        res = await axios.patch(
          `${BASE_URL}/v1/education/${educationToUpdate._id}`,
          formData,
          { withCredentials: true }
        );
        dispatch(updateEducation(res.data));
        alert("Education updated!");
      } else {
        res = await axios.post(`${BASE_URL}/v1/education/`, formData, {
          withCredentials: true,
        });
        dispatch(addEducation(res.data));
        alert("Education added!");
      }
      setShowEditModal(false);
    } catch (err) {
      alert("Failed to save: " + (err.response?.data?.message || err.message));
    }
  };

  // ---------- Delete ----------
  const handleDeleteEducation = async () => {
    try {
      await axios.delete(`${BASE_URL}/v1/education/${educationToUpdate._id}`, {
        withCredentials: true,
      });
      dispatch(deleteEducation(educationToUpdate._id));
      alert("Education entry deleted.");
      setShowDeleteModal(false);
      setEducationToUpdate(null);
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
          <h2 className="text-amber-400 text-lg font-semibold">Education</h2>
          {isOwnProfile && (
            <div className="flex items-center gap-4">
              {education.length > 0 && !isEditablePage && (
                <button
                  onClick={() => navigate("/profile/education-section")}
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
                  setEducationToUpdate(null);
                  setShowEditModal(true);
                }}
                className="text-amber-400 hover:text-amber-200 hover:scale-110 transition-transform"
                title="Add Education"
              >
                <Plus size={22} />
              </button>
            </div>
          )}
        </div>
        {education.length > 0 ? (
          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="relative border border-amber-700 p-4 rounded-md bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 shadow-md hover:border-purple-600 transition duration-200"
              >
                {isEditablePage && (
                  <div className="absolute top-2 right-2 flex gap-3">
                    {/* Edit Button */}
                    <button
                      onClick={() => {
                        setEducationToUpdate(edu);
                        setShowEditModal(true);
                      }}
                      className="text-amber-400 hover:text-amber-200 hover:scale-110 transition-transform"
                      title="Edit this education"
                    >
                      <Pencil size={18} />
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => {
                        setEducationToUpdate(edu);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-400 hover:text-red-300 hover:scale-110 transition-transform"
                      title="Delete this education"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}

                <h3 className="text-lg font-semibold text-amber-300">
                  🎓 {edu.degree}
                </h3>
                <p className="text-sm text-slate-300">{edu.institution}</p>
                <div className="flex flex-wrap justify-between text-xs text-slate-400 mt-2">
                  <span>
                    📅 {edu.startYear} - {edu.endYear}
                  </span>
                  <span>📖 Grade: {edu.grade}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 italic">
            No education added yet.
          </p>
        )}
      </div>

      {showEditModal && (
        <EditEducation
          educationToEdit={educationToUpdate}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveEducation}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmation
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteEducation}
          itemName="education section"
        />
      )}
    </>
  );
};

export default EducationSection;
