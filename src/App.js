import React, { Component } from 'react';
import './css/App.css'
import CurrencyConverter from './Components/CurrencyConverter'

class App extends Component{

  render(){
    return (
        <div className="widget">
          <CurrencyConverter />
        </div>
    );
  }
}

export default App;
