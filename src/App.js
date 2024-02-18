import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/UserComponent";
import LoginPage from "./components/LogIn/Login";
import RegisterPage from "./components/Register/Register";

function App() {

  return (
      <Router>
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
          </Routes>
      </Router>
  );
}

export default App;
