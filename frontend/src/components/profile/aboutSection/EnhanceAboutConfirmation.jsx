import { useEffect } from "react";

const EnhanceAboutConfirmation = ({ onClose, enhancedText, onConfirm }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-slate-950 p-6 rounded-xl border border-purple-600 shadow-lg transition-all scrollbar-hide">
        <h2 className="text-xl font-semibold text-purple-400 mb-4">
          Enhanced Confirmation
        </h2>

        <p className="text-slate-300 text-sm mb-4">
          Are you sure you want to enhance your About section?
        </p>

        <div className="bg-slate-900 border border-purple-700 p-4 rounded-md text-slate-200 text-sm max-h-60 overflow-y-auto whitespace-pre-wrap mb-6">
          {enhancedText}
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold rounded-full text-purple-400 border border-purple-600 hover:bg-slate-800 hover:scale-105 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium rounded-full text-slate-950 bg-gradient-to-br from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 hover:scale-105 transition"
          >
            Yes, Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhanceAboutConfirmation;
