import { useState } from "react";
import { Pencil, Plus, ArrowLeft, Trash2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EditExperience from "./EditExperience";
import DeleteConfirmation from "../../../common/DeleteConfirmation";
import { addUser } from "../../../store/userSlice";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";

const ExperienceSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [experienceToEdit, setExperienceToEdit] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const isEditablePage = location.pathname === "/profile/experiences-section";

  const handleSaveExperience = async (formData) => {
    let updatedExperience;
    if (experienceToEdit) {
      updatedExperience = user.experience.map((exp) =>
        exp === experienceToEdit ? formData : exp
      );
    } else {
      updatedExperience = [...(user.experience || []), formData];
    }

    try {
      const res = await axios.patch(
        `${BASE_URL}/user/update-experiences`,
        { experience: updatedExperience },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
      alert(experienceToEdit ? "Experience updated!" : "Experience added!");
      setShowModal(false);
    } catch (err) {
      alert("Failed to save: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteExperience = async () => {
    const updatedExperience = user.experience.filter(
      (exp) => exp !== experienceToEdit
    );

    try {
      const res = await axios.patch(
        `${BASE_URL}/user/update-experiences`,
        { experience: updatedExperience },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
      alert("Experience entry deleted.");
      setShowDeleteModal(false);
      setExperienceToEdit(null);
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
          <div className="flex items-center gap-4">
            {user.experience.length > 0 && !isEditablePage && (
              <button
                onClick={() => navigate("/profile/experiences-section")}
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
                setExperienceToEdit(null);
                setShowModal(true);
              }}
              className="text-amber-400 hover:text-amber-200 hover:scale-110 transition-transform"
              title="Add Experience"
            >
              <Plus size={22} />
            </button>
          </div>
        </div>

        {user.experience.length > 0 ? (
          <div className="space-y-4">
            {user.experience.map((exp, idx) => (
              <div
                key={idx}
                className="relative border border-amber-700 p-4 rounded-md bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 shadow-md hover:border-purple-600 transition duration-200"
              >
                {isEditablePage && (
                  <div className="absolute top-2 right-2 flex gap-3">
                    <button
                      onClick={() => {
                        setExperienceToEdit(exp);
                        setShowModal(true);
                      }}
                      className="text-amber-400 hover:text-amber-200 hover:scale-110 transition-transform"
                      title="Edit this experience"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setExperienceToEdit(exp);
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

      {showModal && (
        <EditExperience
          user={user}
          experienceToEdit={experienceToEdit}
          onClose={() => setShowModal(false)}
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
