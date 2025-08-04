import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../common/Loader";
import Header from "../components/Header";

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
      <Header />
      <Outlet />
    </>
  );
};

export default ProtectedRoutes;
