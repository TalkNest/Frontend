import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/UserComponent";
import LoginPage from "./components/landingPages/Login";
import RegisterPage from "./components/landingPages/Register";
import PasswordReset from "./components/landingPages/PasswordReset";

function App() {

  return (
      <Router>
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgetPassword" element={<PasswordReset />} />
          </Routes>
      </Router>
  );
}

export default App;
