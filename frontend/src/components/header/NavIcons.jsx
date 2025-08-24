import { Home, MessageCircle, Bell, PlusSquare, Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setShowNotifications } from "../../store/notificationSlice";
import { setSelectedChatId } from "../../store/conversationSlice";
import { NavLink } from "react-router-dom";

const NavIcons = () => {
  const showNotifications = useSelector(
    (state) => state.notification.showNotifications
  );
  const dispatch = useDispatch();
  const base =
    "group flex flex-col items-center hover:text-amber-200 hover:scale-110 transition-transform cursor-pointer";

  return (
    <div className="hidden md:flex items-center mt-2 gap-5">
      <NavLink
        to="/"
        onClick={() => dispatch(setShowNotifications(false))}
        className={({ isActive }) =>
          `${base} ${
            isActive && !showNotifications ? "text-amber-200" : "text-amber-400"
          }`
        }
      >
        <Home title="Home" />
        <span className="text-xs">Home</span>
      </NavLink>

      <NavLink
        to="/network"
        className={({ isActive }) =>
          `${base} ${isActive ? "text-amber-200" : "text-amber-400"}`
        }
      >
        <Users title="Network" />
        <span className="text-xs">Network</span>
      </NavLink>

      <NavLink
        to="/create"
        className={({ isActive }) =>
          `${base} ${isActive ? "text-amber-200" : "text-amber-400"}`
        }
      >
        <PlusSquare title="Create Post" />
        <span className="text-xs">Create</span>
      </NavLink>

      <NavLink
        to="/messages"
        onClick={() => dispatch(setSelectedChatId(null))}
        className={({ isActive }) =>
          `${base} ${isActive ? "text-amber-200" : "text-amber-400"}`
        }
      >
        <MessageCircle title="Messaging" />
        <span className="text-xs">Message</span>
      </NavLink>

      <NavLink
        to="/"
        onClick={() => dispatch(setShowNotifications(true))}
        className={({ isActive }) =>
          `${base} ${
            isActive && showNotifications ? "text-amber-200" : "text-amber-400"
          }`
        }
      >
        <Bell title="Notifications" />
        <span className="text-xs">Notify</span>
      </NavLink>
    </div>
  );
};

export default NavIcons;
