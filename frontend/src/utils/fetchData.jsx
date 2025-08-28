import { setEducation } from "../store/educationSlice";
import { setExperience } from "../store/experienceSlice";
import { setSkills } from "../store/skillsSlice";
import { setCoding } from "../store/codingSlice";
import { setProject } from "../store/projectSlice";
import { setCertification } from "../store/certificationSlice";
import { setLanguage } from "../store/languageSlice";
import api from "./api";
import { setConversations } from "../store/conversationSlice";

const fetchData = async (dispatch) => {
  try {
    const [
      educationRes,
      experienceRes,
      skillRes,
      codingRes,
      projectRes,
      certificationRes,
      languageRes,
      conversationRes,
    ] = await Promise.all([
      api.get("/v1/education/"),
      api.get("/v1/experience/"),
      api.get("/v1/skill/"),
      api.get("/v1/coding/"),
      api.get("/v1/project/"),
      api.get("/v1/certification/"),
      api.get("/v1/language/"),
      api.get("/v1/message/conversations"),
    ]);
    dispatch(setEducation(educationRes.data));
    dispatch(setExperience(experienceRes.data));
    dispatch(setSkills(skillRes.data));
    dispatch(setCoding(codingRes.data));
    dispatch(setProject(projectRes.data));
    dispatch(setCertification(certificationRes.data));
    dispatch(setLanguage(languageRes.data));
    dispatch(setConversations(conversationRes.data));
  } catch (err) {
    console.error("Failed to fetch extra data:", err);
  }
};

export default fetchData;
