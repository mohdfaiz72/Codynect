import Profile from "./miniProfile/Profile";
import TodoList from "./todoList/TodoList";
import RandomFact from "./randomFact/RandomFact";
import ExploreEvents from "./exploreEvents/ExploreEvents";
import TrendingNews from "./trendingNews/TrendingNews";
import Footer from "./footer/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        navigate("/", { replace: true });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [navigate]);

  return (
    <div className="w-full max-w-md mx-auto md:w-1/3 md:p-0 p-4 h-full overflow-y-auto scrollbar-hide">
      <Profile />
      <TodoList />
      <RandomFact />
      <ExploreEvents />
      <TrendingNews />
      <Footer />
    </div>
  );
};

export default Dashboard;
