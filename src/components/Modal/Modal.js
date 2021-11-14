import React from 'react';
import modalStyle from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import {modalRoot} from "../../utils/constants.js"

function Modal(props) {

      function escClose(event){
        if(event.keyCode === 27) {
          props.onClose(props.onClose)
        }
      }

      React.useEffect(() => {
        document.addEventListener("keydown", escClose);
        return () => {
          document.removeEventListener("keydown", escClose);
        }
      },[escClose])
    
    if(!props.isOpen) return null;
    return ReactDOM.createPortal (
        <div className={modalStyle.popup} >
            <div className={`${modalStyle.container}`}>    
                <div className={modalStyle.close}>
                    <CloseIcon type="primary" onClick={props.onClose} onKeyDown={escClose}/>
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