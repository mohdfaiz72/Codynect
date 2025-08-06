import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pencil, Plus, ArrowLeft, Trash2 } from "lucide-react";
import EditLanguage from "./EditLanguage";
import DeleteConfirmation from "../../../common/DeleteConfirmation";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { addUser } from "../../../store/userSlice";
import { BASE_URL } from "../../../utils/constants";

const LanguageSection = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [languageToUpdate, setLanguageToUpdate] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isOwnProfile = useSelector((store) => store.profile.isOwnProfile);
  const user = isOwnProfile
    ? useSelector((store) => store.user.user)
    : useSelector((store) => store.profile.profile);
  const isEditablePage = location.pathname === "/profile/languages-section";

  const handleSaveLanguage = async (formData) => {
    let updatedLanguages;
    if (languageToUpdate) {
      updatedLanguages = user.languages.map((lang) =>
        lang === languageToUpdate ? formData : lang
      );
    } else {
      updatedLanguages = [...(user.languages || []), formData];
    }

    try {
      const res = await axios.patch(
        `${BASE_URL}/user/update-languages`,
        { languages: updatedLanguages },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      alert(languageToUpdate ? "Language updated!" : "Language added!");
      setShowEditModal(false);
    } catch (err) {
      alert("Failed to save: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteLanguage = async () => {
    const updatedLanguages = user.languages.filter(
      (lang) => lang !== languageToUpdate
    );

    try {
      const res = await axios.patch(
        `${BASE_URL}/user/update-languages`,
        { languages: updatedLanguages },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      alert("Language deleted.");
      setShowDeleteModal(false);
      setLanguageToUpdate(null);
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
          <h2 className="text-amber-400 text-lg font-semibold">Languages</h2>
          {isOwnProfile && (
            <div className="flex items-center gap-4">
              {user.languages.length > 0 && !isEditablePage && (
                <button
                  onClick={() => navigate("/profile/languages-section")}
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
                  setLanguageToUpdate(null);
                  setShowEditModal(true);
                }}
                className="text-amber-400 hover:text-amber-200 hover:scale-110 transition-transform"
                title="Add Language"
              >
                <Plus size={22} />
              </button>
            </div>
          )}
        </div>

        {user.languages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {user.languages.map((lang, idx) => (
              <div
                key={idx}
                className="relative border border-amber-700 p-4 rounded-md bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 shadow-md hover:border-purple-600 transition duration-200 text-sm"
              >
                {isEditablePage && (
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => {
                        setLanguageToUpdate(lang);
                        setShowEditModal(true);
                      }}
                      className="text-amber-400 hover:text-amber-200 hover:scale-110 transition-transform"
                      title="Edit Language"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setLanguageToUpdate(lang);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-400 hover:text-red-300 hover:scale-110 transition-transform"
                      title="Delete Language"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}

                <h3 className="text-base font-semibold text-amber-300">
                  🌐 {lang.name}
                </h3>
                <p className="text-sm text-slate-300">
                  Proficiency:{" "}
                  <span className="text-amber-400">{lang.level}</span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 italic">
            No languages added yet.
          </p>
        )}
      </div>

      {showEditModal && (
        <EditLanguage
          user={user}
          languageToEdit={languageToUpdate}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveLanguage}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmation
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteLanguage}
          itemName="language"
        />
      )}
    </>
  );
};

export default LanguageSection;
