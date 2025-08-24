import axios from "axios";
import { BASE_URL } from "./constants";
import { disconnectSocket } from "./socket";

// import all clear actions
import { clearUser } from "../store/userSlice";
import { clearTodo } from "../store/todoSlice";
import { clearAuth } from "../store/authSlice";
import { clearSkills } from "../store/skillsSlice";
import { clearCoding } from "../store/codingSlice";
import { clearProfile } from "../store/profileSlice";
import { clearProject } from "../store/projectSlice";
import { clearLanguage } from "../store/languageSlice";
import { clearEducation } from "../store/educationSlice";
import { clearExperience } from "../store/experienceSlice";
import { clearCertification } from "../store/certificationSlice";

export const logout = async (dispatch, navigate) => {
  try {
    // 1. call backend
    await axios.post(`${BASE_URL}/v1/auth/logout`, {});

    // 2. disconnect socket
    disconnectSocket();

    // 3. clear ALL redux slices
    dispatch(clearUser());
    dispatch(clearTodo());
    dispatch(clearAuth());
    dispatch(clearSkills());
    dispatch(clearCoding());
    dispatch(clearProfile());
    dispatch(clearProject());
    dispatch(clearLanguage());
    dispatch(clearEducation());
    dispatch(clearExperience());
    dispatch(clearCertification());

    // 4. navigate
    navigate("/login");
  } catch (err) {
    console.error("Logout failed:", err?.response?.data || err.message);
    alert(err?.response?.data?.message || "Failed to logout. Try again.");
  }
};
