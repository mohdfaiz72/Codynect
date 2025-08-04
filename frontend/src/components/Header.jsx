import {
  Home,
  Search,
  MessageCircle,
  Bell,
  PlusSquare,
  LogOut,
  Settings,
  User,
  ShieldCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowNotifications } from "../store/notificationSlice";
import codynectLogo from "../assets/codynect-logo.svg";
import { dummyUser } from "../utils/dummyUser";
import { removeUser } from "../store/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.user);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      // // Optional: call backend to clear cookie/session
      // await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Failed to logout. Try again.");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 border-b border-amber-700 rounded-b-xl h-14 px-6 shadow-md flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/">
          <p className="text-2xl font-semibold text-amber-400 leading-none">
            Codynect
          </p>
        </Link>
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

      {/* Navigation Icons */}
      <div
        className="flex items-center mt-2 gap-6 text-amber-400"
        ref={dropdownRef}
      >
        <Link to="/">
          <div
            onClick={() => dispatch(setShowNotifications(false))}
            className="group flex flex-col items-center hover:text-amber-200 hover:scale-110 transition-transform cursor-pointer"
          >
            <Home title="Home" />
            <span className="text-xs">Home</span>
          </div>
        </Link>

        <Link to="/network">
          <div className="group flex flex-col items-center hover:text-amber-200 hover:scale-110 transition-transform cursor-pointer">
            <User title="Network" />
            <span className="text-xs">People</span>
          </div>
        </Link>

        <Link to="/create">
          <div className="group flex flex-col items-center hover:text-amber-200 hover:scale-110 transition-transform cursor-pointer">
            <PlusSquare title="Create Post" />
            <span className="text-xs">Create</span>
          </div>
        </Link>

        <Link to="/messages">
          <div className="group flex flex-col items-center hover:text-amber-200 hover:scale-110 transition-transform cursor-pointer">
            <MessageCircle title="Messages" />
            <span className="text-xs">Message</span>
          </div>
        </Link>

        <Link to="/">
          <div
            onClick={() => dispatch(setShowNotifications(true))}
            className="group flex flex-col items-center hover:text-amber-200 hover:scale-110 transition-transform cursor-pointer"
          >
            <Bell title="Notifications" />
            <span className="text-xs">Notify</span>
          </div>
        </Link>
      </div>

      {/* Profile Dropdown */}
      <div className="relative">
        <div
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="mt-2 group flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
        >
          <img
            src={user.profileImage || dummyUser.profileImage}
            alt="Profile"
            className="h-7 w-7 rounded-full border-amber-700 border"
          />
          <span className="text-amber-400 hover:text-amber-200 text-xs">
            {user.name}
          </span>
        </div>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 text-white rounded-xl shadow-lg z-50 border border-amber-700 p-3">
            <div className="flex flex-col items-center gap-2">
              <img
                src={user.profileImage || dummyUser.profileImage}
                alt="Profile"
                className="w-12 h-12 rounded-full border-amber-700 border"
              />
              <h2 className="text-base font-semibold text-slate-200">
                {user.name}
              </h2>
            </div>

            <div className="mt-3 flex flex-col gap-1">
              <Link
                to="/profile"
                onClick={() => setIsDropdownOpen(false)}
                className=" flex items-center gap-2 px-4 py-1 font-medium text-slate-900 rounded-full text-sm bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 hover:from-amber-800 hover:to-amber-700 shadow-md hover:scale-105 transition duration-200"
              >
                <User size={16} /> View Profile
              </Link>
              <Link
                to="/settings"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-2 px-4 py-1 text-sm text-white hover:text-amber-300 hover:bg-slate-800 rounded-full shadow hover:scale-105 transition duration-200"
              >
                <Settings size={16} /> Settings
              </Link>
              <Link
                to="/privacy"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-2 px-4 py-1 text-sm text-white hover:text-amber-300 hover:bg-slate-800 rounded-full transition shadow hover:scale-105 duration-200"
              >
                <ShieldCheck size={16} /> Privacy
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-1 text-sm text-red-400 hover:text-red-300 hover:bg-red-900 rounded-full transition shadow hover:scale-105 duration-200"
              >
                <LogOut size={16} /> Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
