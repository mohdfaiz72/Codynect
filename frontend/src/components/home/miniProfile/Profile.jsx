import { Link } from "react-router-dom";
import { dummyUser } from "../../../utils/dummyUser";
import { useSelector } from "react-redux";
import { Country, State, City } from "country-state-city";

const Profile = () => {
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
    <div className="relative rounded-lg flex flex-col justify-between min-h-80 overflow-hidden mb-3 bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 border border-amber-700 shadow-md">
      {/* Cover Image */}
      <div
        className="h-24 w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${user.coverImage || dummyUser.coverImage})`,
        }}
      ></div>
      <img
        src={user.profileImage || dummyUser.profileImage}
        alt="Profile"
        className="absolute top-24 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-amber-700"
      />
      <div className="flex flex-col items-center justify-around text-center mt-8 px-4">
        <h3 className="mt-2 text-lg font-semibold text-amber-300 hover:underline">
          <Link to={`/profile`}>{user.name}</Link>
        </h3>
        <p className="text-slate-100 text-sm font-medium">{user.headline}</p>
        <p className="text-slate-400 text-sm">
          {[cityName, stateName, countryName].filter(Boolean).join(", ")}
        </p>
      </div>
      <div className="flex justify-between w-full p-4 text-sm text-slate-400">
        <div className="flex flex-col items-center">
          <span className="font-bold text-slate-200">42</span>
          <span>Posts</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-slate-200">{user.connections}</span>
          <span>Connections</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-slate-200">123</span>
          <span>Profile Views</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
