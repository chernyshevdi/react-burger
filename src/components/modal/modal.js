import React, { useEffect, useState } from 'react';
import modalStyle from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import {modalRoot} from "../../utils/constants.js";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Modal({onClose, modal, onOpen, children}) { 

      const { ingredients } = useSelector(state => state.ingredientsReducer); 
      let { id } = useParams();
      const [current, setCurrent] = useState(null)

      function escClose(event){
        if(event.keyCode === 27) {
          onClose(onClose)
        }
      }

      React.useEffect(() => {
        document.addEventListener("keydown", escClose);
        return () => {
          document.removeEventListener("keydown", escClose);
        }
      },[escClose])

      useEffect(() => {
        if(id) {
        setCurrent(ingredients.find((item) => item._id === id)) 
        }
      },[ingredients, id])
      
      useEffect(() => {
        if(current) {
          modal(current)
        }
      },[current, modal])
    
    if(!onOpen) return null;
    return ReactDOM.createPortal (
        <div className={modalStyle.popup} >
            <div className={`${modalStyle.container}`}>    
                <div className={modalStyle.close}>
                    <CloseIcon type="primary" onClick={onClose} onKeyDown={escClose}/>
                </div>                 
            </div>
            {children}
        </div>,
        modalRoot
    );
}

Modal.propTypes = {
    onOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

export default Modal;