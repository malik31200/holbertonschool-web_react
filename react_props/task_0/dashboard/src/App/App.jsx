import { Fragment } from 'react';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import './App.css';

function App() {

  return (
    <div className='App'>
      <Fragment>
        <Notifications />
        
        <Header />

        <Login />

        <Footer />
      </Fragment>

    </div>
  );
}
export default App;
