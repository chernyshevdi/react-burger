import React from 'react';
import overlayStyle from './modal-overlay.module.css';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import {modalRoot} from "../../utils/constants.js"

function ModalOverlay(props) {

    if(!props.onOpen) return null;
    return ReactDOM.createPortal (
        <div className={overlayStyle.overlay} onClick={props.onClose}>    
        </div>,
        modalRoot
    )
}

ModalOverlay.propTypes = {
    onOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

export default ModalOverlay;