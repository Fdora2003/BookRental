import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    genre: string;
    isbn: BigInteger;
}

const Rent = () => {
    const [title, setTitle] = useState("");
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [registeredBooks, setRegisteredBooks] = useState<Book[]>([]);

    // @ts-ignore
    const handleBorrow = async () => {
        setResponse("");
        setError("");

        if (!title) {
            setError("Kérlek, add meg a könyv címét!");
            return;
        }
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/rent", {
                method: "PUT",
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title })
            });

            if (res.status === 400) {
                setError("A könyvet már kikölcsönözték.");
            } else if (res.status === 404) {
                setError("A megadott könyv nem található.");
            } else if (res.ok) {
                const data = await res.json();
                setResponse(
                    `You have successfully checked out the book "${data.title}"`
                );
                setRegisteredBooks((prevBooks) =>
                    prevBooks.map((book) =>
                        book.title === data.title ? { ...book, available: false } : book
                    ));
            } else {
                setError("Ismeretlen hiba történt.");
            }
        } catch (err) {
            setError("Hálózati hiba történt.");
            localStorage.removeItem("token");
            navigate("/login");
        }
    };

    useEffect(() => {

        // @ts-ignore
        const fetchRegisteredBooks = async function () {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch("http://localhost:8080/books", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch registered books.");
                }

                const books: Book[] = await response.json();
                setRegisteredBooks(books);
            } catch (err: any) {
                console.error("Error:", err.message);
                setError("Failed to load registered users. Please try again later.");
            }
        };

        fetchRegisteredBooks();
    }, []);



    return (
        <div className="bg-[#D6EFD8] pt-16 pb-2">
            <div className="flex justify-center items-center p-5">
                <div className="max-w-96 min-w-96 text-center text-black bg-[#80AF81] p-6 rounded-xl shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">
                    <h1 className="mb-5 text-2xl font-bold">Borrow a book</h1>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleBorrow();
                        }}
                    >
                        <div>
                            <select
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="p-2 mb-4 border border-gray-300 rounded-md max-w-50px"
                            >
                                <option value="">Choose a book</option>
                                {registeredBooks.filter((book) => book.available).map((book, index) => (
                                    <option key={index} value={book.title}>
                                        {book.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-28 p-2 px-4 bg-[#2b3b2d] hover:bg-[#202b21] text-white rounded"
                        >
                            Borrow
                        </button>
                    </form>
                    {response && <p className="mt-4 font-bold">{response}</p>}
                    {error && <p className=" mt-4 font-bold">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Rent;