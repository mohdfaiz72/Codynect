const UserCard = ({ user, onConnect }) => {
  const renderButtons = () => {
    const baseBtn =
      "flex-1 px-3 py-1.5 rounded-full text-sm font-medium transition duration-200 shadow-sm hover:scale-105";

    switch (user.status) {
      case "new":
        return (
          <div className="flex mt-4">
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
          <div className="flex mt-4">
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
          <div className="mt-4 space-y-2">
            {/* Row 1: Accept and Reject */}
            <div className="flex gap-2">
              <button
                onClick={() => onConnect(user, "accept")}
                className={`${baseBtn} bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 text-slate-900 hover:from-amber-800 hover:to-amber-700`}
              >
                Accept
              </button>
              <button
                onClick={() => onConnect(user, "reject")}
                className={`${baseBtn} border border-red-500 text-red-400 hover:bg-red-900`}
              >
                Reject
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
    <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 border border-amber-700 rounded-2xl shadow-md p-4 hover:shadow-lg transition-all duration-200">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar || "/default-avatar.png"}
          alt={user.name}
          className="w-12 h-12 rounded-full border-2 border-amber-600"
        />
        <div>
          <h3 className="text-amber-300 font-semibold text-sm">{user.name}</h3>
          <p className="text-slate-400 text-xs">{user.title}</p>
          {user.mutual && (
            <p className="text-xs text-amber-400 mt-1">{user.mutual} mutuals</p>
          )}
        </div>
      </div>
      {renderButtons()}
    </div>
  );
};

export default UserCard;
