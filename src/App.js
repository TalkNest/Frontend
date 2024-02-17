require('dotenv').config();
import React, { useEffect } from 'react';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Login from "./components/Login";

function App() {
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                console.log('User is signed in:', user);
            } else {
                // User is signed out
                console.log('User is signed out');
            }
        });
    }, []);

    return (
        <div className="App">
            <Login></Login>
        </div>
    );
}

export default App;
