
import React from 'react';

function Modal({ isActive, closeModal, children }) {
    return (
        <div className={`modal ${isActive ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="box">
                    {children}
                </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
        </div>
    );
}

export default Modal;
