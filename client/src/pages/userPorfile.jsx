import { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaVenusMars, FaUserShield } from "react-icons/fa";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (!token) {
          setError("No token found. Please log in.");
          setLoading(false);
          return;
        }
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setLoading(false);
          return;
        }

        // 🔹 Fetch from backend if not found in localStorage
        const response = await fetch("http://localhost:3000/api/auth/myinfo", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUser(data);

        // ✅ Save fetched user data
        localStorage.setItem("user", JSON.stringify(data));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading)
    return <p className="text-center text-lg font-semibold">Loading...</p>;

  if (error)
    return <p className="text-center text-red-500 font-semibold">{error}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="max-w-lg w-full p-6 shadow-lg border border-gray-200 rounded-2xl backdrop-blur-md bg-white/70 dark:bg-slate-900">
        <h2 className="text-4xl font-bold text-center mb-6">User Profile</h2>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <FaUser className="text-gray-600" />
            <p className="text-lg font-medium">{user.name}</p>
          </div>

          <div className="flex items-center space-x-3">
            <FaEnvelope className="text-gray-600" />
            <p className="text-lg">{user.email}</p>
          </div>

          <div className="flex items-center space-x-3">
            <FaPhone className="text-gray-600" />
            <p className="text-lg">{user.phone || "N/A"}</p>
          </div>

          <div className="flex items-center space-x-3">
            <FaVenusMars className="text-gray-600" />
            <p className="text-lg">{user.gender || "N/A"}</p>
          </div>

          <div className="flex items-center space-x-3">
            <FaUserShield className="text-gray-600" />
            <p className="text-lg">Role -
              {user.isAdmin ? " Admin" : " User"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
