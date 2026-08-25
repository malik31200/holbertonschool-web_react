import logo from './assets/holberton-logo.jpg';
import './App.css';
import { getCurrentYear, getFooterCopy } from './utils';
import Notifications from './Notifications';

function App() {

  return (
    <div className='App'>
      <Notifications />
      
      <div className='App-header'>
        <img src={logo} alt="holberton logo" />
        <h1>School Dashboard</h1>
      </div>

      <div className='App-body'>
        <p>Login to access the full dashboard</p>
        <label htmlFor="email">Email:</label>
        <input type="email" id='email' />

        <label htmlFor="password">Password:</label>
        <input type="password" id='password' />

        <button>OK</button>
      </div>

      <div className='App-footer'>
        <p>
          Copyright {getCurrentYear()} - {getFooterCopy(true)}
        </p>
      </div>
    </div>
  );
}
export default App;
