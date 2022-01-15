import React from "react";
import modalStyle from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import { modalRoot } from "../../utils/constants";
import { useHistory } from "react-router-dom";
import ModalOverlay from "./modal-overlay";
import { FC } from 'react';

interface IModal {
  onClose: () => void;
  onOpen: boolean;
}

const Modal: FC<IModal> = ({ onClose, onOpen, children }) => {
  const history = useHistory();

  function escClose(event: any) {
    if (event.key === 'Escape') {
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
    <div className={modalStyle.popup} onKeyDown={escClose}>
      <div className={`${modalStyle.container}`}>
        <div className={modalStyle.close}>
          <CloseIcon type="primary" onClick={onClose} />
        </div>
      </div>
      {children}
    </div>
    </>,
    modalRoot
  );
}

export default Modal;
