import { Home, MessageCircle, Bell, PlusSquare, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { setShowNotifications } from "../../store/notificationSlice";
import { Link } from "react-router-dom";

const NavIcons = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center mt-2 gap-6 text-amber-400">
      <Link
        to="/"
        onClick={() => dispatch(setShowNotifications(false))}
        className="group flex flex-col items-center hover:text-amber-200 hover:scale-110 transition-transform cursor-pointer"
      >
        <Home title="Home" />
        <span className="text-xs">Home</span>
      </Link>

      <Link
        to="/network"
        className="group flex flex-col items-center hover:text-amber-200 hover:scale-110 transition-transform cursor-pointer"
      >
        <User title="Network" />
        <span className="text-xs">Network</span>
      </Link>

      <Link
        to="/create"
        className="group flex flex-col items-center hover:text-amber-200 hover:scale-110 transition-transform cursor-pointer"
      >
        <PlusSquare title="Create Post" />
        <span className="text-xs">Create</span>
      </Link>

      <Link
        to="/messages"
        className="group flex flex-col items-center hover:text-amber-200 hover:scale-110 transition-transform cursor-pointer"
      >
        <MessageCircle title="Messages" />
        <span className="text-xs">Message</span>
      </Link>

      <Link
        to="/"
        onClick={() => dispatch(setShowNotifications(true))}
        className="group flex flex-col items-center hover:text-amber-200 hover:scale-110 transition-transform cursor-pointer"
      >
        <Bell title="Notifications" />
        <span className="text-xs">Notify</span>
      </Link>
    </div>
  );
};

export default NavIcons;
