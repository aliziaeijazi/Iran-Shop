import {Redirect, BrowserRouter, Route, Switch} from "react-router-dom";
import {Login} from "../pages/Login/Login.page";
import {Management, Users} from "../Layout";
import {ProductListManagement, StoreManagement} from "../pages";

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
                        <ProductListManagement/>
                    </Management>
                </Route>
                <Route path="/management/supply">
                    <Management>
                        <StoreManagement/>
                    </Management>
                </Route>
                <Route path="/management/orders">
                    <Management>
                        orders
                    </Management> </Route>

                {/*managment*/}
                {/*users*/}
                <Route path="/" exact>
                    <Users> Main
                    </Users>
                </Route>
                <Route exact path="/products">
                    <Users>Products</Users>

                </Route>
                <Route path="product">
                    <Users>productdetail</Users>
                </Route>
                <Route path="/basket">
                    <Users>basket</Users>

                </Route>
                <Route path="/cheackout">
                    <Users>cheackout</Users>
                </Route>
                <Route path="/paymentresult">
                    <Users>paymentresult</Users>

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