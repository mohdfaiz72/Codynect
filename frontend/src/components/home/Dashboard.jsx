import Profile from "./miniProfile/Profile";
import TodoList from "./todoList/TodoList";
import RandomFact from "./randomFact/RandomFact";
import ExploreEvents from "./exploreEvents/ExploreEvents";
import TrendingNews from "./trendingNews/TrendingNews";
import Footer from "./footer/Footer";

const Dashboard = () => {
  return (
    <div className="h-full overflow-y-auto scrollbar-hide">
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
