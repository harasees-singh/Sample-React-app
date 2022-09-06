import { createContext, useEffect, useState } from 'react'


const AuthContext = createContext({
    isLoggedIn: false,
    onLogin: () => {},
    onLogout: (email, password) => {}
})
// write the entire login logic in one component
// we call it AuthContextProvider

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // dis function inside of useEffect hook is executed by react after rendering the entire component
    // it will only be executed if the second argument (the list) has changed or on a refresh
    // once we login, and hit refresh
    // the entire code is re run and react runs the useEffect hook (since it's a refresh)
    // we check for the storedLoginStatus and find that it's true
    // dis leads to the setting the isLoggedIn state to true
    // and hence react re-renders the code but dis time useEffect hook is not run since the second aregument
    // that is the list doesn't have any changes 
    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('loggedIn');
        if (storedLoginStatus === '1') {
            setIsLoggedIn(true);
        }
    }, [])
    const loginHandler = (email, password) => {
        localStorage.setItem('loggedIn', '1');
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.removeItem('loggedIn');
        setIsLoggedIn(false);
    };
    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
export default AuthContext;