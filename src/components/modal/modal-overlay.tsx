import React from "react";
import overlayStyle from "./modal-overlay.module.css";
import { FC } from 'react';

interface IModalOverlay {
  onOpen: boolean;
  onClose: () => void;
}

const ModalOverlay: FC<IModalOverlay> = ({onOpen, onClose}) => {
  if (!onOpen) return null;
  return (
    <div className={overlayStyle.overlay} onClick={onClose}></div>
  )
}

export default ModalOverlay;
