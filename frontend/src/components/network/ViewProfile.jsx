import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../../common/Loader";
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
        const [profileRes, codingRes] = await Promise.all([
          axios.get(`${BASE_URL}/network/profile-view/${id}`, {
            withCredentials: true,
          }),
          axios.get(`${BASE_URL}/coding/get-profile/${id}`, {
            withCredentials: true,
          }),
        ]);

        dispatch(
          setProfile({
            profile: profileRes.data,
            coding: codingRes.data,
          })
        );
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
