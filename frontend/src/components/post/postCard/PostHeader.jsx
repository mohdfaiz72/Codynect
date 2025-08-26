import { dummyUser } from "../../../utils/dummyUser";
import { timeAgoFormat } from "../../../utils/timeAgoFormat";

const PostHeader = ({ createdAt, user }) => {
  return (
    <div className="flex items-center gap-3">
      <img
        src={user.profileImage || dummyUser.profileImage}
        alt={`${user.name} profile`}
        className="w-12 h-12 rounded-full object-cover border border-amber-700"
      />
      <div className="flex flex-col w-full overflow-hidden">
        <div className="text-sm font-semibold text-amber-400 leading-tight">
          {user.name}
        </div>
        <div className="text-xs text-gray-400 truncate pr-1">
          {user.headline}
        </div>
        <div className="text-xs text-gray-400">{timeAgoFormat(createdAt)}</div>
      </div>
    </div>
  );
};

export default PostHeader;
