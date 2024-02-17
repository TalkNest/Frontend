// src/GoogleSignIn.js
import React from 'react';
import { auth } from '../../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

function GoogleSignIn() {
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                console.log(result);
                // The signed-in user info.
                const user = result.user;
                console.log('Google Sign in Success:', user);
                // You can redirect the user to another page or update the UI accordingly
            }).catch((error) => {
            // Handle Errors here.
            console.error('Error during Google Sign in', error);
        });
    };

    return (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
    );
}

export default GoogleSignIn;
