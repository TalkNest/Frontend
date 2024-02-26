import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "./components/landingPages/Login";
import RegisterPage from "./components/landingPages/Register";
import PasswordReset from "./components/landingPages/PasswordReset";
import Home from "./pages/Home";
import React, { useState, useEffect } from 'react';
import {auth} from './firebaseConfig';
import Login from "./components/landingPages/Login";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is logged in
        console.log('User logged in:', user);
        setUser(user);
      } else {
        // No user is logged in
        console.log('No user logged in');
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate replace to="/" />} />
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/forgetPassword" element={<PasswordReset/>}/>
      </Routes>
    </Router>
  );
}

export default App;
