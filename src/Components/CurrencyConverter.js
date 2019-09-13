import React, { Component } from 'react';
import {APP_TITLE,LABEL_INPUT_1,LABEL_INPUT_2,CURRENCIES} from '../Consts';
import CurrencyFromSelector from './CurrencySelector';
import jsonPlaceholder from '../apis/jsonPlaceholder';
import Modal from './Modal';
import { connect } from 'react-redux';

class CurrencyConverter extends Component{

    constructor(props){
        super(props);
        
        this.state= {
            inputValue: 0.00,
            convertedValue: 0.00,
            conversionRates: null,
            conversionRate: 0,
            showModal: false
        }
    }

    onChange = (e) =>{
        this.setState({ inputValue: e.target.value });      
    }

    componentDidMount(){
        jsonPlaceholder.get(
            `latest?access_key=${process.env.REACT_APP_API_KEY}&symbols=${CURRENCIES.toString()}`
        ).then(res => {
            if (res.data.success){
                const conversionRates = res.data.rates;
                const conversionRate = conversionRates[this.props.currencies.toCurrency] / conversionRates[this.props.currencies.fromCurrency];
                this.setState({conversionRate,conversionRates});
            }
        }).catch(err =>{
            console.log(err);
            throw Error('Error fetching conversion rates ...');
        });
    }

    componentDidUpdate(prevProps,prevState){
        if (this.state.conversionRates !== null && 
            (prevState.conversionRate !== this.state.conversionRate 
            || prevProps.currencies.fromCurrency !== this.props.currencies.fromCurrency 
            || prevProps.currencies.toCurrency !== this.props.currencies.toCurrency))
        {
            const conversionRate = this.state.conversionRates[this.props.currencies.toCurrency] / this.state.conversionRates[this.props.currencies.fromCurrency];
            this.setState({conversionRate});
            this.setState({convertedValue: (this.state.inputValue * this.state.conversionRate).toFixed(2)});
        }

        if (prevState.inputValue !== this.state.inputValue){
            if (this.state.conversionRate !== 0 && this.state.inputValue !== ''){
                this.setState({convertedValue: (this.state.inputValue * this.state.conversionRate).toFixed(2)});
            }
        }
    }

    getForm = () => {
        if (!this.state.conversionRates){
            return(
                <div>
                    Loading...
                </div>
            );
        }
        else{
            return(
                <form>
                    <div className="input">
                        <label>
                            {LABEL_INPUT_1}
                            <div>
                                <input onChange={this.onChange} type="number" name="inputValue" value={this.state.inputValue}/>
                                <CurrencyFromSelector name="fromCurrency" defaultValue="CAD" />
                            </div>
                        </label>
                    </div>
                    <div className="input">
                        <label>
                            {LABEL_INPUT_2}
                            <div>
                                <input readOnly type="number" name="convertedValue" value={this.state.convertedValue}/>
                                <CurrencyFromSelector name="toCurrency" defaultValue="USD" />
                            </div>
                        </label>
                    </div>
                </form>
            );
        }
    }

    toggleModal = () =>{
        this.setState({showModal : !this.state.showModal})
    }

    render(){

        const form = this.getForm();
        return (
            <div>
                <h4 className='label'> {APP_TITLE} </h4>
                {form}
                <a onClick={this.toggleModal} href="#">Disclaimer</a>
                {this.state.showModal? <Modal conversionRates={this.state.conversionRates} toggleModal={this.toggleModal}/> : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {  currencies : state.currencies };
  };

export default connect(mapStateToProps,null)(CurrencyConverter);