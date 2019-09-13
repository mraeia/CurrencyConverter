import { combineReducers } from 'redux';

const selectedCurrencies = {
    fromCurrency: "CAD",
    toCurrency: "USD"
}

const setCurrency = (state = selectedCurrencies,action) => {
    if (action.type === 'SET_CURRENCY'){
        return { ...state, [action.payload.name]: action.payload.value }
    }
    return state;
}

export default combineReducers({
    currencies: setCurrency
});