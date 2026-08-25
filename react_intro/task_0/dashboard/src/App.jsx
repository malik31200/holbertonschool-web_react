import logo from './assets/holberton-logo.jpg'
import './App.css'

function App() {

  return (
    <div className='App'>
      <div className='App-header'>
        <img src={logo} alt="holberton logo" />
        <h1>School Dashboard</h1>
      </div>

      <div className='App-body'>
        <p>Login to access the full dashboard</p>
      </div>

      <div className='App-footer'>
        <p>
          Copyright {new Date().getFullYear()} - Holberton School
        </p>
      </div>
    </div>
  );
}
export default App;
