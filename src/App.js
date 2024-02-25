import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/UserComponent";
import LoginPage from "./components/landingPages/Login";
import RegisterPage from "./components/landingPages/Register";
import PasswordReset from "./components/landingPages/PasswordReset";
import Home from "./pages/Home";
import Search from "./components/chatChannel/Search";
import UserComponent from "./components/UserComponent";
import Chats from "./components/chatChannel/Chats";

function App() {

  return (
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgetPassword" element={<PasswordReset />} />
              <Route path="/user" element={<UserComponent />} />
              <Route path="/chat" element={<Chats />} />
          </Routes>
      </Router>
  );
}

export default App;
