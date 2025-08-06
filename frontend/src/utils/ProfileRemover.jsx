import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeProfile } from "../store/profileSlice";

const ProfileRemover = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!location.pathname.startsWith("/view-profile")) {
      dispatch(removeProfile());
    }
  }, [location.pathname, dispatch]);

  return null;
};

export default ProfileRemover;
