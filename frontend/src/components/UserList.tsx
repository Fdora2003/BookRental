// @ts-ignore
import React, { useState, useEffect } from "react";

interface User {
    id: number;
    username: string;
    email: string;
    role: string; // USER or ADMIN
    password?: string; // Optional field for new/updated users
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [userFormData, setUserFormData] = useState({
        username: "",
        email: "",
        role: "USER",
        password: "", // New field for password
    });
    const [userMessage, setUserMessage] = useState<string | null>(null);
    const [editUserId, setEditUserId] = useState<number | null>(null);
    const [editedUser, setEditedUser] = useState<User | null>(null);

    // Fetch users
    // @ts-ignore
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setUserMessage("Unauthorized. Please log in again.");
                return;
            }

            const response = await fetch("http://localhost:8080/users", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                setUserMessage("Failed to fetch users.");
            }
        } catch (error) {
            console.error(error);
            setUserMessage("Failed to fetch users. Please try again later.");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Handle form changes
    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    // Handle adding a new user
    // @ts-ignore
    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userFormData.username || !userFormData.email || !userFormData.role || !userFormData.password) {
            setUserMessage("All fields are required.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setUserMessage("Unauthorized. Please log in again.");
                return;
            }

            const response = await fetch("http://localhost:8080/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(userFormData),
            });

            if (response.ok) {
                setUserMessage("User added successfully!");
                setUserFormData({ username: "", email: "", role: "USER", password: "" });
                fetchUsers(); // Refresh the list
            } else {
                const errorMessage = await response.text();
                setUserMessage(`Error: ${errorMessage}`);
            }
        } catch (error) {
            console.error(error);
            setUserMessage("Failed to add user. Please try again later.");
        }
    };

    // Handle edit mode
    const handleEditClick = (user: User) => {
        setEditUserId(user.id);
        setEditedUser({ ...user, password: "" }); // Optional password edit
    };

    // Handle editing
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof User) => {
        if (editedUser) {
            setEditedUser({
                ...editedUser,
                [field]: e.target.value,
            });
        }
    };

    const handleCancelEdit = () => {
        setEditUserId(null);
        setEditedUser(null);
    };

    // @ts-ignore
    const handleSaveEdit = async () => {
        if (editedUser) {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setUserMessage("Unauthorized. Please log in again.");
                    return;
                }

                const response = await fetch(`http://localhost:8080/users/${editedUser.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(editedUser),
                });

                if (response.ok) {
                    setUsers((prevUsers) =>
                        prevUsers.map((user) =>
                            user.id === editedUser.id ? editedUser : user
                        )
                    );
                    setUserMessage("User updated successfully!");
                    setEditUserId(null);
                    setEditedUser(null);
                } else {
                    const errorMessage = await response.text();
                    setUserMessage(`Error updating user: ${errorMessage}`);
                }
            } catch (error) {
                console.error(error);
                setUserMessage("Failed to update user. Please try again later.");
            }
        }
    };
    // Handle deleting a user
    // @ts-ignore
    const handleDeleteUser = async (userId: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setUserMessage("Unauthorized. Please log in again.");
                return;
            }

            const response = await fetch(`http://localhost:8080/users/${userId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
                setUserMessage("User deleted successfully!");
            } else {
                const errorMessage = await response.text();
                setUserMessage(`Error deleting user: ${errorMessage}`);
            }
        } catch (error) {
            console.error(error);
            setUserMessage("Failed to delete user. Please try again later.");
        }
    };

    return (
        <div className="p-6 bg-[#d6efd8] min-h-screen">
            {userMessage && <p className="mt-4 text-center text-[#000] font-semibold">{userMessage}</p>}

            <form onSubmit={handleAddUser} className="space-y-4">
                <input
                    type="text"
                    name="username"
                    value={userFormData.username}
                    onChange={handleUserChange}
                    placeholder="Username"
                    className="p-2 border rounded w-full"
                />
                <input
                    type="email"
                    name="email"
                    value={userFormData.email}
                    onChange={handleUserChange}
                    placeholder="Email"
                    className="p-2 border rounded w-full"
                />
                <input
                    type="password"
                    name="password"
                    value={userFormData.password}
                    onChange={handleUserChange}
                    placeholder="Password"
                    className="p-2 border rounded w-full"
                />
                <select
                    name="role"
                    value={userFormData.role}
                    onChange={handleUserChange}
                    className="p-2 border rounded w-full"
                >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                </select>
                <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">Add User</button>
            </form>

            <table className="table-auto w-full mt-6">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        {editUserId === user.id ? (
                            <>
                                <td>
                                    <input
                                        type="text"
                                        value={editedUser?.username || ""}
                                        onChange={(e) => handleInputChange(e, "username")}
                                        className="p-1 border rounded"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="email"
                                        value={editedUser?.email || ""}
                                        onChange={(e) => handleInputChange(e, "email")}
                                        className="p-1 border rounded"
                                    />
                                </td>
                                <td>
                                    <select
                                        value={editedUser?.role || ""}
                                        onChange={(e) => handleInputChange(e, "role")}
                                        className="p-1 border rounded"
                                    >
                                        <option value="USER">User</option>
                                        <option value="ADMIN">Admin</option>
                                    </select>
                                </td>
                                <td>
                                    <button onClick={handleSaveEdit} className="text-blue-500">Save</button>
                                    <button onClick={handleCancelEdit} className="text-gray-500">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button onClick={() => handleEditClick(user)} className="text-green-500">Edit</button>
                                    <button onClick={() => handleDeleteUser(user.id)} className="text-red-500">Delete</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;