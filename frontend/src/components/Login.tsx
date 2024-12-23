// @ts-ignore
import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';



const Login: React.FC = () => {
    const [username, setUsername] = useState<string>("");  // useState használata
    const [password, setPassword] = useState<string>("");  // useState használata
    const [error, setError] = useState<string | null>(null);  // useState használata
  
    const navigate = useNavigate();  // useNavigate hook

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password}),
            });

            if (!response.ok) {
              throw new Error('Login failed');
            }
            const token = await response.text();
            localStorage.setItem("token", token);
            navigate("/rent");
        } catch (err: any) {
            console.error("Login error:", err.message);
            setError("Invalid username or password. Please try again.");
        }
    };

    return(
        <div className="flex justify-center items-center h-screen w-screen bg-zinc-850 fixed top-0 left-0">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 w-72 bg-[#80AF81] p-6 rounded-xl shadow-lg"
      >
        <h1 className="text-center font-bold text-black mb-5 text-3xl">Login</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded-md w-full text-black"
        /><br/>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded-md w-full text-black"
        /><br/>
        <button
          type="submit"
          className="p-2 bg-[#2A3B2D] hover:bg-[#202B21] text-white rounded-md cursor-pointer"
        >
          Login
        </button>
        <p className="text-center text-black">
          Does not have an account? <br />
          <a href="/register" className="text-blue-700">
            Register here!
          </a>
        </p>
        {error && (
          <p className="mt-2 text-center text-red-600 text-lg font-bold">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;