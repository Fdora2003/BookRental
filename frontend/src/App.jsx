import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import BookList from "./components/BookList";
import Rent from "./components/Rent";
import UserList from "./components/UserList";
import Return from "./components/Return";

const isAdmin = true;
const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/books" element={ <BookList /> } />
                <Route path="/rent" element={<Rent />} />
                <Route path="/users" element={<UserList />}/>
                <Route path="/return" element={<Return />}/>
                <Route path="/admin" element={<BookList />}/>
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
                    <li><button onClick={() => handleNavigation('/admin')}>Books</button></li>
                    <li><button onClick={() => handleNavigation('/users')}>Books</button></li>
                    <li><button onClick={() => handleNavigation('/rent')}>Rent</button></li>
                    <li><button onClick={() => handleNavigation('/return')}>Books</button></li>

                </>
            </ul>
        </nav>
    );
};

export default App;