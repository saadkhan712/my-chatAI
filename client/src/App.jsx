import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { FaHome, FaEnvelope, FaCog, FaMoon, FaSun, FaSignOutAlt } from "react-icons/fa";
import { ThemeContext } from "./context/ThemeContext";

import "./App.css";
import Home from "./pages/Home";
import Setting from "./pages/setting";
import Massage from "./pages/Massage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ChatGpt from "./pages/privacyandsequrity";
import Password from "./pages/forget-password";
import Resetpassword from "./pages/Generatepassword";
import ProjectInfo from "./pages/projectInfo";
import Technologies from "./pages/Technologies";
import HelpSupport from "./pages/help&support";
import PrivacySecurity from "./pages/privacyandsequrity";
import UserProfile from "./pages/userPorfile";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser)); // Try to parse JSON
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing user JSON:", error);
        localStorage.removeItem("user"); // Remove corrupted data
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    alert("Logged out successfully!");
    window.location.href = "/login";
  };

  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/registration" element={<Registration setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
      <Route path="/forget-password" element={<Password />} />
      <Route path="/reset-password" element={<Resetpassword />} />

      {/* Redirect if not authenticated */}
      {!isAuthenticated ? (
        <Route path="*" element={<Navigate to="/login" />} />
      ) : (
        <Route
          path="*"
          element={
            <div className="flex">
              {/* Sidebar Navigation */}
              <nav className="w-1/5 bg-[#F8F9FA] dark:bg-gray-900 p-8 text-xl font-semibold h-screen fixed left-0 top-0 flex flex-col justify-between border-r-[1px] border-gray-800">
                <div className="flex-grow">
                  <h1 className="text-[45px] p-3 font-semibold text-purple-600">Chat-AI</h1>
                  <ul className="text-[23px] pt-5">
                    <li>
                      <Link to="/" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded gap-2 hover:text-white">
                        <FaHome /> Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/messages-G5mXkL2vN7TqW9bY1XfKp8zJ3AQ6dV4" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded gap-2 hover:text-white">
                        <FaEnvelope /> Messages
                      </Link>
                    </li>
                    <li>
                      <Link to="/settings" className="flex items-center space-x-2 p-2 hover:bg-gray-700 hover:text-white rounded gap-2">
                        <FaCog /> Settings
                      </Link>
                    </li>
                    <li>
                      <button onClick={toggleTheme} className="bg-gray-600 p-2 rounded-lg dark:bg-gray-700 mr-1">
                        {theme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-300" />}
                      </button>
                      Appearance
                    </li>
                  </ul>
                </div>

                {/* Login Button (Only shows if NOT authenticated) */}
                {!isAuthenticated && (
                  <Link to="/login">
                    <button
                      className="w-full p-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 
                      dark:from-gray-700 dark:to-gray-900 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
                    >
                      🔐 Login Now
                    </button>
                  </Link>
                )}

                {/* Logout Button (Only shows if authenticated) */}
                {isAuthenticated && (
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg w-full justify-center mt-4"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                )}

                <p>{isAuthenticated ? `You are logged in as ${user?.email}` : "Not Logged In"}</p>
              </nav>

              {/* Page Content */}
              <div className="w-4/5 ml-[20%] p-0 overflow-y-auto border-0">
                <Routes>
                  <Route path="/" element={<Home user={user} />} />
                  <Route path="/messages-G5mXkL2vN7TqW9bY1XfKp8zJ3AQ6dV4" element={<Massage />} />
                  <Route path="/settings" element={<Setting />} />
                  <Route path="/chat-gpt" element={<ChatGpt />} />
                  <Route path="/project-info" element={<ProjectInfo />} />
                  <Route path="/technologies" element={<Technologies />} />
                  <Route path="/help-support" element={<HelpSupport />} />
                  <Route path="/privacy-security" element={<PrivacySecurity />} />
                  <Route path="/user-profile" element={<UserProfile />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
            </div>
          }
        />
      )}
    </Routes>
  );
}

export default App;
