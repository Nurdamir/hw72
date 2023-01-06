import React from 'react';
import Backdrop from "../Backdrop/Backdrop";

interface Props extends React.PropsWithChildren {
  show: boolean;
  onClose: React.MouseEventHandler;
}

const Modal: React.FC<Props> = ({show, onClose, children}) => {
  return (
    <>
      <Backdrop show={show} onClick={onClose}/>
      <div
        className="modal show"
        style={{display: show ? 'block' : 'none'}}
        onClick={onClose}
      >
        <div className="modal-dialog" onClick={e => e.stopPropagation()}>
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;