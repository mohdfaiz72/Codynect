import { useEffect } from "react";

const DeleteConfirmation = ({ onClose, onConfirm, itemName = "item" }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-950 p-6 rounded-xl border border-red-600 shadow-lg transition-all">
        <h2 className="text-xl font-bold text-red-400 mb-4">
          Delete Confirmation
        </h2>

        <p className="text-slate-300 mb-6 text-sm">
          Are you sure you want to delete this {itemName}?
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold rounded-full text-red-400 border border-red-600 hover:bg-slate-800 hover:scale-105 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-semibold rounded-full text-slate-950 bg-gradient-to-br from-red-600 to-red-400 hover:scale-105 transition duration-200"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
