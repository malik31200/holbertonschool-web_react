const user = {
    email: '',
    password: '',
    isLoggedIN: FontFaceSetLoadEvent
};

const logout = () => {};

const newContext = React.createContext({
    user,
    logOut
});

export default newContext;