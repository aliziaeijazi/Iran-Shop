import {http} from "../utils/http.utils";
import {toast} from "react-toastify";

export function FeachProducts(page,limit) {
    return http.get(`/products?_page=${page}&_limit=${limit}`)
        .then((response)=>response.data)
        .catch((error)=> Promise.reject(error))
}
export function feachTodo(id) {
    return http.get(`/todos/${id}`)
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