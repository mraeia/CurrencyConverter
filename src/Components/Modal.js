import React from 'react';
import ReactDOM from 'react-dom';
import '../css/App.css'

const Modal = props => {
    return ReactDOM.createPortal(
        <div onClick={props.toggleModal} className="modal">
            <div className="modal-content">
                sdfgsdfgsdf
            </div>
        </div>,
        document.querySelector('#modal')
    )
}

export default Modal;