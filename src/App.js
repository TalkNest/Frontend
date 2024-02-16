import logo from './logo.svg';
import './App.css';
import UserComponent from './components/UserComponent';

function App() {
  return (
      <div className="App">
        <header className="App-header">
          {/* Other components or content */}
          <UserComponent/>
          {/* You can place UserComponent wherever you want it to appear on the page */}
        </header>
      </div>
  );
}

export default App;
