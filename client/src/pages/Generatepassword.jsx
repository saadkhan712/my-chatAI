import { useState } from "react";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        try {
            const response = await fetch("http://localhost:3000/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();
            if (response.ok) {
                setMessage("Password reset successful. You can now log in.");
            } else {
                setMessage(responseData.message || "Invalid reset code.");
            }
        } catch (error) {
            console.error(error);
            setMessage("Error processing request.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen dark:bg-[#0d0f1a]">
            <div className="dark:bg-gray-800 p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Reset Code */}
                    <input
                        type="text"
                        placeholder="Enter reset code"
                        className="w-full p-2 mb-3 dark:bg-gray-700 rounded"
                        {...register("code", { required: "Reset code is required" })}
                    />
                    {errors.code && <p className="text-red-500">{errors.code.message}</p>}

                    {/* Password Field with Validation */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            className="w-full p-2 mb-3 dark:bg-gray-700 rounded"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 8, message: "Password must be at least 8 characters" },
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: "Must contain 1 uppercase, 1 number, and 1 special character"
                                }
                            })}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2">
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-green-600 p-2 rounded hover:bg-green-700">
                        Reset Password
                    </button>
                </form>

                {/* Message Output */}
                {message && <p className="text-white mt-4">{message}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
 