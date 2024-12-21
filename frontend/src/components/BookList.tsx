// @ts-ignore
import React, { useState, useEffect } from "react";

interface Book {
    id: number;
    title: string;
    author: string;
    isbn: string;
    genre:string;
    available: boolean;
}

const BookList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [bookFormData, setBookFormData] = useState({
        title: "",
        author: "",
        isbn: "",
        genre:"",
        available: true, // Alapértelmezett érték
    });
    const [bookMessage, setBookMessage] = useState<string | null>(null);
    const [editBookId, setEditBookId] = useState<number | null>(null);
    const [editedBook, setEditedBook] = useState<Book | null>(null);

    // Fetch books
    // @ts-ignore
    const fetchBooks = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setBookMessage("Unauthorized. Please log in again.");
                return;
            }

            const response = await fetch("http://localhost:8080/books", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setBooks(data);
            } else {
                setBookMessage("Failed to fetch books.");
            }
        } catch (error) {
            console.error(error);
            setBookMessage("Failed to fetch books. Please try again later.");
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    // Handle form changes
    const handleBookChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBookFormData({ ...bookFormData, [name]: value });
    };

    // Handle adding a new book
    // @ts-ignore
    const handleAddBook = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!bookFormData.title || !bookFormData.author || !bookFormData.isbn) {
            setBookMessage("All fields are required.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setBookMessage("Unauthorized. Please log in again.");
                return;
            }

            const response = await fetch("http://localhost:8080/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(bookFormData),
            });

            if (response.ok) {
                setBookMessage("Book added successfully!");
                setBookFormData({ title: "", author: "", genre: "", isbn: "", available: true });
                fetchBooks(); // Refresh the list
            } else {
                const errorMessage = await response.text();
                setBookMessage(`Error: ${errorMessage}`);
            }
        } catch (error) {
            console.error(error);
            setBookMessage("Failed to add book. Please try again later.");
        }
    };

    // Handle edit mode
    const handleEditClick = (book: Book) => {
        setEditBookId(book.id);
        setEditedBook({ ...book });
    };

    // Handle editing
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof Book) => {
        if (editedBook) {
            setEditedBook({
                ...editedBook,
                [field]: e.target.value,
            });
        }
    };

    const handleCancelEdit = () => {
        setEditBookId(null);
        setEditedBook(null);
    };

    // @ts-ignore
    const handleSaveEdit = async () => {
        if (editedBook) {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setBookMessage("Unauthorized. Please log in again.");
                    return;
                }

                const response = await fetch(`http://localhost:8080/books/${editedBook.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(editedBook),
                });

                if (response.ok) {
                    setBooks((prevBooks) =>
                        prevBooks.map((book) => (book.id === editedBook.id ? editedBook : book))
                    );
                    setBookMessage("Book updated successfully!");
                    setEditBookId(null);
                    setEditedBook(null);
                } else {
                    const errorMessage = await response.text();
                    setBookMessage(`Error updating book: ${errorMessage}`);
                }
            } catch (error) {
                console.error(error);
                setBookMessage("Failed to update book. Please try again later.");
            }
        }
    };

    // Handle deleting a book
    // @ts-ignore
    const handleDeleteBook = async (bookId: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this book?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setBookMessage("Unauthorized. Please log in again.");
                return;
            }

            const response = await fetch(`http://localhost:8080/books/${bookId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
                setBookMessage("Book deleted successfully!");
            } else {
                const errorMessage = await response.text();
                setBookMessage(`Error deleting book: ${errorMessage}`);
            }
        } catch (error) {
            console.error(error);
            setBookMessage("Failed to delete book. Please try again later.");
        }
    };

    return (
        <div className="p-6 bg-[#d6efd8] min-h-screen">
            {bookMessage && <p className="mt-4 text-center text-[#000] font-semibold">{bookMessage}</p>}

            <form onSubmit={handleAddBook} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    value={bookFormData.title}
                    onChange={handleBookChange}
                    placeholder="Book Title"
                    className="p-2 border rounded w-full"
                />
                <input
                    type="text"
                    name="author"
                    value={bookFormData.author}
                    onChange={handleBookChange}
                    placeholder="Author"
                    className="p-2 border rounded w-full"
                />
                <input
                    type="text"
                    name="isbn"
                    value={bookFormData.isbn}
                    onChange={handleBookChange}
                    placeholder="ISBN"
                    className="p-2 border rounded w-full"
                />
                <input
                    type="text"
                    name="genre"
                    value={bookFormData.genre}
                    onChange={handleBookChange}
                    placeholder="Genre"
                    className="p-2 border rounded w-full"
                />
                <select
                    name="available"
                    value={bookFormData.available ? "true" : "false"}
                    onChange={handleBookChange}
                    className="p-2 border rounded w-full"
                >
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                </select>
                <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">Add Book</button>
            </form>

            <table className="table-auto w-full mt-6">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>ISBN</th>
                    <th>Available</th>
                    <th>Genre</th> {/* Új oszlop a műfajhoz */}
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book) => (
                    <tr key={book.id}>
                        {editBookId === book.id ? (
                            <>
                                <td>
                                    <input
                                        type="text"
                                        value={editedBook?.title || ""}
                                        onChange={(e) => handleInputChange(e, "title")}
                                        className="p-1 border rounded"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={editedBook?.author || ""}
                                        onChange={(e) => handleInputChange(e, "author")}
                                        className="p-1 border rounded"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={editedBook?.isbn || ""}
                                        onChange={(e) => handleInputChange(e, "isbn")}
                                        className="p-1 border rounded"
                                    />
                                </td>
                                <td>
                                    <select
                                        value={editedBook?.available ? "true" : "false"}
                                        onChange={(e) => handleInputChange(e, "available")}
                                        className="p-1 border rounded"
                                    >
                                        <option value="true">Available</option>
                                        <option value="false">Not Available</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={editedBook?.genre || ""}
                                        onChange={(e) => handleInputChange(e, "genre")}
                                        className="p-1 border rounded"
                                    />
                                </td>
                                <td>
                                    <button onClick={handleSaveEdit} className="text-blue-500">Save</button>
                                    <button onClick={handleCancelEdit} className="text-gray-500">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.isbn}</td>
                                <td>{book.available ? "Available" : "Not Available"}</td>
                                <td>{book.genre}</td>
                                <td>
                                    <button onClick={() => handleEditClick(book)} className="text-green-500">Edit</button>
                                    <button onClick={() => handleDeleteBook(book.id)} className="text-red-500">Delete</button>
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

export default BookList;
