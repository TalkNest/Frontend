import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // Ensure you import your Firebase auth instance correctly

function PasswordReset() {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            alert('Password reset email sent successfully');
        } catch (error) {
            console.error('Error sending password reset email:', error);
            alert('Failed to send password reset email');
        }
    };

    return (
        <div>
            <h3>Reset Password</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                />
                <button type="submit">Send Reset Link</button>
            </form>
        </div>
    );
}

export default PasswordReset;
