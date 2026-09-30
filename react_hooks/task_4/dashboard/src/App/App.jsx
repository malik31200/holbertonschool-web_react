import { useCallback, useState, useEffect } from 'react';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import BodySection from '../BodySection/BodySection';
import newContext from '../Context/context';
import axios from 'axios';
import { getLatestNotification } from '../utils/utils';

function App() {
  const [displayDrawer, setDisplayDrawer] = useState(true);

  const [user, setUser] = useState({
    email: '',
    password: '',
    isLoggedIn: false
  });

  const [notifications, setNotifications] = useState([]);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5173/notifications.json');
        const notifications = [
          ...(Array.isArray(response.data) ? response.data : []),
          {
            id: 3,
            type: 'urgent',
            html: {
              __html: getLatestNotification(),
            }
          }
        ]
        setNotifications(notifications);
      } catch (error) {
          console.error(error);
      }
    };

    fetchNotifications();  
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5173/courses.json');
        setCourses(response.data);
      } catch (error) {
          console.error(error);
      }
    };
    fetchCourses();
  }, [user]);

  const handleDisplayDrawer = useCallback(() => {
    setDisplayDrawer(true);
  }, []);

  const handleHideDrawer = useCallback(() => {
    setDisplayDrawer(false);
  }, []);

  const logIn = useCallback((email, password) => {
   
    setUser({
      email: email,
      password: password,
      isLoggedIn: true
    });
  }, []);

  const logOut = useCallback(() => {
    
      setUser({
        email: '',
        password: '',
        isLoggedIn: false
      });
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification.id !== id
        )
      );
  }, []);

  return (
    <newContext.Provider
      value={{
        displayDrawer,
        user,
        logOut,
        notifications,
        markNotificationAsRead,
      }}
    >

      <div className='App flex min-h-screen flex-col box-border px-4 sm:px-8 lg:px-[4%]'>
        <>
          <Notifications
            notifications={notifications}
            displayDrawer={displayDrawer}
            handleDisplayDrawer={handleDisplayDrawer}
            handleHideDrawer={handleHideDrawer}
            markNotificationAsRead={markNotificationAsRead}
          />

          <Header />

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
        <Footer />
      </div>
    </newContext.Provider>
  );
}
export default App;
