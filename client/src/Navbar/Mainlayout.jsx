import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar"; // Adjust the path if needed

const MainLayout = () => {
  const location = useLocation();
  const authPages = ["/login", "/registration", "/forget-password", "/reset-password"];

  return (
    <div>
      {/* Show Navbar only if the user is NOT on an authentication page */}
      {!authPages.includes(location.pathname) && <Navbar />}
      <Outlet /> {/* Renders the current page */}
    </div>
  );
};

export default MainLayout;
