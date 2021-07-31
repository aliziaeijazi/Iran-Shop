import React from 'react';
import ReactDOM from 'react-dom';
import './asset/style/global.css';
import reportWebVitals from './reportWebVitals';
import {AppRoute} from "./route/App.route";
import {ToastContainer} from "react-toastify";
import {create} from 'jss';
import rtl from 'jss-rtl';
import {StylesProvider, jssPreset} from '@material-ui/core/styles';
import 'react-toastify/dist/ReactToastify.css';
import store from "./redux/store";
import {Provider} from "react-redux";

ReactDOM.render(
    <React.StrictMode>
        <RTL>
            <Provider store={store}>
                <AppRoute/>
                <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false}
                                closeOnClick style={{maxWidth:"75%" }}
                                rtl={true} pauseOnFocusLoss draggable pauseOnHover/>
            </Provider>
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
    const jss = create({plugins: [...jssPreset().plugins, rtl()]});
    return (
        <StylesProvider jss={jss}>
            {props.children}
        </StylesProvider>
    );
}