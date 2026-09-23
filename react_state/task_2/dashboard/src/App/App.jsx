    import React, { Fragment } from 'react';
    import Notifications from '../Notifications/Notifications';
    import Header from '../Header/Header';
    import Login from '../Login/Login';
    import Footer from '../Footer/Footer';
    import CourseList from '../CourseList/CourseList';
    import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
    import BodySection from '../BodySection/BodySection';
    import newContext from '../Context/context';

    class App extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
          displayDrawer: false,
          user: {
            email: '',
            password: '',
            isLoggedIn: false
          },
          logOut: this.logOut
        };
      
        
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
            html: {
              __html: '<strong>Urgent requirement</strong> - complete by EOD',
            }
            
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

      handleDisplayDrawer = () => {
        this.setState({
          displayDrawer: true
        });
      }

      handleHideDrawer = () => {
        this.setState({
          displayDrawer: false
        });
      }

      handleKeyDown = (event) => {
        if (event.ctrlKey && event.key === 'h') {
          alert('Logging you out');
          this.logOut();
        }
      };

      logIn = (email, password) => {
        this.setState({
          user: {
            email: email,
            password: password,
            isLoggedIn: true
          }
        });
      };

      logOut = () => {
        this.setState({
          user: {
            email: '',
            password: '',
            isLoggedIn: false
          }
        });
      };

      componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
      }

      componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
      }

      render () {
        return (
          <newContext.Provider
            value={this.state}
          >
            <div className='App flex min-h-screen flex-col box-border px-4 sm:px-8 lg:px-[4%]'>
              <Fragment>
                <Notifications
                  notifications={this.notificationsList}
                  displayDrawer={this.state.displayDrawer}
                  handleDisplayDrawer={this.handleDisplayDrawer}
                  handleHideDrawer={this.handleHideDrawer}
                />
                
                <Header />

                {this.state.user.isLoggedIn ? (
                  <BodySectionWithMarginBottom title="Course list">
                    <CourseList courses={this.coursesList}/>
                  </BodySectionWithMarginBottom>
                ) : (
                  <BodySectionWithMarginBottom title="Log in to continue">
                    <Login
                      logIn={this.logIn}
                      email={this.state.user.email}
                      password={this.state.user.password}
                    />
                  </BodySectionWithMarginBottom>
                )}

                <BodySection title="News from the School">
                  <p>ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, asperiores architecto blanditiis fuga doloribus sit illum aliquid ea distinctio minus accusantium, impedit quo voluptatibus ut magni dicta. Recusandae, quia dicta?</p>
                </BodySection>

                <Footer />
              </Fragment>

            </div>
          </newContext.Provider>
        );
      }
    }
    export default App;
