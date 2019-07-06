import React from 'react';
import './Input.scss';

const input = (props) => {
    let inputClass = ["Input"];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClass.push("Invalid")
    }
    const handleEnter = (e) => {
        if(e.key === "Enter" && props.canSubmitForm) {
            props.submit()
        }
    }
    if (props.elementFrame.type === 'password') {
        let passwordInput = React.createRef();
        let spanButton = React.createRef();
        const showPasswordHandler = () => {
        if (passwordInput.current.type === "text") {
            passwordInput.current.type = "password";
            spanButton.current.textContent = "SHOW"
        } else if(passwordInput.current.type === "password") {
            passwordInput.current.type = "text";
            spanButton.current.textContent = "HIDE"
        }
    }
        return (
            <div className="InputHolder">
            <input className={inputClass.join(' ')} onChange={props.changed} {...props.elementFrame} ref={passwordInput} onKeyPress={handleEnter}/>
            <span onClick={showPasswordHandler} ref={spanButton}>SHOW</span>
            <label className="Label">Password</label>
        </div>
        )
    }

    return (
        <div className="InputHolder">
            <input  className={inputClass.join(' ')} onChange={props.changed} {...props.elementFrame} onKeyPress={handleEnter}/>
            <label className="Label">{props.elementFrame.placeholder}</label>
        </div>
    )
}

export default input;