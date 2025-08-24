import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import Header from "../components/header/Header";
import ProfileRemover from "../utils/ProfileRemover";

const ProtectedRoutes = () => {
  const { user, loading } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/login");
      }
      setCheckedAuth(true);
    }
  }, [loading, user, navigate]);

  if (loading || !checkedAuth) {
    return <Loader message="Checking authentication..." />;
  }

  return (
    <>
      <ProfileRemover />
      <Header />
      <Outlet />
    </>
  );
};

export default ProtectedRoutes;
