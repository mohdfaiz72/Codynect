import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("Personal");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = isLoginForm ? "login" : "register";
      const payload = isLoginForm
        ? { email, password }
        : { name, email, password };

      const { data } = await axios.post(
        `${BASE_URL}/auth/${endpoint}`,
        payload,
        { withCredentials: true } // ensures cookies (like JWT tokens) are stored
      );

      console.log("Success:", data);
      dispatch(addUser(data.user));
      navigate("/");
    } catch (err) {
      console.error("Error:", err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 rounded-2xl shadow-lg p-6 text-slate-100 border border-amber-800">
        <h2 className="text-center text-2xl font-bold mb-4 text-amber-400 tracking-wide">
          {isLoginForm ? "Login" : "Register"}
        </h2>
        <hr className="text-amber-700 mb-4" />
        <form onSubmit={handleSubmit}>
          {/* <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-amber-300">
              Account Type
            </label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-slate-900 text-amber-300 border border-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="Personal">Personal</option>
              <option value="Professional">Professional</option>
            </select>
          </div> */}

          {!isLoginForm && (
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-amber-300">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-slate-900 text-slate-100 border border-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-amber-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-slate-900 text-slate-100 border border-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div className="mb-6 relative">
            <label className="block mb-1 text-sm font-medium text-amber-300">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 pr-10 rounded-md bg-slate-900 text-slate-100 border border-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-9 right-3 text-amber-300"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-full font-semibold text-slate-900 text-sm bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 hover:from-amber-800 hover:to-amber-700 shadow-md hover:scale-105 transition duration-200"
          >
            {isLoginForm ? "Login" : "Register"}
          </button>
        </form>

        <p
          onClick={() => {
            setIsLoginForm(!isLoginForm);
            setName("");
            setEmail("");
            setPassword("");
          }}
          className="text-center text-sm mt-5 text-amber-400 hover:underline cursor-pointer"
        >
          {isLoginForm
            ? "New user? Register here"
            : "Already have an account? Login here"}
        </p>
      </div>
    </div>
  );
};

export default Login;
