import { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../utils/api";
import { setUser } from "../../../store/userSlice";

const EditProfile = ({ onClose }) => {
  const user = useSelector((store) => store.user.user);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    headline: user?.headline || "",
    address: {
      country: user?.address?.country || "IN",
      state: user?.address?.state || "",
      city: user?.address?.city || "",
    },
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    setCountries(Country.getAllCountries());
    const initialCountry = user?.address?.country;
    if (initialCountry) {
      const availableStates = State.getStatesOfCountry(initialCountry);
      setStates(availableStates);
    }
    const initialState = user?.address?.state;
    if (initialCountry && initialState) {
      const availableCities = City.getCitiesOfState(
        initialCountry,
        initialState
      );
      setCities(availableCities);
    }
  }, [user]);

  useEffect(() => {
    if (formData.address.country) {
      const selectedStates = State.getStatesOfCountry(formData.address.country);
      setStates(selectedStates);
    } else {
      setStates([]);
      setCities([]);
    }
  }, [formData.address.country]);

  useEffect(() => {
    if (formData.address.country && formData.address.state) {
      const selectedCities = City.getCitiesOfState(
        formData.address.country,
        formData.address.state
      );
      setCities(selectedCities);
    } else {
      setCities([]);
    }
  }, [formData.address.state, formData.address.country]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "country") {
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          country: value,
          state: "",
          city: "",
        },
      }));
    } else if (name === "state") {
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          state: value,
          city: "",
        },
      }));
    } else if (name === "city") {
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          city: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        headline: formData.headline,
        address: formData.address,
      };

      const res = await api.patch("/v1/user/details", payload);

      dispatch(setUser(res.data.user));
      alert("Profile updated successfully");
      onClose();
    } catch (err) {
      alert("Update failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-slate-950 p-6 rounded-xl border border-amber-700 shadow-lg transition-all">
        <h2 className="text-2xl font-bold text-amber-300 mb-4">Edit Profile</h2>
        <hr className="text-amber-700 mb-3" />

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-amber-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-amber-300 placeholder-amber-400 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 transition-colors duration-200 text-sm"
            />
          </div>

          {/* Headline */}
          <div>
            <label className="block mb-1 text-sm font-medium text-amber-300">
              Headline
            </label>
            <input
              type="text"
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-200 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 transition-colors duration-200 text-sm"
            />
          </div>

          {/* Country, State, City */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Country */}
            <div>
              <label className="block mb-1 text-sm font-medium text-amber-300">
                Country
              </label>
              <select
                name="country"
                value={formData.address.country}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-900 text-amber-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 transition-colors duration-200 text-sm scrollbar-hide"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block mb-1 text-sm font-medium text-amber-300">
                State
              </label>
              <select
                name="state"
                value={formData.address.state}
                onChange={handleChange}
                disabled={!states.length}
                className="w-full px-3 py-2 bg-slate-900 text-amber-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 transition-colors duration-200 text-sm scrollbar-hide"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block mb-1 text-sm font-medium text-amber-300">
                City / District
              </label>
              <select
                name="city"
                value={formData.address.city}
                onChange={handleChange}
                disabled={!cities.length}
                className="w-full px-3 py-2 bg-slate-900 text-amber-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 transition-colors duration-200 text-sm scrollbar-hide"
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-sm font-semibold border border-amber-600 text-amber-300 hover:bg-slate-800 transition duration-200 hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full font-semibold text-sm text-slate-900 bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 hover:from-amber-800 hover:to-amber-700 shadow-md hover:scale-105 transition duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
