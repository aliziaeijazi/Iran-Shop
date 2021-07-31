const initialstate = {
    basketList: []
}

const BasketReducer = (state = initialstate, action) => {
    switch (action.type) {
        case "ADD_TO_BASKET":
            return {...state,basketList: [...state.basketList , action.data]}
        case "EDIT_COUNT_IN_BASKET":
            return {...state,basketList:[...state.basketList.slice(0,action.data.index),{...state.basketList[action.data.index],counter:action.data.value},...state.basketList.slice(action.data.index+1)]}
        case "DELETE_FROM_BASKET":
            return {...state,basketList:[...state.basketList.slice(0,action.data.index) , ...state.basketList.slice(action.data.index+1)]}
        default:
            return state
    }
}
export default BasketReducer