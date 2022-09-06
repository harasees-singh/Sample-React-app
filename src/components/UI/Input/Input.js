import React from 'react'
import classes from './Input.module.css'
import { useState, useEffect, useRef, useImperativeHandle } from 'react'
const Input = React.forwardRef(({ inputHandler, type, validCheck, label }, ref) => {
    const [userInput, setuserInput] = useState('');
    const [isValid, setIsValid] = useState(null);
    const inputRef = useRef();

    // we wish to call action from login component
    const action = () => {
        inputRef.current.focus();
    }
    useImperativeHandle(ref, () => {
        // stuff exposed in dis return statement can be controlled by the parent component (which has established a ref over dis component)
        return {
            focus: action
        }
    })  

    useEffect( () => {
        const TimerId = setTimeout( () => {
                setIsValid(userInput.length === 0 ? null : validCheck(userInput));
            }, 500);

            if(isValid) inputHandler();

            // return cleanup func
            return (
                () => {clearTimeout(TimerId)}
            )
        }
    , [userInput, isValid, validCheck, inputHandler])

    const onChange = (event) => {
        setuserInput(event.target.value);
    }
    return(
        
        <div
          className={`${classes.control} ${
            isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor={type}>{label}</label>
          <input
            ref={inputRef}
            type={type}
            id={type}
            value={userInput}
            onChange={onChange}
            onBlur={onChange}
        />
        </div>
    )
})
export default Input;