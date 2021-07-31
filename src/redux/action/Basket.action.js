export const  addToBasket = (value={}) =>
{
    return {
        type:"ADD_TO_BASKET",
        data:value
    }
}
export const editCountInBasket = (index , value)=> {
    return {
        type: "EDIT_COUNT_IN_BASKET",
        data: {index, value}
    }
}
export const deleteFromBasket = (index)=>{
    return {
        type:"DELETE_FROM_BASKET",
        data:{index}
    }
}