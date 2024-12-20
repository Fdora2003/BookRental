import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000); // Navigálás login oldalra sikeres regisztráció után
    } catch (err: any) {
      console.error("Registration error:", err.message);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 w-80 bg-white p-6 rounded-xl shadow-lg"
      >
        <h1 className="text-center font-bold text-2xl text-gray-800 mb-4">
          Register
        </h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded-md text-gray-700"
        /><br></br>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded-md text-gray-700"
        /><br></br>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded-md text-gray-700"
        /><br></br>

        {error && <p className="text-red-600 text-center">{error}</p>}
        {success && (
          <p className="text-green-600 text-center">
            Registration successful! Redirecting to login...
          </p>
        )}<br></br>

        <button
          type="submit"
          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer"
        >
          Register
        </button>
        <p className="text-center text-gray-700 mt-2">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
