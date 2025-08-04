import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pencil, Plus, ArrowLeft, Trash2 } from "lucide-react";
import EditSkills from "./EditSkills";
import DeleteConfirmation from "../../../common/DeleteConfirmation";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { addUser } from "../../../store/userSlice";
import { BASE_URL } from "../../../utils/constants";

const SkillsSection = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [skillToUpdate, setSkillToUpdate] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.user);
  const isEditablePage = location.pathname === "/profile/skills-section";

  const dispatch = useDispatch();

  const handleSaveSkill = async (formData) => {
    let updatedSkills;
    if (skillToUpdate) {
      updatedSkills = user.skills.map((skill) =>
        skill === skillToUpdate ? formData : skill
      );
    } else {
      updatedSkills = [...(user.skills || []), formData];
    }

    try {
      const res = await axios.patch(
        `${BASE_URL}/user/update-skills`,
        { skills: updatedSkills },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
      alert(skillToUpdate ? "Skill updated!" : "Skill added!");
      setShowEditModal(false);
    } catch (err) {
      alert("Failed to save: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteSkill = async () => {
    const updatedSkills = user.skills.filter(
      (skill) => skill !== skillToUpdate
    );

    try {
      const res = await axios.patch(
        `${BASE_URL}/user/update-skills`,
        { skills: updatedSkills },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
      alert("Skill deleted.");
      setShowDeleteModal(false);
      setSkillToUpdate(null);
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
          <h2 className="text-amber-400 text-lg font-semibold">Skills</h2>
          <div className="flex items-center gap-4">
            {user.skills?.length > 0 && !isEditablePage && (
              <button
                onClick={() => navigate("/profile/skills-section")}
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
                setSkillToUpdate(null);
                setShowEditModal(true);
              }}
              className="text-amber-400 hover:text-amber-200 hover:scale-110 transition-transform"
              title="Add Skills"
            >
              <Plus size={22} />
            </button>
          </div>
        </div>

        {user.skills.length > 0 ? (
          <div className="space-y-4">
            {user.skills.map((skillGroup, idx) => (
              <div
                key={idx}
                className="relative border border-amber-700 p-4 rounded-md bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 shadow-md hover:border-purple-600 transition duration-200"
              >
                {/* Edit & Delete buttons for category */}
                {isEditablePage && (
                  <div className="absolute top-2 right-2 flex gap-3">
                    <button
                      onClick={() => {
                        setSkillToUpdate(skillGroup);
                        setShowEditModal(true);
                      }}
                      className="text-amber-400 hover:text-amber-200 hover:scale-110 transition-transform"
                      title="Edit skill category"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setSkillToUpdate(skillGroup);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-400 hover:text-red-300 hover:scale-110 transition-transform"
                      title="Delete skill category"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}

                {/* Category title */}
                <h3 className="text-md font-semibold text-amber-300 mb-2">
                  🛠️ {skillGroup.category}
                </h3>

                {/* Skill list */}
                <div className="flex flex-wrap gap-2">
                  {skillGroup.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-amber-700/70 text-xs px-2 py-1 rounded-full text-amber-100"
                      title={skill}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 italic">No skills added yet.</p>
        )}
      </div>

      {showEditModal && (
        <EditSkills
          skillToEdit={skillToUpdate}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveSkill}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmation
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteSkill}
          itemName="skill"
        />
      )}
    </>
  );
};

export default SkillsSection;
