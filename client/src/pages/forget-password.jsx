import { useState } from "react";
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            console.error(error);
            setMessage("Error sending request."); 
        }
    };

    return (
        <>
        <div className="flex items-center justify-center h-screen dark:bg-[#0d0f1a]">
        <div className="dark:bg-gray-800 p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-4">Forget Password ?</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} required
              className="w-full p-2 mb-3 dark:bg-gray-700 rounded"
            />
            <button type="submit" className="w-full bg-green-600 p-2 rounded hover:bg-green-700">
              Send Reset Email
            </button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
   </>
    );
};

export default ForgotPassword;
