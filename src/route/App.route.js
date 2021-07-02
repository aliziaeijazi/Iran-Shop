import {Redirect, BrowserRouter, Route, Switch} from "react-router-dom";
import {Login} from "../pages/Login/Login.page";
import {Protected} from "./components/Protected/Protected.route";


function AppRoute() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    Main
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
                {/*managment*/}
                <Route path="/management/productlist">
                    productlist
                </Route>
                <Route path="/management/supply">
                    supply
                </Route>
                <Route path="/management/orders">
                    orders
                </Route>
                {/*managment*/}
                {/*users*/}
                <Route exact path="/products">
                    Products
                </Route>
                <Route path="product">
                    productdetail
                </Route>
                <Route path="/basket">
                    basket
                </Route>
                <Route path="/cheackout">
                    cheackout
                </Route>
                <Route path="/paymentresult">
                    paymentresult
                </Route>
                <Route path="/not-found">
                        not_found
                </Route>
                <Route>
                    <Redirect to="/not-found"/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export {AppRoute}