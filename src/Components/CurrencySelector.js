import React,{ Component } from 'react';
import {CURRENCIES} from '../Consts';

class CurrencySelector extends Component{

    constructor(props){
        super(props);

        this.state = {
            value: this.props.value
        }
    }

    render(){
        return(
            <select onChange={this.props.onChange} name={this.props.name} value={this.state.value}>
                {CURRENCIES.map(cur => (
                    <option key={cur}>{cur}</option>
                ))}
            </select>
        );
    }
}

export default CurrencySelector;