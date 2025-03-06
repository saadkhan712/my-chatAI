import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";

const Registration = ({ setIsAuthenticated, setUser }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

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

    const onSubmit = async (formData) => {
        try {
            const response = await fetch("http://localhost:3000/api/auth/registration", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.status === 201) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                setIsAuthenticated(true);
                setUser(data.user);

                alert("✅ Registration successful!");
                setTimeout(() => navigate("/"), 500);
            } else if (response.status === 400 && data.message === "Email already exists") {
                alert("❌ This email is already registered. Please use a different email.");
            } else {
                alert(`❌ Registration failed: ${data.message || "Try using a different email"}`);
            }
        } catch (error) {
            alert(`❌ Error: ${error.message}`);
        }
    };

    const handleSkip = () => {
        localStorage.setItem("guest", "true"); // Mark user as guest
        setIsAuthenticated(true);
        setUser({ email: "Guest", role: "guest" });
        navigate("/");
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 dark:bg-[#0d0f1a]">
            <div className="sm:w-[90%] md:w-[60%] lg:w-[40%] mx-auto p-6 sm:p-8 dark:bg-gray-800 shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 text-center">Register Yourself</h2>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input 
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-2 rounded-lg dark:bg-gray-700"
                            {...register("email", { required: "Email is required" })} 
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>

                    <div>
                        <input 
                            type="text"
                            placeholder="Enter your name"
                            className="w-full p-2 rounded-lg dark:bg-gray-700"
                            {...register("name", { required: "Name is required" })} 
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>

                    <div>
                        <input 
                            type="text"
                            placeholder="Enter your phone number"
                            className="w-full p-2 rounded-lg dark:bg-gray-700"
                            {...register("phone", { required: "Phone number is required" })} 
                        />
                        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                    </div>

                    <div>
                        <select className="w-full p-2 rounded-lg dark:bg-gray-700" {...register("gender")}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full p-2 rounded-lg dark:bg-gray-700"
                                {...register("password", { required: "Password is required" })} 
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2 text-sm">
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>

                    <button type="submit" className="w-full p-2 bg-green-600 rounded-lg hover:bg-green-700 transition">
                        Submit
                    </button>
                </form>

                <button
                    type="button"
                    onClick={handleSkip}
                    className="w-full bg-gray-300 dark:bg-gray-500 p-2 rounded mt-2 hover:bg-gray-400 transition dark:text-black"
                >
                    Skip
                </button>

                <p className="mt-3 text-center">
                    Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
                </p>
            </div>
        </div>
    );
};

Registration.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
};

export default Registration;
