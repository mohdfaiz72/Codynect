import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pencil, Plus, ArrowLeft, Trash2 } from "lucide-react";
import EditProject from "./EditProject";
import DeleteConfirmation from "../../common/DeleteConfirmation";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../../utils/api";
import {
  addProject,
  updateProject,
  deleteProject,
} from "../../../store/projectSlice";

const ProjectSection = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [projectToUpdate, setProjectToUpdate] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isOwnProfile = useSelector((store) => store.profile.isOwnProfile);
  const projects = isOwnProfile
    ? useSelector((store) => store.project.project)
    : useSelector((store) => store.profile.profile.project);

  const isEditablePage = location.pathname === "/profile/projects";

  // ---------- Add / Update ----------
  const handleSaveProject = async (formData) => {
    try {
      let res;
      if (projectToUpdate) {
        res = await api.patch(`/v1/project/${projectToUpdate._id}`, formData);
        dispatch(updateProject(res.data));
        alert("Project updated!");
      } else {
        res = await api.post("/v1/project/", formData);
        dispatch(addProject(res.data));
        alert("Project added!");
      }
      setShowEditModal(false);
    } catch (err) {
      alert("Failed to save: " + (err.response?.data?.message || err.message));
    }
  };

  // ---------- Delete ----------
  const handleDeleteProject = async () => {
    try {
      await api.delete(`/v1/project/${projectToUpdate._id}`);
      dispatch(deleteProject(projectToUpdate._id));
      alert("Project deleted.");
      setShowDeleteModal(false);
      setProjectToUpdate(null);
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
          <h2 className="text-amber-400 text-lg font-semibold">Projects</h2>
          {isOwnProfile && (
            <div className="flex items-center gap-4">
              {projects.length > 0 && !isEditablePage && (
                <button
                  onClick={() => navigate("/profile/projects")}
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
          )}
        </div>

        {projects.length > 0 ? (
          <div className="space-y-4">
            {projects.map((proj, idx) => (
              <div
                key={idx}
                className="relative border border-amber-700 rounded-md p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 shadow-md hover:border-purple-600 transition duration-200"
              >
                {isEditablePage && (
                  <div className="absolute top-2 right-2 flex gap-3">
                    <button
                      onClick={() => {
                        setProjectToUpdate(proj);
                        setShowEditModal(true);
                      }}
                      className="text-amber-400 hover:text-amber-200 hover:scale-110 transition-transform"
                      title="Edit this project"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setProjectToUpdate(proj);
                        setShowDeleteModal(true);
                      }}
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
                        className="bg-amber-700/70 text-xs px-2 py-0.5 rounded-full text-amber-100"
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
                      className="text-amber-400 hover:underline inline-flex items-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 text-white"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.385.6.113.793-.26.793-.577v-2.234c-3.338.726-4.033-1.612-4.033-1.612-.546-1.386-1.333-1.756-1.333-1.756-1.09-.745.082-.729.082-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.81 1.304 3.495.997.107-.775.418-1.305.76-1.605-2.665-.305-5.467-1.333-5.467-5.93 0-1.31.467-2.382 1.235-3.222-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.49 11.49 0 0 1 3.003-.404c1.02.004 2.045.137 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.654 1.653.243 2.873.12 3.176.77.84 1.233 1.912 1.233 3.222 0 4.61-2.807 5.624-5.48 5.922.43.37.823 1.096.823 2.21v3.285c0 .32.192.694.8.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z"
                          clipRule="evenodd"
                        />
                      </svg>
                      GitHub
                    </a>
                  )}
                  {proj.demo && (
                    <div className="mb-1 text-sm text-blue-400">
                      🔗{" "}
                      <a
                        href={proj.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center hover:underline"
                      >
                        Live Demo
                      </a>
                    </div>
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
