import React from "react";
import modalStyle from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { modalRoot } from "../../utils/constants.js";
import { useHistory } from "react-router-dom";
import ModalOverlay from "./modal-overlay";

function Modal({ onClose, onOpen, children }) {

  const history = useHistory();

  function escClose(event) {
    if (event.key === 'Escape') {
      onClose(onClose);
      history.goBack();
    }
  }

  React.useEffect(() => {
    document.addEventListener("keydown", escClose);
    return () => {
      document.removeEventListener("keydown", escClose);
    };
  }, [escClose]);

  if (!onOpen) return null;
  return ReactDOM.createPortal(
    <>
    <ModalOverlay
    onClose={onClose}
    onOpen={onOpen}
  />
    <div className={modalStyle.popup}>
      <div className={`${modalStyle.container}`}>
        <div className={modalStyle.close}>
          <CloseIcon type="primary" onClick={onClose} onKeyDown={escClose} />
        </div>
      </div>
      {children}
    </div>
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  onOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  modal: PropTypes.func,
};

export default Modal;
