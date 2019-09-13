import React,{ Component } from 'react';
import {CURRENCIES} from '../Consts';
import { connect } from 'react-redux';
import {setCurrency} from '../actions';

class CurrencySelector extends Component{

    constructor(props){
        super(props);
        this.state = {
            value: this.props.defaultValue
        }
    }

    onChange = (e) => {
        this.setState({value: e.target.value})
    }

    componentDidUpdate(){
        this.props.setCurrency({
            name:this.props.name,
            value: this.state.value
        });
    }

    render(){
        return(
            <select onChange={this.onChange} name={this.props.name} value={this.state.value}>
                {CURRENCIES.map(cur => (
                    <option key={cur}>{cur}</option>
                ))}
            </select>
        );
    }
}

export default connect(null,{setCurrency})(CurrencySelector);