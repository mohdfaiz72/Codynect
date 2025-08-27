import { useSelector } from "react-redux";
import Notifications from "../notification/Notification";
import PostFeed from "../post/PostFeed";
import Profile from "./miniProfile/Profile";
import Footer from "./footer/Footer";
import RandomFact from "./randomFact/RandomFact";
import ExploreEvents from "./exploreEvents/ExploreEvents";
import TrendingNews from "./trendingNews/TrendingNews";
import TodoList from "./todoList/TodoList";
import Dashboard from "./Dashboard";

const Home = () => {
  const showNotifications = useSelector(
    (state) => state.notification.showNotifications
  );

  return (
    <>
      {/* Desktop (>=1024px) */}
      <div className="hidden lg:flex h-screen p-4 gap-4 pt-18">
        {/* Left Sidebar */}
        <div className="w-1/4 h-full overflow-y-auto scrollbar-hide">
          <Profile />
          <TodoList />
          <Footer />
        </div>

        {/* Center Feed */}
        <div className="w-1/2 h-full overflow-y-auto scrollbar-hide">
          {showNotifications ? <Notifications /> : <PostFeed />}
        </div>

        {/* Right Sidebar */}
        <div className="w-1/4 h-full overflow-y-auto scrollbar-hide">
          <RandomFact />
          <ExploreEvents />
          <TrendingNews />
        </div>
      </div>

      {/* Tablet (768px - 1023px) */}
      <div className="hidden md:flex lg:hidden h-screen p-4 gap-4 pt-18">
        {/* Left Sidebar */}
        <Dashboard />
        {/* Right Feed */}
        <div className="flex-1 h-full overflow-y-auto scrollbar-hide">
          {showNotifications ? <Notifications /> : <PostFeed />}
        </div>
      </div>

      {/* Mobile (<768px) */}
      <div className="flex md:hidden h-screen p-4 gap-4 pt-18">
        {/* Center Feed */}
        <div className="h-full max-w-md mx-auto overflow-y-auto scrollbar-hide">
          {showNotifications ? <Notifications /> : <PostFeed />}
        </div>
      </div>
    </>
  );
};

export default Home;
