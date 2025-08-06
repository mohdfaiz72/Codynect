import { Outlet, useLocation } from "react-router-dom";
import ProfileHeader from "./profileHeader/ProfileHeader";
import AboutSection from "./aboutSection/AboutSection";
import EducationSection from "./educationSection/EducationSection";
import ExperienceSection from "./experienceSection/ExperienceSection";
import ProjectSection from "./projectSection/ProjectSection";
import LanguageSection from "./languageSection/LanguageSection";
import CertificationSection from "./certificationSection/CertificationSection";
import CodingProfilesSection from "./codingProfileSection/CodingProfilesSection";
import SkillsSection from "./skillsSection/SkillsSection";

const Profile = () => {
  const location = useLocation();
  const isBaseProfile =
    location.pathname === "/profile" ||
    location.pathname.startsWith("/view-profile/");

  return (
    <div className="max-w-4xl mx-auto px-3 py-4 text-slate-200">
      {isBaseProfile ? (
        <>
          <ProfileHeader />
          <AboutSection />
          <EducationSection />
          <ExperienceSection />
          <SkillsSection />
          <ProjectSection />
          <CodingProfilesSection />
          <LanguageSection />
          <CertificationSection />
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Profile;
