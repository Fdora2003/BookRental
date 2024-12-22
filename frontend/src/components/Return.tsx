import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";

interface RentDto {
    title: string;
}

const Return: React.FC = () => {
    const [rentedBooks, setRentedBooks] = useState<RentDto[]>([]);
    const [selectedBookTitle, setSelectedBookTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const fetchRentedBooks = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:8080/{user}/rented', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const books: RentDto[] = await response.json();
                    setRentedBooks(books);
                } else {
                    console.error('Failed to fetch rented books');
                }
            } catch (error) {
                console.error('Error fetching rented books:', error);
            }
        };

        fetchRentedBooks();
    }, []);

    const handleReturnBook = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!selectedBookTitle) {
            setMessage('Please select a book to return.');
            return;
        }

        const token = localStorage.getItem('token');
        const rentDto: RentDto = { title: selectedBookTitle };

        try {
            const response = await fetch('http://localhost:8080/return', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rentDto),
            });

            if (response.ok) {
                setMessage('Book returned successfully!');
                setSelectedBookTitle('');
            } else {
                setMessage('Failed to return the book.');
            }
        } catch (error) {
            setMessage('Error occurred while returning the book.');
        }
    };

    return (
        <div className="p-6 bg-[#d6efd8] min-h-screen">
            <Navbar/>
            <h1 className="text-2xl text-center font-semibold mb-4">Return a Book</h1>

            <form onSubmit={handleReturnBook} className="space-y-4">
                <div>
                    <select
                        id="bookSelect"
                        value={selectedBookTitle}
                        onChange={(e) => setSelectedBookTitle(e.target.value)}
                        className="p-2 border rounded w-full"
                    >
                        <option value="">Select a Book</option>
                        {rentedBooks.map((book, index) => (
                            <option key={index} value={book.title}>
                                {book.title}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded w-full"
                >
                    Return Book
                </button>
            </form>

            {/* Üzenet megjelenítése */}
            {message && (
                <p className="mt-4 text-center font-semibold">{message}</p>
            )}
        </div>
    );
};

export default Return;
