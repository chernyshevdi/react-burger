import React from "react";
import overlayStyle from "./modal-overlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay(props) {
  if (!props.onOpen) return null;
  return (
    <div className={overlayStyle.overlay} onClick={props.onClose}></div>
  )
}

ModalOverlay.propTypes = {
  onOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
