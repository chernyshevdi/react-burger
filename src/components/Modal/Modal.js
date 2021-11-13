import React from 'react';
import modalStyle from './Modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";

function Modal(props) {

    const modalRoot = document.getElementById("modals");
    
    if(!props.isOpen) return null;
    return ReactDOM.createPortal (
        <div className={modalStyle.popup} >
            <div className={`${modalStyle.container}`}>    
                <div className={modalStyle.close}>
                    <CloseIcon type="primary" onClick={props.onClose}/>
                </div>                 
            </div>
            {props.children}
        </div>,
        modalRoot
    );
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

export default Modal;