import { useEffect, useState } from "react";

interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    available: boolean;
    isbn: string;
}

const BookList = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string>("");

    // Könyvek lekérése a backendről
    useEffect(() => {
        // @ts-ignore
        const fetchBooks = async () => {
            try {
                const response = await fetch("http://localhost:8080/books", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    // Ha a válasz nem sikerült (pl. 404 vagy 500)
                    throw new Error("Failed to fetch books.");
                }

                const data: Book[] = await response.json();
                if (data.length === 0) {
                    setError("Nincsenek könyvek.");
                } else {
                    setBooks(data); // Beállítjuk a könyvek listáját
                }
            } catch (err: any) {
                // Ha valami hiba történik a fetch során (pl. CORS, hálózati hiba, stb.)
                setError("Hiba történt a könyvek lekérésekor.");
                console.error(err);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div>
            <h1>Könyv lista</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {books.length > 0 ? (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>Available</th>
                        <th>ISBN</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.genre}</td>
                            <td>{book.available ? "Available" : "Not Available"}</td>
                            <td>{book.isbn}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Nincsenek könyvek.</p>
            )}
        </div>
    );
};

export default BookList;
