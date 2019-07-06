import React, { Component } from 'react'
import { checkValidity } from '../shared/checkValidity';
import InputHolder from '../components/UI/InputHolder/InputHolder';
import PrimaryButton from '../components/UI/Buttons/PrimaryButton/PrimaryButton';

import './add-tab-form.scss';

class AddTabForm extends Component {
    state = {
        controls: {
            url: {  
                elementFrame: { type: 'text', value: '', autoFocus: true },
                validation: { required: true, isURL: true },
                valid: false,
                touched: false
            },
            importance: {
                elementFrame: { col:"30", rows:"7", placeholder: 'Why is this tab important to you?', value: '', maxLength: 140 },
                validation: { required: false, maxLength: 140 },
                valid: true,
                touched: false
            },
            category: {
                elementFrame: { type: 'text', value: '', placeholder: "Give us a tag/category" },
                validation: { required: false },
                valid: true,
                touched: false
            }
        }
    }

    submitFormHandler = () => {
        let formData = {
            tabUrl: this.state.controls.url.elementFrame.value,
            importance: this.state.controls.importance.elementFrame.value,
            category: this.state.controls.category.elementFrame.value || "uncategorized"
        }
        this.props.addTab({ variables: formData });
    }

    render() {
        let canSubmit = true;
        for (let control in this.state.controls) {
            if (canSubmit && this.state.controls[control].valid === false) {
                canSubmit = false;
            }
        }
        return (
          <form className="AddTabForm">
            <div className="AddTabForm__Header">
              <h2>We'll need some information about your new Tab</h2>
            </div>
            <InputHolder 
                submit={this.submitFormHandler} 
                controls={this.state.controls} 
                canSubmitForm={canSubmit}
                inputChange={this.inputChangedHandler}
            />
            <div className="AddTabForm__SubmitButton" onClick={this.submitFormHandler}>
                <PrimaryButton disabled={!canSubmit} btnClass="PrimaryButton">{canSubmit && "We'll take care of the rest!"}</PrimaryButton>
            </div>
          </form>
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
}

export default AddTabForm;
