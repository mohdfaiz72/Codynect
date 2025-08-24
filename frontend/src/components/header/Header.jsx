import { Search } from "lucide-react";
import NavIcons from "./NavIcons";
import ProfileDropdown from "./ProfileDropdown";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 border-b border-amber-700 rounded-b-xl h-14 px-6 shadow-md flex justify-between items-center gap-6">
      {/* Logo */}
      <div className="flex items-center">
        <button
          onClick={() => (window.location.href = "/")}
          className="text-2xl font-semibold text-amber-400 leading-none cursor-pointer bg-transparent border-none"
        >
          Codynect
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center border border-amber-700 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 px-3 py-1.5 rounded-md w-72 shadow-inner focus-within:border-purple-600 focus-within:border-2 transition-colors duration-200">
        <Search className="text-amber-400 w-4 h-4 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-slate-200 placeholder-amber-400 w-full text-sm"
        />
      </div>
      <NavIcons />
      <ProfileDropdown />
    </header>
  );
};

export default Header;
