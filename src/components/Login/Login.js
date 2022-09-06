import React, { useState, useEffect, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';
// how to use useReducer ? 
// const [state, dispatchFn] = useReducer(reducerFn, intitialState, initFn)
// state snapshot, dispatchFn used to dispatch an action eg. trigger a state update, 
// reducerFn is triggered auto when dispatchFn is triggered and receives latest state snapshot and
// should return updated state
// initialState is initial State
// initFn to set the initial state programmatically


const Login = (props) => {
  const ctx = useContext(AuthContext);

  const [formIsValid, setFormIsValid] = useState(false);

  const [EmailValidation, setEmailValidation] = useState(null);
  const [PasswordValidation, setPasswordValidation] = useState(null);

  useEffect( () => {
    setFormIsValid(EmailValidation && PasswordValidation);
  }, [EmailValidation, PasswordValidation])

  const EmailValidationHandler = () => {
    setEmailValidation(true);
  }

  const PasswordValidationHandler = () => {
    setPasswordValidation(true);
  }

  const emailValidCheck = (email) => {
    if(email.length === 0) setEmailValidation(null);
    else setEmailValidation(email.includes('@'));
    return(email.includes('@'));
  }
  const passwordValidCheck = (password) => {
    if(password.length === 0) setPasswordValidation(null);
    else setPasswordValidation(password.length > 6);
    return(password.length > 6);
  }
  
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid)
      ctx.onLogin('email', 'password');
    else if(!EmailValidation)
      emailInputRef.current.focus();
    else if(!PasswordValidation)
      passwordInputRef.current.focus();
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          ref = {emailInputRef}
          type = 'email'
          inputHandler={EmailValidationHandler}
          validCheck={emailValidCheck}
          id='email'
          label='Email'
        />
        <Input 
          ref = {passwordInputRef}
          type='password'
          inputHandler={PasswordValidationHandler}
          validCheck={passwordValidCheck}
          id='password'
          label='Password'
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
