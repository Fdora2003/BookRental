import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserList from "./components/UserList";
import BookList from "./components/BookList";
import Rent from "./components/Rent";

const isAdmin = true;
const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/rent" element={<Rent />} />
                <Route path="/books" element={ <BookList /> } />
                <Route path="/users" element={ <UserList /> } />
            </Routes>
        </Router>
    );
};
const NavBar = () => {
    const navigate = useNavigate(); // Hook a navigáláshoz

    const handleNavigation = (path) => {
        navigate(path); // Programozott navigáció
    };

    return (
        <nav>
            <ul>
                <li><button onClick={() => handleNavigation('/rent')}>Rent</button></li>
                {isAdmin && (
                    <>
                        <li><button onClick={() => handleNavigation('/books')}>Books</button></li>
                        <li><button onClick={() => handleNavigation('/users')}>Users</button></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default App;