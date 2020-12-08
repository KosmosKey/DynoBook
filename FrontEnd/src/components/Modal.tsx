import React from "react";

interface Props {
  onClose: () => any;
}

const Modal: React.FC<Props> = ({ children, onClose }) => {
  return (
    <div className="Modal">
      <div className="Modal__Overlay" onClick={onClose}></div>
      <div className="Modal__Div">{children}</div>
    </div>
  );
};

export default Modal;
