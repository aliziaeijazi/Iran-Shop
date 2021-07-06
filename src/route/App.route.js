import {Redirect, BrowserRouter, Route, Switch} from "react-router-dom";
import {Login} from "../pages/Login/Login.page";
import {Management} from "../Layout";


function AppRoute() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login">
                    <Login/>
                </Route>
                {/*managment*/}
                <Route path="/management/productlist">
                    <Management>
                        productlist
                    </Management>
                </Route>
                <Route path="/management/supply">

                    <Management>
                        supply
                    </Management>
                </Route>
                <Route path="/management/orders">
                    <Management>
                        orders
                    </Management> </Route>

                {/*managment*/}
                {/*users*/}
                <Route path="/" exact>
                    Main
                </Route>
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