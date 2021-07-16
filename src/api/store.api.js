import {http} from "../utils/http.utils";
import {toast} from "react-toastify";
import React from "react";

export function FeachProducts() {
    return http.get(`/products`)
        .then((response) => response.data)
        .catch((error) => Promise.reject(error))
}
export function FeachProductsWithFilter(fillter) {
    return http.get(`/products?${fillter}`)
        .then((response) => response.data)
        .catch((error) => Promise.reject(error))
}
export function FeachProduct(id) {
    return http.get(`/products/${id}`)
        .then((response) => response.data)
        .catch((error) => Promise.reject(error))
}

export function FeachGroups() {
    return http.get(`/productsgroups`)
        .then((response) => response.data)
        .catch((error) => Promise.reject(error))
}

export function CreateData(data) {

    let formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("subgroupname", data.subgroupname);
    formdata.append("image", data.newimage.files[0], data.newimage.value);
    formdata.append("price", "0");
    formdata.append("groupname", data.groupname);
    formdata.append("count", "0");
    formdata.append("describtion", data.describtion);
    return http.post("/products", formdata, {headers: {"Content-Type": "multipart/form-data"}})
        .then((response) => toast.success("کالای مورد نظر با موفقیت ایجاد شد."))
        .catch((error) => Promise.reject(error))
}
export function EditData(data) {

    let formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("subgroupname", data.subgroupname);
    if (data.newimage)
        formdata.append("image", data.newimage.files[0], data.newimage.value);
    else
        formdata.append("image", data.image);

    formdata.append("price", data.price);
    formdata.append("groupname", data.groupname);
    formdata.append("count", data.count);
    formdata.append("describtion", data.describtion);

    return http.patch(`/products/${data.id}`, formdata, {headers: {"Content-Type": "multipart/form-data"}})
        .then((response) => toast.success("کالای مورد نظر با موفقیت ویرایش شد."))
        .catch((error) => Promise.reject(error))
}

export function FeachPhoto(id) {
    return http.get(id)
        .then((response) => response.data)
        .catch((error) => Promise.reject(error))
}

export function FeachOrders(kind) {
    const status = (kind == "notdelivered" ? "true" : "false")
    return http.get(`/orders?status_ne=${status}`)
        .then((response) => response.data)
        .catch((error) => Promise.reject(error))
}


export function DeleteProduct(id) {
    return http.delete(`/products/${id}`)
        .then((response) => toast.success("کالای مورد نظر با موفقیت حذف شد."))
        .catch((error) => Promise.reject(error))
}
export function EditPrice_Count(data , key) {
    let formdata = new FormData();
    formdata.append(key, data[key]);
    return http.patch(`/products/${data.id}`, formdata, {headers: {"Content-Type": "multipart/form-data"}})
        .then((response) => toast.success("کالای مورد نظر با موفقیت ویرایش شد.")
        )
        .catch((error) => Promise.reject(error))
}
