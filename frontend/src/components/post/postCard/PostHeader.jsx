import { timeAgoFormat } from "../../../utils/timeAgoFormat";
import { dummyUser } from "../../../utils/dummyUser";

const PostHeader = ({ createdAt = "2025-08-11T13:00:00Z" }) => {
  return (
    <div className="flex items-center gap-3">
      {/* Profile Image */}
      <img
        src={dummyUser.profileImage}
        alt={`${dummyUser.name} profile`}
        className="w-12 h-12 rounded-full object-cover border border-amber-700"
      />
      {/* User Info */}
      <div className="flex flex-col">
        <div className="text-sm font-semibold text-amber-400 leading-tight">
          {dummyUser.name}
        </div>
        <div className="text-xs text-gray-400 leading-tight">
          {dummyUser.headline}
        </div>
        <div className="text-xs text-gray-400">{timeAgoFormat(createdAt)}</div>
      </div>
    </div>
  );
};

export default PostHeader;
