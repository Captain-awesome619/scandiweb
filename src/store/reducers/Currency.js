const INITIAL_STATE = {
    activeCurrency: 0,
    activeCurrencySymbol: localStorage.getItem("INITIAL-CURRENCY")
}

export default function currency(state = INITIAL_STATE, action){
    if(action.type === "CHANGE_CURRENCY"){
        return {
            ...state, activeCurrency: action.currency, activeCurrencySymbol: action.symbol
        }
    }
    return state
}