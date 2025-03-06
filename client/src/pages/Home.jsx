import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaRobot, FaCode} from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] p-6">
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-0 ">Welcome to</h1>
      <div className="relative flex space-x-1 m-10 mt-0">
      {"Chat-AI".split("").map((char, index) => (
        <span
          key={index}
          className="inline-block text-purple-600 text-[80px] animate-flip"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          {char}
        </span>
      ))}
    </div>
      
      {/* Dashboard Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-10 max-w-3xl">
        <DashboardItem to="/messages-G5mXkL2vN7TqW9bY1XfKp8zJ3AQ6dV4" icon={<FaCode />} title="Generate Code" />
        <DashboardItem to="/messages-G5mXkL2vN7TqW9bY1XfKp8zJ3AQ6dV4" icon={<FaRobot />} title="AI Chat-application" />
      </div>
      
      {/* Project Overview Section */}
      <div className="w-full max-w-3xl bg-none border-[2px] border-gray-600 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">About the Project</h2>
        <p className="text-lg">
        Chat-AI is an intelligent and interactive AI-powered chat application designed to provide seamless conversations with advanced AI capabilities. Whether you need assistance, want to generate creative ideas, or just have a casual chat, Chat-AI is here for you!
        </p>
      </div> 
    </div>
  );
};

// Reusable Dashboard Item Component
const DashboardItem = ({ to, icon, title }) => {
  return (
    <div>
      <Link
        to={to}
        className="flex flex-col items-center justify-center p-6 dark:bg-gray-800 bg-white rounded-lg shadow-lg transition text-center"
      >
        <span className="text-3xl text-purple-400 mb-3">{icon}</span>
        <span className="text-lg font-semibold">{title}</span>
      </Link>
    </div>
  );
};

// PropTypes validation
DashboardItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default Dashboard;
