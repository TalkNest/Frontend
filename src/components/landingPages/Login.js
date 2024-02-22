// src/Login.js
import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './css/bootstrap.min.css';
import './css/fontawesome-all.min.css';
import './css/iofrm-style.css';
import './css/iofrm-theme3.css';
import '../../App.css';
import {Link} from "react-router-dom";
import GoogleSignIn from "./GoogleSignIn";

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
                  <div className="alert alert-warning alert-dismissible fade show with-icon" role="alert">
                    Please fill the following form with your information
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <form onSubmit={login}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="form-control"
                      required
                    />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="form-control"
                      required
                    />
                    <div className="form-button">
                      <button id="submit" type="submit" className="ibtn">Login</button>
                      <Link to="/forgetPassword">Forget password?</Link>
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
}

export default Login;
