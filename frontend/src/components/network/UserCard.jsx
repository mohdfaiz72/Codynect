import { dummyUser } from "../../utils/dummyUser";
import { Link } from "react-router-dom";

// Assuming onConnect is passed as a prop from the parent Network component
const UserCard = ({ user, onConnect }) => {
  const renderButtons = () => {
    const baseBtn =
      "flex-1 px-3 py-1.5 m-4 rounded-full text-sm font-medium transition duration-200 shadow-sm hover:scale-105";
    switch (user.status) {
      case "new":
        return (
          <div className="flex">
            <button
              onClick={() => onConnect(user)}
              className={`${baseBtn} bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 text-slate-900 hover:from-amber-800 hover:to-amber-700`}
            >
              Connect
            </button>
          </div>
        );
      case "sent":
        return (
          <div className="flex">
            <button
              onClick={() => onConnect(user, "withdraw")}
              className={`${baseBtn} border border-red-500 text-red-400 hover:bg-red-900`}
            >
              Withdraw
            </button>
          </div>
        );
      case "received":
        return (
          <div className="space-y-2">
            <div className="flex gap-2">
              <button
                onClick={() => onConnect(user, "reject")}
                className={`${baseBtn} border border-red-500 text-red-400 hover:bg-red-900`}
              >
                Reject
              </button>
              <button
                onClick={() => onConnect(user, "accept")}
                className={`${baseBtn} bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 text-slate-900 hover:from-amber-800 hover:to-amber-700`}
              >
                Accept
              </button>
            </div>
          </div>
        );
      case "connected":
        return (
          <div className="flex mt-4">
            <button
              className={`${baseBtn} bg-purple-800/70 text-slate-200 hover:bg-purple-800`}
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
    <div className="relative rounded-xl h-70 flex flex-col justify-between overflow-hidden mb-3 bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 border border-amber-700 shadow-md">
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
      <div className="flex flex-col items-center pt-16 text-center px-4">
        {/* Clickable Name */}
        <h3 className="text-amber-300 font-semibold text-sm hover:underline">
          <Link to={`/view-profile/${user._id}`}>{user.name}</Link>
        </h3>

        <p className="text-slate-100 text-sm font-medium">{user.headline}</p>
      </div>

      {renderButtons()}
    </div>
  );
};

export default UserCard;
