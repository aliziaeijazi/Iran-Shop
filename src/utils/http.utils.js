import axios from "axios";
import {BASE_URL, TIMEOUT} from "../configs/variable.config";
import {toast} from "react-toastify";

const http = axios.create()
http.defaults.baseURL = BASE_URL
http.defaults.timeout = TIMEOUT
http.interceptors.response.use(function (config) {
    return config;
}, function (error) {
    toast.error(<h4 >خطایی در دریافت اطلاعات رخ داده است. لطفا پس از رفرش کردن صفحه دوباره امتحان کنید.</h4>)
    return Promise.reject(error);
});
http.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    toast.error(<h4>خطایی در ارسال درخواست  رخ داده است. لطفا پس از رفرش کردن صفحه دوباره امتحان کنید.</h4>)
    return Promise.reject(error);
});
export {http}


