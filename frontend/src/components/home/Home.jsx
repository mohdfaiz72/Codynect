import { useSelector } from "react-redux";
import Notifications from "../Notification";
import PostFeed from "../PostFeed";
import Profile from "./miniProfile/Profile";
import Footer from "./footer/Footer";
import RandomFact from "./randomFact/RandomFact";
import ExploreEvents from "./exploreEvents/ExploreEvents";
import TrendingNews from "./trendingNews/TrendingNews";
import TodoList from "./todoList/TodoList";

const Home = () => {
  const showNotifications = useSelector(
    (state) => state.notification.showNotifications
  );

  return (
    <div className="h-full p-4 flex gap-4 overflow-y-auto scrollbar-hide">
      {/* Left Sidebar */}
      <div className="w-1/4 self-start">
        <Profile />
        <TodoList />
        <Footer />
      </div>

      {/* Center Feed */}
      <div className="w-2/4 h-screen overflow-y-auto scrollbar-hide">
        {showNotifications ? <Notifications /> : <PostFeed />}
      </div>

      {/* Right Sidebar */}
      <div className="w-1/4 self-start">
        <RandomFact />
        <ExploreEvents />
        <TrendingNews />
      </div>
    </div>
  );
};

export default Home;
