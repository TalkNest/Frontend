import React, {useState} from 'react';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebaseConfig';
import {sendEmailVerification} from 'firebase/auth';
import {Link} from "react-router-dom";
import GoogleSignIn from "./GoogleSignIn";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('https://firebasestorage.googleapis.com/v0/b/talknest-22b42.appspot.com/o/User%2FdefaultUserProfile.jpg?alt=media&token=f9398556-8384-46bb-8e43-584116ab06d4');
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
                <h1 className="title">TalkNest</h1>
                <p>Access to each other</p>
                <div className="page-links">
                  <Link to="/login" className="active">Login</Link>
                  <Link to="/register">Register</Link>
                </div>
                <form onSubmit={handleRegister}>
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                         placeholder="Username" required/>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
                         required/>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                         placeholder="Password" required/>
                  <select className="form-control" defaultValue="USA" value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          required>
                    <option value="USA">United States of America</option>
                    <option value="CAN">Canada</option>
                    <option value="MEX">Mexico</option>
                    <option value="GBR">United Kingdom</option>
                    <option value="CHN">China</option>
                  </select>

                  <div className="form-button">
                    <button id="submit" type="submit" className="ibtn">Register</button>
                  </div>
                </form>
                <div className="other-links">
                  <GoogleSignIn/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
