import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pencil, Plus, ArrowLeft, Trash2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../../utils/api";
import EditCertification from "./EditCertification";
import DeleteConfirmation from "../../common/DeleteConfirmation";
import {
  addCertification,
  updateCertification,
  deleteCertification,
} from "../../../store/certificationSlice";

const CertificationSection = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [certToUpdate, setCertToUpdate] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isOwnProfile = useSelector((store) => store.profile.isOwnProfile);
  const certifications = isOwnProfile
    ? useSelector((store) => store.certification.certification)
    : useSelector((store) => store.profile.profile.certification);

  const isEditablePage = location.pathname === "/profile/certifications";

  // ---------- Add / Update ----------
  const handleSaveCertification = async (formData) => {
    try {
      let res;
      if (certToUpdate) {
        res = await api.patch(
          `/v1/certification/${certToUpdate._id}`,
          formData
        );
        dispatch(updateCertification(res.data));
        alert("Certification updated!");
      } else {
        res = await api.post("/v1/certification", formData);
        dispatch(addCertification(res.data));
        alert("Certification added!");
      }
      setShowEditModal(false);
      setCertToUpdate(null);
    } catch (err) {
      alert("Failed to save: " + (err.response?.data?.message || err.message));
    }
  };

  // ---------- Delete ----------
  const handleDeleteCertification = async () => {
    try {
      await api.delete(`/v1/certification/${certToUpdate._id}`);
      dispatch(deleteCertification(certToUpdate._id));
      alert("Certification deleted.");
      setShowDeleteModal(false);
      setCertToUpdate(null);
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
            Certifications
          </h2>
          {isOwnProfile && (
            <div className="flex items-center gap-4">
              {certifications.length > 0 && !isEditablePage && (
                <button
                  onClick={() => navigate("/profile/certifications")}
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
                  setCertToUpdate(null);
                  setShowEditModal(true);
                }}
                className="text-amber-400 hover:text-amber-200 hover:scale-110 transition-transform"
                title="Add Certification"
              >
                <Plus size={22} />
              </button>
            </div>
          )}
        </div>

        {certifications.length > 0 ? (
          <div className="space-y-4">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="relative border border-amber-700 p-4 rounded-md bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 shadow-md hover:border-purple-600 transition duration-200"
              >
                {isEditablePage && (
                  <div className="absolute top-2 right-2 flex gap-3">
                    <button
                      onClick={() => {
                        setCertToUpdate(cert);
                        setShowEditModal(true);
                      }}
                      className="text-amber-400 hover:text-amber-200 hover:scale-110 transition-transform"
                      title="Edit this certification"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => {
                        setCertToUpdate(cert);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-400 hover:text-red-300 hover:scale-110 transition-transform"
                      title="Delete this certification"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}

                <h3 className="text-lg font-semibold text-amber-300">
                  📜 {cert.title}
                </h3>
                <p className="text-amber-400 text-sm">
                  Issued by: {cert.issuedBy}
                </p>
                <p className="text-slate-400 text-sm">
                  Issued on: {cert.issuedDate}
                </p>
                <p className="text-slate-400 text-sm">
                  Credential ID: {cert.credentialId}
                </p>
                <div className="mb-1 text-sm text-blue-400">
                  🔗{" "}
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center hover:underline"
                  >
                    Show Credential
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 italic">
            No certifications added yet.
          </p>
        )}
      </div>

      {showEditModal && (
        <EditCertification
          certificationToEdit={certToUpdate}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveCertification}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmation
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteCertification}
          itemName="certification section"
        />
      )}
    </>
  );
};

export default CertificationSection;
