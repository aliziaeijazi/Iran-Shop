import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {AppRoute} from "./route/App.route";
import {ToastContainer} from "react-toastify";
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render(
    <React.StrictMode>
        <RTL>
            <AppRoute/>
            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false}
                            closeOnClick
                            rtl={true} pauseOnFocusLoss draggable pauseOnHover/>
        </RTL>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// Configure JSS

function RTL(props) {
    const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
    return (
        <StylesProvider jss={jss}>
            {props.children}
        </StylesProvider>
    );
}