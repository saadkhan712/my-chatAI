// import { Link } from "react-router-dom";
// import { useState, useContext } from "react";
// import { FaMoon, FaSun, FaBars } from "react-icons/fa";
// import { ThemeContext } from "../context/ThemeContext";

// const Navbar = () => {
//   const { theme, toggleTheme } = useContext(ThemeContext);
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 flex justify-between items-center shadow-md">
//       {/* Website Name */}
//       <Link to="/" className="text-2xl font-bold text-purple-600">Chat-AI</Link>

//       {/* Right Side */}
//       <div className="flex items-center space-x-4">
//         {/* Theme Toggle Button */}
//         <button onClick={toggleTheme} className="bg-gray-600 p-2 rounded-lg dark:bg-gray-700">
//           {theme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-300" />}
//         </button>

//         {/* Dropdown Menu */}
//         <div className="relative">
//           <button 
//             onClick={() => setIsOpen(!isOpen)} 
//             className="p-2 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
//           >
//             <FaBars />
//           </button>

//           {/* Dropdown Links */}
//           {isOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
//               <Link to="/messages" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">Messages</Link>
//               <Link to="/settings" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">Settings</Link>
//               <Link to="/help-support" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">Help & Support</Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { FaMoon, FaSun, FaBars } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  // Function to close dropdown when an option is clicked
  const closeDropdown = () => setIsOpen(false);

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 flex justify-between items-center shadow-md">
      {/* Website Name */}
      <Link to="/" className="text-4xl font-semibold text-purple-600 ml-20">
        Chat-AI
      </Link>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="bg-gray-600 p-2 rounded-lg dark:bg-gray-700"
        >
          {theme === "dark" ? (
            <FaSun className="text-yellow-400" />
          ) : (
            <FaMoon className="text-gray-300" />
          )}
        </button>

        {/* Dropdown Menu */}
        <div className="relative">
          {/* Dropdown Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
          >
            <FaBars />
          </button>

          {/* Dropdown Links */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
              <Link
                to="/messages"
                onClick={closeDropdown}
                className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Messages
              </Link>
              <Link
                to="/settings"
                onClick={closeDropdown}
                className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Settings
              </Link>
              <Link
                to="/help-support"
                onClick={closeDropdown}
                className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Help & Support
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
