import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import useFetchData from "../utils/useFetchData";

import Login from "../components/Login";
import Home from "../components/home/Home";
import CreatePost from "../components/post/CreatePost";
import ChatPage from "../components/messaging/ChatPage";
import Network from "../components/network/Network";
import Profile from "../components/profile/Profile";
import EducationSection from "../components/profile/educationSection/EducationSection";
import ExperienceSection from "../components/profile/experienceSection/ExperienceSection";
import ProjectSection from "../components/profile/projectSection/ProjectSection";
import LanguageSection from "../components/profile/languageSection/LanguageSection";
import CertificationSection from "../components/profile/certificationSection/CertificationSection";
import CodingProfilesSection from "../components/profile/codingProfileSection/CodingProfilesSection";
import SkillsSection from "../components/profile/skillsSection/SkillsSection";
import Loader from "../common/Loader";
import AboutSection from "../components/profile/aboutSection/AboutSection";
import ViewProfile from "../components/network/ViewProfile";

function AppRoutes() {
  const { initialLoading } = useFetchData();

  if (initialLoading) {
    return <Loader message="Initializing Codynect..." />;
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
