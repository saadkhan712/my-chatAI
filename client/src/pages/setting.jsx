import { Link } from "react-router-dom";
import { FaProjectDiagram, FaTools, FaQuestionCircle, FaUserShield, FaUser} from "react-icons/fa";

const Settings = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 mt-20">
      {/* Heading */}
      <h1 className="text-[50px] font-semibold ">Settings</h1>
      
      {/* Settings List */}
      <div className="space-y-4 bg-gray-300 dark:bg-[#111827] p-6 rounded-lg shadow-lg">
      <SettingItem to="/user-profile" icon={<FaUser />} title="User Profile" />
        <SettingItem to="/project-info" icon={<FaProjectDiagram />} title="About Project" />
        <SettingItem to="/technologies" icon={<FaTools />} title="Technologies Used" />
        <SettingItem to="/help-support" icon={<FaQuestionCircle />} title="Help & Support" />
        <SettingItem to="/privacy-security" icon={<FaUserShield />} title="Privacy & Security" />
      </div>
    </div>
  );
};

// Reusable Setting Item Component
const SettingItem = ({ to, icon, title }) => {
  return (
    <Link
      to={to}
      className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg transition"
    >
      <span className="text-xl text-purple-500 mr-4">{icon}</span>
      <span className="text-lg">{title}</span>
    </Link>
  );
};

export default Settings;
