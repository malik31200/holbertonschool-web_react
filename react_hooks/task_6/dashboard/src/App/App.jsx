import { useCallback, useReducer, useEffect } from 'react';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import BodySection from '../BodySection/BodySection';
import axios from 'axios';
import { getLatestNotification } from '../utils/utils';
import { appReducer, initialState, APP_ACTIONS } from './appReducer';

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const {
    displayDrawer,
    user,
    notifications,
    courses,
  } = state;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/notifications.json');
        const notifications = [
          ...response.data,
          {
            id: 3,
            type: 'urgent',
            html: {
              __html: getLatestNotification(),
            },
          },
        ];

        dispatch({
          type: APP_ACTIONS.SET_NOTIFICATIONS,
          notifications,
        });

      } catch (error) {
          console.error(error);
      }
    };

    fetchNotifications();  
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/courses.json');
        dispatch({
          type: APP_ACTIONS.SET_COURSES,
          courses: response.data,
        });
      } catch (error) {
          console.error(error);
      }
    };
    fetchCourses();
  }, [user]);

  const handleDisplayDrawer = useCallback(() => {
    dispatch({
      type: APP_ACTIONS.TOGGLE_DRAWER,
      displayDrawer: true,
    });
  }, []);

  const handleHideDrawer = useCallback(() => {
    dispatch({
      type: APP_ACTIONS.TOGGLE_DRAWER,
      displayDrawer: false,
    });
  }, []);

  const logIn = useCallback((email, password) => {
   
    dispatch({
      type: APP_ACTIONS.LOGIN,
      email,
      password,
    });
  }, []);

  const logOut = useCallback(() => {
    
      dispatch({
        type: APP_ACTIONS.LOGOUT,
      });
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    
      dispatch({
        type: APP_ACTIONS.MARK_NOTIFICATION_READ,
        id,
      });
  }, []);

  return (
    <div className='App flex min-h-screen flex-col box-border px-4 sm:px-8 lg:px-[4%]'>
      <>
        <Notifications
          notifications={notifications}
          displayDrawer={displayDrawer}
          handleDisplayDrawer={handleDisplayDrawer}
          handleHideDrawer={handleHideDrawer}
          markNotificationAsRead={markNotificationAsRead}
        />

        <Header
          user={user}
          logOut={logOut}
        />

        {user.isLoggedIn ? (
          <BodySectionWithMarginBottom title="Course list">
            <CourseList courses={courses} />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title="Log in to continue">
            <Login
              logIn={logIn}
              email={user.email}
              password={user.password}
            />
          </BodySectionWithMarginBottom>
        )}

        <BodySection title="News from the School">
          <p>
            ipsum Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Similique, asperiores architecto
            blanditiis fuga doloribus sit illum aliquid ea
            distinctio minus accusantium, impedit quo voluptatibus
            ut magni dicta. Recusandae, quia dicta?
          </p>
        </BodySection>
      </>
      <Footer user={user} />
    </div>
  );
}
export default App;
