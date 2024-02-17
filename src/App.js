import logo from './logo.svg';
import './App.css';
import UserComponent from './components/UserComponent';
import Login from "./components/LogIn/Login";
import GoogleSignIn from "./components/LogIn/GoogleSignIn";

function App() {

  return (
      <div className="App">
          <Login/>
          <GoogleSignIn />
      </div>
  );
}

export default App;
