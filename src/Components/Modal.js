import React from 'react';
import ReactDOM from 'react-dom';
import '../css/App.css'

const Modal = props => {

    if (props.conversionRates){
        const ratesList = [];
        for (var key in props.conversionRates) {
            if (props.conversionRates.hasOwnProperty(key)) {
                ratesList.push(`${key} : ${props.conversionRates[key]}`);
            }
        }
        
        return ReactDOM.createPortal(
            <div onClick={props.toggleModal} className="modal">
                <div className="modal-content">
                    Base Currency: EUR
                    <div>
                    {
                        ratesList.map((elm,index)=>{
                            return( 
                                <li key={index}>{elm}</li>
                            )
                        })
                    }
                    </div>
                </div>
            </div>,
            document.querySelector('#modal')
        )
    }
    else {
        return null;
    }
}

export default Modal;