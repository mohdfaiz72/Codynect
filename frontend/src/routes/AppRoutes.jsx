import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoutes from "./ProtectedRoutes";

import Login from "../components/Login";
import Home from "../components/home/Home";
import CreatePost from "../components/CreatePost";
import ChatPage from "../components/messaging/ChatPage";
import People from "../components/people/People";
import Profile from "../components/profile/Profile";
import EducationSection from "../components/profile/educationSection/EducationSection";
import ExperienceSection from "../components/profile/experienceSection/ExperienceSection";
import ProjectSection from "../components/profile/projectSection/ProjectSection";
import LanguageSection from "../components/profile/languageSection/LanguageSection";
import CertificationSection from "../components/profile/certificationSection/CertificationSection";
import CodingProfilesSection from "../components/profile/codingProfileSection/CodingProfilesSection";
import SkillsSection from "../components/profile/skillsSection/SkillsSection";
import Loader from "../common/Loader";
import fetchUser from "../utils/fetchUser";
import AboutSection from "../components/profile/aboutSection/AboutSection";

function AppRoutes() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (loading) {
    return <Loader message="Initializing Codynect-App..." />;
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
            <Route path="/network" element={<People />} />

            {/* Nested Profile Routes */}
            <Route path="/profile" element={<Profile />}>
              <Route path="about-section" element={<AboutSection />} />
              <Route path="educations-section" element={<EducationSection />} />
              <Route
                path="experiences-section"
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
