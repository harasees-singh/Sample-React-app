import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

// how to use useReducer ? 
// const [state, dispatchFn] = useReducer(reducerFn, intitialState, initFn)
// state snapshot, dispatchFn used to dispatch an action eg. trigger a state update, 
// reducerFn is triggered auto when dispatchFn is triggered and receives latest state snapshot and
// should return updated state
// initialState is initial State
// initFn to set the initial state programmatically

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false };
};

const Login = (props) => {
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEamil] = useReducer(emailReducer, { value: '', isValid: null })

  // useEffect(() => {
  //   const TimerId = setTimeout( () => {
  //     // console.log('cleanup')
  //     setFormIsValid(emailState.isValid && enteredPassword.trim().length > 6)
  //   }, 500)

  //   return ( () => {
  //     clearTimeout(TimerId)
  //     // useEffect cleanup function
  //     // runs when component demounts
  //   })
  // }, [emailState, enteredPassword])
  

  const emailChangeHandler = (event) => {
    dispatchEamil( {type : 'USER_INPUT', val : event.target.value} ); // pass in an action

    setFormIsValid(emailState.isValid && enteredPassword.trim().length > 6);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    dispatchEamil( {type: 'INPUT_BLUR'} )
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
