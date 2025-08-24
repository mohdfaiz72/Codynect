import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { setProfile } from "../../store/profileSlice";
import Profile from "../profile/Profile";

const ViewProfile = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const [
          userRes,
          educationRes,
          experienceRes,
          skillRes,
          codingRes,
          projectRes,
          certificationRes,
          languageRes,
        ] = await Promise.all([
          axios.get(`${BASE_URL}/v1/user/${id}`, {
            withCredentials: true,
          }),
          axios.get(`${BASE_URL}/v1/education/${id}`, {
            withCredentials: true,
          }),
          axios.get(`${BASE_URL}/v1/experience/${id}`, {
            withCredentials: true,
          }),
          axios.get(`${BASE_URL}/v1/skill/${id}`, {
            withCredentials: true,
          }),
          axios.get(`${BASE_URL}/v1/coding/${id}`, {
            withCredentials: true,
          }),
          axios.get(`${BASE_URL}/v1/project/${id}`, {
            withCredentials: true,
          }),
          axios.get(`${BASE_URL}/v1/certification/${id}`, {
            withCredentials: true,
          }),
          axios.get(`${BASE_URL}/v1/language/${id}`, {
            withCredentials: true,
          }),
        ]);
        const fullProfile = {
          user: userRes.data,
          skills: skillRes.data,
          coding: codingRes.data,
          project: projectRes.data,
          language: languageRes.data,
          education: educationRes.data,
          experience: experienceRes.data,
          certification: certificationRes.data,
        };
        dispatch(setProfile(fullProfile));
        {
          console.log(fullProfile);
        }
      } catch (err) {
        console.error("Fetch profile error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, dispatch]);

  if (loading) {
    return <Loader message="Loading profile..." />;
  }
  return <Profile />;
};

export default ViewProfile;
