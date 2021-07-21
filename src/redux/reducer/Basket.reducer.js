const initialstate = {
    basketList: []
}

const BasketReducer = (state = initialstate, action) => {
    switch (action.type) {
        case "ADD_TO_BASKET":
            return {...state,basketList: [...state.basketList , action.data]}
        default:
            return state
    }
}
export default BasketReducer