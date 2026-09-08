import React, { Fragment } from 'react';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  
    
    this.notificationsList = [
      {
        id: 1,
        type: 'default',
        value: 'New course available',
      },
      {
        id: 2,
        type: 'urgent',
        value: 'New resume available',
      },
      {
        id: 3,
        type: 'urgent',
        __html: '<strong>Urgent requirement</strong> - complete by EOD',
      },
    ];

    this.coursesList = [
      {
        id: 1,
        name: 'ES6',
        credit: 60,
      },
      {
        id: 2,
        name: 'Webpack',
        credit: 20,
      },
      {
        id: 3,
        name: 'React',
        credit: 40,
      },
    ];
  }

  render () {
    const {isLoggedIn = false } = this.props;

    return (
      <div className='App'>
        <Fragment>
          <Notifications notifications={this.notificationsList} />
          
          <Header />

          {isLoggedIn ? (
            <CourseList courses={this.coursesList}/>
          ) : (
            <Login />
          )}

          <Footer />
        </Fragment>

      </div>
    );
  }
}
export default App;
