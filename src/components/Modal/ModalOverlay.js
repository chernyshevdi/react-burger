import React from 'react';
import overlayStyle from './ModalOverlay.module.css';
import Modal from './Modal';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";

function ModalOverlay(props) {

    const modalRoot = document.getElementById("modals");

    if(!props.isOpen) return null;
    return ReactDOM.createPortal (
        <div className={overlayStyle.overlay} onClick={props.onClose}>    
        </div>,
        modalRoot
    )
}

ModalOverlay.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

export default ModalOverlay;