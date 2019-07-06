import React, { Component } from 'react'
import PrimaryButton from '../components/UI/Buttons/PrimaryButton/PrimaryButton';
import Input from '../components/UI/Inputs/Input/Input';
import { checkValidity } from '../shared/checkValidity';
import './auth-form.scss';

export default class authForm extends Component {
    state = {
        isSignUp: true,
        controls: {
            username: {
                showOnSignUpOnly: false,
                elementFrame: { type: 'text', placeholder: 'Username', value: '' },
                validation: { required: true, minLength: 4 },
                valid: false,
                touched: false
            },
            password: {
                showOnSignUpOnly: false,
                elementFrame: { type: 'password', placeholder: 'Password', value: '' },
                validation: { required: true, minLength: 6 },
                valid: false,
                touched: false
            },
            email: {
                showOnSignUpOnly: true,
                elementFrame: { type: 'email', placeholder: 'Email', value: '' },
                validation: { required: true, isEmail: true },
                valid: false,
                touched: false
            },
            phone: {
                showOnSignUpOnly: true,
                elementFrame: { type: 'text', placeholder: 'Phone', value: '' },
                validation: { required: true, minLength: 10, maxLength: 10 },
                valid: false,
                touched: false
            },
        }
    }
    submitFormHandler = () => {
        let formData = {
            username: this.state.controls.username.elementFrame.value,
            password: this.state.controls.password.elementFrame.value,
        }
        if (this.state.isSignUp) {
            formData.email = this.state.controls.email.elementFrame.value;
            formData.phone = this.state.controls.phone.elementFrame.value;
        }
        this.props.login({ variables: { ...formData } })
    }
    render() {
        let formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({ id: key, frame: this.state.controls[key] });
        } 
        formElementsArray = this.state.isSignUp ? formElementsArray : formElementsArray.filter(formElement => formElement.frame.showOnSignUpOnly === false)
        let canSubmit = true;
        formElementsArray.forEach(control => {
            if (canSubmit && control.frame.valid === false) {
                canSubmit = false
            }
        })
        let inputs = formElementsArray.map(control => <Input
            canSubmitForm={canSubmit} 
            submit={this.submitFormHandler}
            key={control.id}
            elementFrame={control.frame.elementFrame}
            changed={(e) => this.inputChangedHandler(e, control.id)}
            shouldValidate={control.frame.validation}
            touched={control.frame.touched}
            invalid={!control.frame.valid}
        />)
        return (
            <div className={this.state.isSignUp ? "AuthContainer SignUp" : "AuthContainer"}>
                <div className="BackgroundImage"></div>
                <form className="AuthForm">
                    <h1>{this.state.isSignUp ? "Sign Up" : "Sign In"}<p>to continue to Tabless Thursday</p></h1>
                    <div className="InputsHolder">
                        {inputs}
                    </div>
                    <div className="LoginActionHolder">
                        <div className="AuthLoginButton" onClick={this.submitFormHandler}>
                            <PrimaryButton disabled={!canSubmit} btnClass="PrimaryButton">{this.state.isSignUp ? "Sign Up" : "Login"}</PrimaryButton>
                        </div>
                        <div className="AuthCancelButton" onClick={this.switchMethodHandler}>
                            <PrimaryButton btnClass="SecondaryButton">Switch to {this.state.isSignUp ? "Sign In" : "Sign Up"}</PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
    inputChangedHandler = (e, elementName) => {
        e.persist()
        this.setState(prevState => {
            const updatedControls = {...prevState.controls, ...{
                [elementName]: {...prevState.controls[elementName], ...{
                    valid: checkValidity(e.target.value, prevState.controls[elementName].validation),
                    touched: true,
                    elementFrame: {...prevState.controls[elementName].elementFrame, ...{value: e.target.value}}
                }}
            }}
            return { controls: updatedControls }
        })
    }
    switchMethodHandler = () => {
        this.setState(prevState => ({isSignUp: !prevState.isSignUp}))
    }
}
