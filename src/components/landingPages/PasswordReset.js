import React, {useState} from 'react';
import {sendPasswordResetEmail} from 'firebase/auth';
import {auth} from '../../firebaseConfig'; // Ensure you import your Firebase auth instance correctly

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
      <div className="form-body">
        <div className="row">
          <div className="img-holder">
            <div className="bg"></div>
            <div className="info-holder">

            </div>
          </div>
          <div className="form-holder">
            <div className="form-content">
              <div className="form-items">
                <h3>Password Reset</h3>
                <p>To reset your password, enter the email address you use to sign in to iofrm</p>
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                  />
                  <div className="form-button full-width">
                    <button id="submit" type="submit" className="ibtn btn-forget">Send Reset Link</button>
                  </div>
                </form>
              </div>
              <div className="form-sent">
                <div className="tick-holder">
                  <div className="tick-icon"></div>
                </div>
                <h3>Password link sent</h3>
                <p>Please check your inbox iofrm@iofrmtemplate.io</p>
                <div className="info-holder">
                  <span>Unsure if that email address was correct?</span> <a href="#">We can help</a>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
