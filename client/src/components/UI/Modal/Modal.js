import React from 'react' ;
import Backdrop from '../Backdrop/Backdrop';
import './Modal.scss';


const modal = (props) => {
    return (
    <React.Fragment>
        <Backdrop clicked={props.cancelUpdate} show={true} style={{backgroundColor: "rgba(0,0,0,.5)", height:"173vh"}} />
        <div className="modal">
            <header className="modal__header">
                <h1>{props.title}</h1>
            </header>
            <section className="modal__content">
                {props.children}
            </section>
        </div>
    </React.Fragment>
    )
    }

export default modal;