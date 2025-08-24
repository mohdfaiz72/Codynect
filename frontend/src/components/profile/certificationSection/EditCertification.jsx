import { useEffect, useState } from "react";

const EditCertification = ({ onClose, onSave, certificationToEdit }) => {
  const [formData, setFormData] = useState(
    () =>
      certificationToEdit || {
        title: "",
        issuedBy: "",
        issuedDate: "",
        credentialId: "",
        url: "",
      }
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-slate-950 p-6 rounded-xl border border-amber-700 shadow-lg transition-all">
        <h2 className="text-2xl font-bold text-amber-300 mb-4">
          {certificationToEdit ? "Edit Certification" : "Add Certification"}
        </h2>
        <hr className="text-amber-700 mb-3" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-amber-300">
              Certification Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-amber-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
              placeholder="e.g. AWS Certified Developer"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-amber-300">
              Issue Organization
            </label>
            <input
              type="text"
              name="issuedBy"
              value={formData.issuedBy}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-amber-400 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
              placeholder="e.g. Amazon Web Services"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-amber-300">
              Issue Date
            </label>
            <input
              type="text"
              name="issuedDate"
              value={formData.issuedDate}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
              placeholder="e.g. Aug 2024"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-amber-300">
              Credential ID
            </label>
            <input
              type="text"
              name="credentialId"
              value={formData.credentialId}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
              placeholder="e.g. ABCD-1234"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-amber-300">
              Credential URL
            </label>
            <input
              type="url"
              name="url"
              rel="noreferrer noopener"
              value={formData.url}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm"
              placeholder="https://www.credly.com/..."
              required
            />
          </div>

          <div className="flex justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-sm font-semibold border border-amber-600 text-amber-300 hover:bg-slate-800 transition duration-200 hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full font-semibold text-sm text-slate-900 bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 hover:from-amber-800 hover:to-amber-700 shadow-md hover:scale-105 transition duration-200"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCertification;
