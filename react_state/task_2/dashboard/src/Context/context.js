const user = {
    email: '',
    password: '',
    isLoggedIN: false
};

const logout = () => {};

const newContext = React.createContext({
    user,
    logOut
});

export default newContext;