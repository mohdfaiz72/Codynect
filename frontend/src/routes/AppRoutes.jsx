import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import { BASE_URL } from "../utils/constants";

import Login from "../components/login/Login";
import Home from "../components/home/Home";
import CreatePost from "../components/post/CreatePost";
import ChatPage from "../components/message/ChatPage";
import Network from "../components/network/Network";
import Profile from "../components/profile/Profile";
import EducationSection from "../components/profile/educationSection/EducationSection";
import ExperienceSection from "../components/profile/experienceSection/ExperienceSection";
import ProjectSection from "../components/profile/projectSection/ProjectSection";
import LanguageSection from "../components/profile/languageSection/LanguageSection";
import CertificationSection from "../components/profile/certificationSection/CertificationSection";
import CodingProfilesSection from "../components/profile/codingProfileSection/CodingProfilesSection";
import SkillsSection from "../components/profile/skillsSection/SkillsSection";
import AboutSection from "../components/profile/aboutSection/AboutSection";
import ViewProfile from "../components/network/ViewProfile";
import Dashboard from "../components/home/Dashboard";
import Loader from "../components/common/Loader";

import fetchData from "../utils/fetchData";
import { connectSocket } from "../utils/socket";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../store/authSlice";
import { setUser } from "../store/userSlice";

function AppRoutes() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const autoLogin = async () => {
      try {
        const res = await axios.post(
          `${BASE_URL}/v1/auth/renew`,
          {},
          { withCredentials: true }
        );
        dispatch(setAccessToken(res.data.accessToken));
        dispatch(setUser(res.data.user));
        //await fetchData(dispatch);
        //connectSocket();
      } catch (err) {
        console.log("Not logged in:", err.message);
      } finally {
        setLoading(false);
      }
    };
    autoLogin();
  }, [dispatch]);

  if (loading) {
    return <Loader message="Checking authentication..." />;
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-14">
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/messages" element={<ChatPage />} />
            <Route path="/network" element={<Network />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/view-profile/:id" element={<ViewProfile />} />

            {/* Nested Profile Routes */}
            <Route path="/profile" element={<Profile />}>
              <Route path="about-section" element={<AboutSection />} />
              <Route path="education-section" element={<EducationSection />} />
              <Route
                path="experience-section"
                element={<ExperienceSection />}
              />
              <Route path="projects-section" element={<ProjectSection />} />
              <Route path="languages-section" element={<LanguageSection />} />
              <Route
                path="certifications-section"
                element={<CertificationSection />}
              />
              <Route
                path="coding-profiles-section"
                element={<CodingProfilesSection />}
              />
              <Route path="skills-section" element={<SkillsSection />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRoutes;
