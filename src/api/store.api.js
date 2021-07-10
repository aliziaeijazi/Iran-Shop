import {http} from "../utils/http.utils";
import {toast} from "react-toastify";

export function FeachProducts (){
    return http.get(`/products`)
        .then((response)=>response.data)
        .catch((error)=> Promise.reject(error))
}
export function FeachPhoto (id){
    return http.get(id)
        .then((response)=>response.data)
        .catch((error)=> Promise.reject(error))
}
export function FeachOrders(kind) {
    const status = (kind == "notdelivered" ? "true" : "false")
    return http.get(`/orders?status_ne=${status}`)
        .then((response)=>response.data)
        .catch((error)=> Promise.reject(error))
}
export function addTodo(data) {
    return http.post(`/todos`,data)
        .then((response)=>	toast.success(<h3 style={{fontFamily:"Gabriola" , fontSize:"large" }}>📌 Your work added successfully.</h3>))
        .catch((error)=> Promise.reject(error))
}
export function deleteTodo(id) {
    return http.delete(`/todos/${id}`)
        .then((response)=>		toast.success(<h3 style={{fontFamily:"Gabriola" , fontSize:"large" }}>📌 Your work deleted successfully.</h3>))
        .catch((error)=> Promise.reject(error))
}