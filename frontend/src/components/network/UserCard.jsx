import { dummyUser } from "../../utils/dummyUser";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedChat } from "../../store/conversationSlice";

const UserCard = ({ user, onConnect, isPending }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleMessage = () => {
    dispatch(setSelectedChat(user._id));
    navigate(`/messages`);
  };
  const renderButtons = () => {
    const baseBtn =
      "flex-1 px-3 py-1.5 rounded-full text-sm font-medium transition duration-200 shadow-sm hover:scale-105";
    switch (user.status) {
      case "new":
        return (
          <div className="flex m-4">
            <button
              onClick={() => onConnect(user._id, "connect")}
              className={`${baseBtn}  hover:from-amber-800 hover:to-amber-700 ${
                isPending
                  ? "opacity-50 cursor-not-allowed shadow-inner border border-amber-700 bg-transparent text-slate-400"
                  : "bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 text-slate-900"
              }`}
            >
              Connect
            </button>
          </div>
        );
      case "sent":
        return (
          <div className="flex m-4">
            <button
              onClick={() => onConnect(user._id, "withdraw")}
              className={`${baseBtn} border border-red-500 text-red-400 ${
                isPending
                  ? "opacity-50 cursor-not-allowed shadow-inner"
                  : "hover:bg-red-900"
              }`}
            >
              Withdraw
            </button>
          </div>
        );
      case "received":
        return (
          <div className="flex m-4">
            <button
              onClick={() => onConnect(user._id, "reject")}
              className={`${baseBtn} border border-red-500 text-red-400 mr-2 ${
                isPending
                  ? "opacity-50 cursor-not-allowed shadow-inner"
                  : "hover:bg-red-900"
              }`}
            >
              Reject
            </button>
            <button
              onClick={() => onConnect(user._id, "accept")}
              className={`${baseBtn}  hover:from-amber-800 hover:to-amber-700 ml-2 ${
                isPending
                  ? "opacity-50 cursor-not-allowed shadow-inner border border-amber-700 bg-transparent text-slate-400"
                  : "bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 text-slate-900"
              }`}
            >
              Accept
            </button>
          </div>
        );
      case "connected":
        return (
          <div className="flex m-4">
            <button
              onClick={() => onConnect(user._id, "disconnect")}
              className={`${baseBtn} border border-red-500 text-red-400 mr-2 ${
                isPending
                  ? "opacity-50 cursor-not-allowed shadow-inner"
                  : "hover:bg-red-900"
              }`}
            >
              Disconnect
            </button>
            <button
              onClick={handleMessage}
              className={`${baseBtn} bg-purple-800/70 text-slate-200 hover:bg-purple-800 ml-2 ${
                isPending ? "opacity-50 cursor-not-allowed shadow-inner" : ""
              }`}
            >
              Message
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative rounded-xl h-75 flex flex-col justify-between overflow-hidden mb-3 bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 border border-amber-700 shadow-md">
      {/* Cover Image */}
      <div
        className="h-20 w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${user.coverImage || dummyUser.coverImage})`,
        }}
      ></div>

      {/* Profile Image */}
      <img
        src={user.profileImage || dummyUser.profileImage}
        alt="Profile"
        className="w-28 h-28 rounded-full border-2 border-amber-700 absolute top-20 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      {/* Profile Section */}
      <div className="flex flex-col items-center pt-14 text-center px-4">
        {/* Clickable Name */}
        <h3 className="text-amber-300 font-semibold text-lg hover:underline">
          <Link to={`/view-profile/${user._id}`}>{user.name}</Link>
        </h3>

        <p className="text-slate-100 text-sm font-medium">{user.headline}</p>
      </div>

      {renderButtons()}
    </div>
  );
};

export default UserCard;
