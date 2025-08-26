import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
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
import useAutoLogin from "../utils/useAutoLoigin";

function AppRoutes() {
  const loading = useAutoLogin();
  if (loading) return <Loader message="Initializing Codynect..." />;

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
              <Route path="about" element={<AboutSection />} />
              <Route path="education" element={<EducationSection />} />
              <Route path="experience" element={<ExperienceSection />} />
              <Route path="projects" element={<ProjectSection />} />
              <Route path="languages" element={<LanguageSection />} />
              <Route path="certifications" element={<CertificationSection />} />
              <Route path="coding" element={<CodingProfilesSection />} />
              <Route path="skills" element={<SkillsSection />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRoutes;
