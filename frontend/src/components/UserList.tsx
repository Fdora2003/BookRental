import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

interface RegisteredUser {
    id: number;
    username: string;
    email: string;
    role: {
        id: string;
    };
}

const UserList: React.FC = () => {
    const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);
    // const [message, setMessage] = useState<string | null>(null);

    // Fetch registered users
    const fetchRegisteredUsers = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:8080/users", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const users: RegisteredUser[] = await response.json();
                setRegisteredUsers(users);
            } else {
                throw new Error("Failed to fetch registered users.");
            }
        } catch (err: any) {
            console.error("Error:", err.message);
            console.error("Failed to load registered users. Please try again later.");
            // setMessage("Failed to load registered users. Please try again later.");
        }
    };

    // Handle role change
    const handleRoleChange = async (userId: number, newRoleId: number) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:8080/${userId}/role`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ roleId: newRoleId }),
            });

            if (response.ok) {
                console.log("Role updated successfully");
                await fetchRegisteredUsers(); // Refresh the user list
            } else {
                console.error("Failed to update role");
            }
        } catch (error) {
            console.error("Error updating role:", error);
        }
    };

    useEffect(() => {
        fetchRegisteredUsers();
    }, []);

    return (
        <div className="p-6 bg-[#d6efd8] min-h-screen">
            <Navbar/>
            <h1 className="text-center text-2xl font-semibold mb-6">Registered Users</h1>

            {/* Felhasználók listája */}
            <div className="max-w-7xl mx-auto mt-6 overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
                {registeredUsers.length > 0 ? (
                    <table className="table-auto w-full mt-6 border-collapse">
                        <thead className="bg-[#80AF81] text-white">
                        <tr>
                            <th className="px-4 py-2 text-left">ID</th>
                            <th className="px-4 py-2 text-left">Username</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Role</th>
                        </tr>
                        </thead>
                        <tbody>
                        {registeredUsers.map((user) => (
                            <tr key={user.id} className="border-t hover:bg-[#F4F7F6]">
                                <td className="p-2">{user.id}</td>
                                <td className="p-2">{user.username}</td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2">
                                    <select
                                        value={user.role.id}
                                        onChange={(e) =>
                                            handleRoleChange(user.id, Number(e.target.value))
                                        }
                                        className="bg-[#2A3B2D] hover:bg-[#202B21] text-white p-2 rounded w-full text-center text-base"
                                    >
                                        <option value="2">Admin</option>
                                        <option value="1">User</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-[#000] text-center mt-5">No users found.</p>
                )}
            </div>
        </div>
    );
};

export default UserList;