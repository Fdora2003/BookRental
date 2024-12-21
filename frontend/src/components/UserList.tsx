import { useEffect, useState } from "react";

interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    role: string | null;
}

const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string>("");

    // Felhasználók lekérése a backendről
    useEffect(() => {
            // @ts-ignore
            const fetchUsers = async () => {
                try {
                    const response = await fetch("http://localhost:8080/users", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (!response.ok) {
                        // A válasz nem sikerült (pl. 404 vagy 500)
                        throw new Error("Failed to fetch users.");
                    }

                    const data: User[] = await response.json();
                    if (data.length === 0) {
                        setError("Nincsenek felhasználók.");
                    } else {
                        setUsers(data); // Beállítjuk a felhasználók listáját
                    }
                } catch (err: any) {
                    // Ha valami hiba történik a fetch során (pl. CORS, hálózati hiba, stb.)
                    setError("Hiba történt a felhasználók lekérésekor.");
                    console.error(err);
                }
            };

            fetchUsers();
        },
        []);

    return (
        <div>
            <h1>Felhasználói lista</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {users.length > 0 ? (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.email}</td>
                            <td>{user.role || "No Role Assigned"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Nincsenek felhasználók.</p>
            )}
        </div>
    );
};

export default UserList;
