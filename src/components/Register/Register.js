import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { sendEmailVerification } from 'firebase/auth';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Register the user with Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;

            // Prepare user data to send to your backend
            const userData = {
                userId,
                email, // Firebase Authentication already validated and registered this email
                username,
                profilePicture,
                bio,
                location
            };

            await sendEmailVerification(userCredential.user);
            console.log('Verification email sent.');

            // Send the user data to your backend API
            fetch('http://localhost:8383/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input type="text" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} placeholder="Profile Picture URL" />
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio"></textarea>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
