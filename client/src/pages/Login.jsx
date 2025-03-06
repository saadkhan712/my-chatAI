import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";

const isDev = import.meta.env.VITE_APP_ENV === "development";

const Login = ({ setIsAuthenticated, setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const isGuest = localStorage.getItem("guest");

    if (storedToken && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    } else if (isGuest) {
      setIsAuthenticated(true);
      setUser({ email: "Guest", role: "guest" });
    }
  }, [setIsAuthenticated, setUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isDev) {
        const devUser = { email: formData.email };
        localStorage.setItem("token", "dev-token");
        localStorage.setItem("user", JSON.stringify(devUser));
        setIsAuthenticated(true);
        setUser(devUser);
        alert("✅ Login successful!");
        navigate("/");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setIsAuthenticated(true);
      setUser(user);
      alert("✅ Login successful!");
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "❌ Login failed!");
      alert("❌ Login failed! Please check your credentials.");
    }
  };

  const handleSkip = () => {
    localStorage.setItem("guest", "true"); // Mark user as guest
    setIsAuthenticated(true);
    setUser({ email: "Guest", role: "guest" });
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen dark:bg-[#0d0f1a]">
      <div className="dark:bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Fill Your Info..</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-3 dark:bg-gray-700 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mb-3 dark:bg-gray-700 rounded"
            required
          />
          <button type="submit" className="w-full bg-green-600 p-2 rounded hover:bg-green-700 text-black">
            Login
          </button>
        </form>

        <button
          type="button"
          onClick={handleSkip}
          className="w-full bg-gray-300 dark:bg-gray-500 p-2 rounded mt-2 hover:bg-gray-400 dark:text-black"
        >
          Skip
        </button>

        <Link to="/forget-password" className="text-blue-500">
          Forget password?
        </Link>

        <p className="mt-3">
          Don't have an account? <Link to="/registration" className="text-blue-500">Register</Link>
        </p>
      </div>
    </div>
  );
};

Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Login;
