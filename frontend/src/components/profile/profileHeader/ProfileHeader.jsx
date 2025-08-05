import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Edit, Camera } from "lucide-react";
import { Country, State, City } from "country-state-city";

import EditProfilePhoto from "./EditProfilePhoto";
import EditCoverImage from "./EditCoverImage";
import EditProfile from "./EditProfile";
import { dummyUser } from "../../../utils/dummyUser";

const ProfileHeader = () => {
  const [showEditCoverModal, setShowEditCoverModal] = useState(false);
  const [showEditPhotoModal, setShowEditPhotoModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const user = useSelector((store) => store.user.user);

  const countryName = Country.getCountryByCode(user.address?.country)?.name;
  const stateName = State.getStateByCodeAndCountry(
    user.address?.state,
    user.address?.country
  )?.name;
  const cityName = City.getCitiesOfState(
    user.address?.country,
    user.address?.state
  )?.find(
    (c) => c.name.toLowerCase() === user.address?.city?.toLowerCase()
  )?.name;

  return (
    <div className="relative min-h-[65vh] mb-4 rounded-lg overflow-hidden border border-amber-700 bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900">
      {/* Cover Image */}
      <div className="relative w-full h-48 sm:h-56">
        <img
          src={user.coverImage || dummyUser.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <Camera
          onClick={() => setShowEditCoverModal(true)}
          className="absolute top-3 right-3 text-amber-400 hover:text-amber-200 hover:scale-110 transition-transform cursor-pointer"
          size={24}
          title="Edit Cover Image"
        />
      </div>

      {/* Profile image & info */}
      <div className="relative pl-8 pr-4 pb-6 flex flex-col items-start">
        {/* Profile Image */}
        <img
          src={user.profileImage || dummyUser.profileImage}
          alt={user.name}
          onClick={() => setShowEditPhotoModal(true)}
          className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-3 border-amber-700 bg-slate-900 object-cover cursor-pointer hover:border-purple-600 transition absolute left-8"
          style={{ top: "-100px" }}
        />

        {/* Edit Profile Button */}
        <div className="flex justify-end px-4 mt-2">
          <Edit
            onClick={() => setShowEditProfileModal(true)}
            size={24}
            className="absolute top-3 right-3 text-amber-400 hover:text-amber-200 hover:scale-110 transition-transform cursor-pointer"
          />
        </div>

        {/* Padding to push content below image */}
        <div className="mt-8 sm:mt-10 text-left w-full">
          <h1 className="text-2xl font-bold text-amber-300">{user.name}</h1>
          <p className="text-slate-100 text-lg font-medium">{user.headline}</p>
          <p className="text-slate-300 text-sm">
            {[cityName, stateName, countryName].filter(Boolean).join(", ")}
          </p>

          <p className="text-amber-300 text-sm mt-1">
            Connections: {user.connections ?? 0}
          </p>
        </div>
      </div>

      {/* Modals */}
      {showEditCoverModal && (
        <EditCoverImage onClose={() => setShowEditCoverModal(false)} />
      )}
      {showEditPhotoModal && (
        <EditProfilePhoto onClose={() => setShowEditPhotoModal(false)} />
      )}
      {showEditProfileModal && (
        <EditProfile onClose={() => setShowEditProfileModal(false)} />
      )}
    </div>
  );
};

export default ProfileHeader;
