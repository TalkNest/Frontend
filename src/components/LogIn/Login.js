// src/Login.js
import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import GoogleSignIn from "./GoogleSignIn";
import PasswordReset from "./PasswordReset";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // Access the user from the userCredential
            const user = userCredential.user;

            if(user.emailVerified) {
                console.log('User logged in:', user);
                // Redirect or perform some action upon successful login
            } else {
                console.error('Please verify your email address to log in.');
                // Optionally send another verification email or inform the user
            }

        } catch (error) {
            console.error('Error logging in:', error.message);
        }
    };

    return (
        <div>
            <form onSubmit={login}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Log In</button>
            </form>

            <GoogleSignIn/>
            <PasswordReset/>
        </div>
    );
}

export default Login;