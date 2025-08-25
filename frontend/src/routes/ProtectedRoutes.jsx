import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import Header from "../components/header/Header";
import ProfileRemover from "../utils/ProfileRemover";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
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
