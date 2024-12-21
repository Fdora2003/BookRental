import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserList from "./components/UserList";
import BookList from "./components/BookList";


const App = () => {
    return (
      <Router>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/books" element={<BookList />} />
          </Routes>
      </Router>
  );
};

export default App;