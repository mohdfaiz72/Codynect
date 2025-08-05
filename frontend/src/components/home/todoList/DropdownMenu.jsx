import { createPortal } from "react-dom";
import { Check, Trash2, Pencil } from "lucide-react";

const DropdownMenu = ({ position, onEdit, onDelete, onDone, showDone }) => {
  const menu = (
    <div
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        zIndex: 9999,
      }}
      className="w-28 bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 text-sm text-white rounded-xl shadow-lg border border-amber-700 p-2"
    >
      <button
        className="w-full flex items-center px-2 py-1 text-sm text-white hover:text-amber-300 hover:bg-slate-800 rounded-full transition shadow hover:scale-105 duration-200"
        onClick={onEdit}
      >
        <Pencil size={14} className="mr-2 text-amber-400" /> Edit
      </button>
      <button
        className="w-full flex items-center px-2 py-1 text-sm text-red-400 hover:text-red-300 hover:bg-red-900 rounded-full transition shadow hover:scale-105 duration-200"
        onClick={onDelete}
      >
        <Trash2 size={14} className="mr-2 text-red-400" /> Delete
      </button>
      {showDone && (
        <button
          className="w-full flex items-center px-2 py-1 text-sm text-slate-200 hover:bg-purple-800 rounded-full transition shadow hover:scale-105 duration-200"
          onClick={onDone}
        >
          <Check size={14} className="mr-2 text-green-400" /> Done
        </button>
      )}
    </div>
  );

  return createPortal(menu, document.body);
};

export default DropdownMenu;
