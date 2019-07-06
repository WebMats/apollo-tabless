import React from 'react'
import TextArea from '../Inputs/Textarea/Textarea';

import './InputHolder.scss';

const inputHolder = (props) => {
    let categoryInputClass = "AddTab__categoryInput";
    if (!props.controls.category.valid && props.controls.category.touched) {
        categoryInputClass = "AddTab__categoryInput Invalid";
    }
    const urlInputClass = (!props.controls.url.valid && props.controls.url.validation && props.controls.url.touched) ? "AddTab__urlInput Invalid" : "AddTab__urlInput";
    const handleEnter = (e) => {
        if(e.key === "Enter" && props.canSubmitForm) {
            props.submit()
        }
    }
  return (
    <div className="InputsHolder">
        <div className="URLInputHolder">
            <span>URL</span>
            <input className={urlInputClass} {...props.controls.url.elementFrame} onChange={(e) => props.inputChange(e, "url")} />
        </div>
        <TextArea 
            numChar={props.controls.importance.elementFrame.value || ''} 
            elementFrame={props.controls.importance.elementFrame} 
            changed={(e) => props.inputChange(e, "importance")} 
        />
        <input 
            className={categoryInputClass} 
            {...props.controls.category.elementFrame} 
            onChange={(e) => props.inputChange(e, "category")}
            onKeyPress={handleEnter} 
        />
      </div>
  )
}

export default inputHolder
