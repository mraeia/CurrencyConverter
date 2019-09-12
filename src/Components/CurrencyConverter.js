import React, { Component } from 'react';
import {APP_TITLE,LABEL_INPUT_1,LABEL_INPUT_2,CURRENCIES} from '../Consts';
import CurrencyFromSelector from './CurrencySelector';
import jsonPlaceholder from '../apis/jsonPlaceholder';
import Modal from './Modal'

class CurrencyConverter extends Component{

    constructor(props){
        super(props);
        
        this.state= {
            fromCurrency: 'CAD',
            toCurrency: 'USD',
            fromValue: '0.00',
            toValue: '0.00',
            converstionRates: {},
            showModal: false
        }
    }

    onChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidUpdate(prevProps,prevState){
        if (prevState.fromCurrency != this.state.fromCurrency){ 
            // jsonPlaceholder.get(
            //     `latest?access_key=${process.env.REACT_APP_API_KEY}&base=${this.state.fromCurrency}&symbols=${CURRENCIES.toString()}`
            // ).then(rates => console.log(rates));
        }
    }

    componentDidMount(){
        // jsonPlaceholder.get(
        //     `latest?access_key=${process.env.REACT_APP_API_KEY}&symbols=${CURRENCIES.toString()}`
        // ).then(rates => console.log(rates));
    }

    getForm = () => {
        return(
            <form>
                <div className="input">
                    <label>
                        {LABEL_INPUT_1}
                        <div>
                            <input onChange={this.onChange} type="number" name="fromValue" value={this.state.fromValue}/>
                            <CurrencyFromSelector onChange={this.onChange} name="fromCurrency" value={this.props.fromCurrency} />
                        </div>
                    </label>
                </div>
                <div className="input">
                    <label>
                        {LABEL_INPUT_2}
                        <div>
                            <input readOnly onChange={this.onChange} type="number" name="toValue" value={this.state.toValue}/>
                            <CurrencyFromSelector onChange={this.onChange} name="toCurrency" value={this.props.fromCurrency} />
                        </div>
                    </label>
                </div>
            </form>
        );
    }

    showModal = () =>{
        this.setState({showModal : !this.state.showModal})
    }

    render(){

        const form = this.getForm();
        return (
            <div>
                <h4 className='label'> {APP_TITLE} </h4>
                {form}
                <a onClick={this.showModal} href="#">Disclaimer</a>
                {this.state.showModal? <Modal hideModal={this.showModal}/> : null}
            </div>
        );
    }
}

export default CurrencyConverter;