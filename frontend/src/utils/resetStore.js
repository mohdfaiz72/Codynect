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
import { clearConversation } from "../store/conversationSlice";

export const resetStore = (dispatch) => {
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
  dispatch(clearConversation());
};
