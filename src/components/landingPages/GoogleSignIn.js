// src/GoogleSignIn.js
import React from 'react';
import { auth } from '../../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from 'firebase/auth';

function GoogleSignIn() {
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(async (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                console.log(result);
                // The signed-in user info.
                const user = result.user;
                console.log('Google Sign in Success:', user);

                // Check if it's the first time this user has logged in
                const { isNewUser } = getAdditionalUserInfo(result);
                if (isNewUser) {
                    // Prepare the user data to send to the backend
                    const userData = {
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName, // Or derive a username as per your app's logic
                        photoURL: user.photoURL,
                        bio: '', // You might not have this information yet
                        location: '' // You might not have this information yet
                    };

                    // Send the user data to your backend API
                    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(userData),
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log('User registration successful', data);
                        })
                        .catch((error) => {
                            console.error('Error in user registration:', error);
                        });
                }

                // You can redirect the user to another page or update the UI accordingly
                console.log("Log in successfully");
            }).catch((error) => {
            // Handle Errors here.
            console.error('Error during Google Sign in', error);
        });
    };

    return (
      <a href="#" onClick={(e) => {
        e.preventDefault(); // Prevent the default anchor action
        signInWithGoogle();
      }} className="ibtn">
        <i className="fab fa-google"></i> Sign in with Google
      </a>
    );
}

export default GoogleSignIn;
