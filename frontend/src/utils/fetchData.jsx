import axios from "axios";
import { BASE_URL } from "./constants";
import { setEducation } from "../store/educationSlice";
import { setExperience } from "../store/experienceSlice";
import { setSkills } from "../store/skillsSlice";
import { setCoding } from "../store/codingSlice";
import { setProject } from "../store/projectSlice";
import { setCertification } from "../store/certificationSlice";
import { setLanguage } from "../store/languageSlice";

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
    ] = await Promise.all([
      axios.get(`${BASE_URL}/v1/education/`, {
        withCredentials: true,
      }),
      axios.get(`${BASE_URL}/v1/experience/`, {
        withCredentials: true,
      }),
      axios.get(`${BASE_URL}/v1/skill/`, {
        withCredentials: true,
      }),
      axios.get(`${BASE_URL}/v1/coding/`, {
        withCredentials: true,
      }),
      axios.get(`${BASE_URL}/v1/project/`, {
        withCredentials: true,
      }),
      axios.get(`${BASE_URL}/v1/certification/`, {
        withCredentials: true,
      }),
      axios.get(`${BASE_URL}/v1/language/`, {
        withCredentials: true,
      }),
    ]);
    dispatch(setEducation(educationRes.data));
    dispatch(setExperience(experienceRes.data));
    dispatch(setSkills(skillRes.data));
    dispatch(setCoding(codingRes.data));
    dispatch(setProject(projectRes.data));
    dispatch(setCertification(certificationRes.data));
    dispatch(setLanguage(languageRes.data));
    {
      console.log(educationRes, experienceRes, skillRes, codingRes, projectRes);
    }
  } catch (err) {
    console.error("Failed to fetch extra data:", err);
  }
};

export default fetchData;
