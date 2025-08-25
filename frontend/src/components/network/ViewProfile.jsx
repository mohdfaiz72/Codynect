import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import api from "../../utils/api"; // centralized axios instance
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
          api.get(`/v1/user/${id}`),
          api.get(`/v1/education/${id}`),
          api.get(`/v1/experience/${id}`),
          api.get(`/v1/skill/${id}`),
          api.get(`/v1/coding/${id}`),
          api.get(`/v1/project/${id}`),
          api.get(`/v1/certification/${id}`),
          api.get(`/v1/language/${id}`),
        ]);

        const fullProfile = {
          user: userRes.data,
          education: educationRes.data,
          experience: experienceRes.data,
          skills: skillRes.data,
          coding: codingRes.data,
          project: projectRes.data,
          certification: certificationRes.data,
          language: languageRes.data,
        };

        dispatch(setProfile(fullProfile));
        console.log(fullProfile);
      } catch (err) {
        console.error("Fetch profile error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, dispatch]);

  if (loading) return <Loader message="Loading profile..." />;

  return <Profile />;
};

export default ViewProfile;
