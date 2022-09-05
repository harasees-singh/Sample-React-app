import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // dis function inside of useEffect hook is executed by react after rendering the entire component
  // it will only be executed if the second argument (the list) has changed or on a refresh
  // once we login, and hit refresh
  // the entire code is re run and react runs the useEffect hook (since it's a refresh)
  // we check for the storedLoginStatus and find that it's true
  // dis leads to the setting the isLoggedIn state to true
  // and hence react re-renders the code but dis time useEffect hook is not run since the second aregument
  // that is the list doesn't have any changes 
  useEffect( () => {
    const storedLoginStatus = localStorage.getItem('loggedIn');
    if(storedLoginStatus === '1'){
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
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
