import { useState } from "react";
import EditProject from "./EditProject";
import { useSelector, useDispatch } from "react-redux";
import { Pencil, Plus, ArrowLeft, Trash2 } from "lucide-react";
import DeleteConfirmation from "../../../common/DeleteConfirmation";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { addUser } from "../../../store/userSlice";
import { BASE_URL } from "../../../utils/constants";

const ProjectSection = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [projectToUpdate, setProjectToUpdate] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.user);
  const isEditablePage = location.pathname === "/profile/projects-section";

  const dispatch = useDispatch();

  const handleSaveProject = async (formData) => {
    let updatedProjects;
    if (projectToUpdate) {
      updatedProjects = user.projects.map((proj) =>
        proj === projectToUpdate ? formData : proj
      );
    } else {
      updatedProjects = [...(user.projects || []), formData];
    }

    try {
      const res = await axios.patch(
        `${BASE_URL}/user/update-projects`,
        { projects: updatedProjects },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
      alert(projectToUpdate ? "Project updated!" : "Project added!");
      setShowEditModal(false);
    } catch (err) {
      alert("Failed to save: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteProject = async () => {
    const updatedProjects = user.projects.filter(
      (proj) => proj !== projectToUpdate
    );

    try {
      const res = await axios.patch(
        `${BASE_URL}/user/update-projects`,
        { projects: updatedProjects },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
      alert("Project deleted.");
      setShowDeleteModal(false);
      setProjectToUpdate(null);
    } catch (err) {
      alert(
        "Failed to delete: " + (err.response?.data?.message || err.message)
      );
    }
  };

  const handleEdit = (proj) => {
    setProjectToUpdate(proj);
    setShowEditModal(true);
  };

  const handleDeleteClick = (proj) => {
    setProjectToUpdate(proj);
    setShowDeleteModal(true);
  };

  return (
    <>
      <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 border border-amber-700 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-amber-400 text-lg font-semibold">Projects</h2>
          <div className="flex items-center gap-4">
            {user.projects.length > 0 && !isEditablePage && (
              <button
                onClick={() => navigate("/profile/projects-section")}
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
                setProjectToUpdate(null);
                setShowEditModal(true);
              }}
              className="text-amber-400 hover:text-amber-200 hover:scale-110 transition-transform"
              title="Add Project"
            >
              <Plus size={22} />
            </button>
          </div>
        </div>

        {user.projects.length > 0 ? (
          <div className="space-y-4">
            {user.projects.map((proj, idx) => (
              <div
                key={idx}
                className="relative border border-amber-700 rounded-md p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 shadow-md hover:border-purple-600 transition duration-200"
              >
                {isEditablePage && (
                  <div className="absolute top-2 right-2 flex gap-3">
                    <button
                      onClick={() => handleEdit(proj)}
                      className="text-amber-400 hover:text-amber-200 hover:scale-110 transition-transform"
                      title="Edit this project"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(proj)}
                      className="text-red-400 hover:text-red-300 hover:scale-110 transition-transform"
                      title="Delete this project"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}

                <h3 className="text-lg font-semibold text-amber-300">
                  💡 {proj.title}
                </h3>
                <p className="text-sm text-slate-300">{proj.description}</p>

                {proj.techStack?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {proj.techStack.map((tech, tidx) => (
                      <span
                        key={tidx}
                        className="bg-amber-700/70 text-xs px-2 py-1 rounded-full text-amber-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-4 mt-1 text-sm">
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:underline"
                    >
                      🔗 GitHub
                    </a>
                  )}
                  {proj.demo && (
                    <a
                      href={proj.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:underline"
                    >
                      🌐 Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 italic">No project added yet.</p>
        )}
      </div>

      {showEditModal && (
        <EditProject
          user={user}
          projectToEdit={projectToUpdate}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveProject}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmation
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteProject}
          itemName="project section"
        />
      )}
    </>
  );
};

export default ProjectSection;
