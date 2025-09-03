import {
  LogOut,
  Settings,
  User,
  Users,
  ShieldCheck,
  Home,
  MessageCircle,
  Bell,
  PlusSquare,
  LayoutDashboard,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { dummyUser } from "../../utils/dummyUser";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/logout";
import { setShowNotifications } from "../../store/notificationSlice";

const ProfileDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
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
    logout(dispatch, navigate);
  };

  const base =
    "flex items-center gap-2 px-4 py-1 text-sm text-slate-200 hover:text-amber-300 hover:bg-slate-800 rounded-full shadow hover:scale-105 transition duration-200";

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="mt-2 group flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
      >
        <img
          src={user.profileImage || dummyUser.profileImage}
          alt="Profile"
          className="h-7 w-7 rounded-full border-amber-700 border"
        />
        <span className="text-amber-400 hover:text-amber-200 text-xs whitespace-nowrap">
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
              className="flex items-center gap-2 px-4 py-1 font-medium text-slate-900 rounded-full text-sm bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 hover:from-amber-800 hover:to-amber-700 shadow-md hover:scale-105 transition duration-200"
            >
              <User size={16} /> View Profile
            </Link>

            <Link
              to="/"
              onClick={() => {
                dispatch(setShowNotifications(false));
                setIsDropdownOpen(false);
              }}
              className={`${base} block md:hidden`}
            >
              <Home size={16} /> Home
            </Link>

            <Link
              to="/dashboard"
              onClick={() => setIsDropdownOpen(false)}
              className={`${base} block md:hidden`}
            >
              <LayoutDashboard size={16} /> Dashboard
            </Link>

            <Link
              to="/network"
              onClick={() => setIsDropdownOpen(false)}
              className={`${base} block md:hidden`}
            >
              <Users size={16} /> Network
            </Link>

            <Link
              to="/messages"
              onClick={() => setIsDropdownOpen(false)}
              className={`${base} block md:hidden`}
            >
              <MessageCircle size={16} /> Messaging
            </Link>

            <Link
              to="/create"
              onClick={() => setIsDropdownOpen(false)}
              className={`${base} block md:hidden`}
            >
              <PlusSquare size={16} /> Create
            </Link>

            <Link
              to="/"
              onClick={() => {
                dispatch(setShowNotifications(true));
                setIsDropdownOpen(false);
              }}
              className={`${base} block md:hidden`}
            >
              <Bell size={16} /> Notifications
            </Link>

            <Link
              to="/settings"
              onClick={() => setIsDropdownOpen(false)}
              className={base}
            >
              <Settings size={16} /> Settings
            </Link>

            <Link
              to="/privacy"
              onClick={() => setIsDropdownOpen(false)}
              className={base}
            >
              <ShieldCheck size={16} /> Privacy
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-1 text-sm text-red-400 hover:text-red-300 hover:bg-red-900 rounded-full transition shadow hover:scale-105 duration-200"
            >
              {" "}
              <LogOut size={16} /> Log Out{" "}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
