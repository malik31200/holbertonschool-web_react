import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { StyleSheet, css } from 'aphrodite';
import Notifications from './components/Notifications/Notifications';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import CourseList from './pages/CourseList/CourseList';
import BodySectionWithMarginBottom from './components/BodySectionWithMarginBottom/BodySectionWithMarginBottom';
import BodySection from './components/BodySection/BodySection';
import { appReducer, initialState, APP_ACTIONS } from './appReducer';
import { useDispatch } from 'react-redux';
import { fetchNotifications } from './features/notifications/notificationsSlice';

const API_BASE_URL = 'http://localhost:5173';
const ENDPOINTS = {
  courses: `${API_BASE_URL}/courses.json`,
};

const styles = StyleSheet.create({
  app: {
    position: 'relative'
  }
});

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const reduxDispatch = useDispatch();

  useEffect(() => {
    reduxDispatch(fetchNotifications());
  }, [reduxDispatch]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(ENDPOINTS.courses);
        dispatch({ type: APP_ACTIONS.SET_COURSES, payload: response.data.courses });
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    if (!state.user.isLoggedIn) {
      dispatch({ type: APP_ACTIONS.SET_COURSES, payload: [] });
      return;
    }

    fetchCourses();
  }, [state.user.isLoggedIn]);

  const logIn = (email, password) => {
    dispatch({
      type: APP_ACTIONS.LOGIN,
      payload: { email, password }
    });
  };

  const logOut = () => {
    dispatch({ type: APP_ACTIONS.LOGOUT });
  };

  return (
    <div className={css(styles.app)}>
      <Notifications />
      <>
        <Header user={state.user} logOut={logOut} />
        {!state.user.isLoggedIn ? (
          <BodySectionWithMarginBottom title='Log in to continue'>
            <Login
              logIn={logIn}
              email={state.user.email}
              password={state.user.password}
            />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title='Course list'>
            <CourseList courses={state.courses} />
          </BodySectionWithMarginBottom>
        )}
        <BodySection title="News from the School">
          <p>Holberton School news goes here</p>
        </BodySection>
      </>
      <Footer user={state.user} />
    </div>
  );
}
