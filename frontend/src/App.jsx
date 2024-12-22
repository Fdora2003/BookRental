import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import BookList from "./components/BookList";
import Rent from "./components/Rent";

const isAdmin = true;
const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/books" element={ <BookList /> } />
                <Route path="/rent" element={<Rent />} />
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
                <>
                    <li><button onClick={() => handleNavigation('/books')}>Books</button></li>
                    <li><button onClick={() => handleNavigation('/rent')}>Rent</button></li>
                </>
            </ul>
        </nav>
    );
};

export default App;