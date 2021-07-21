import {Redirect, BrowserRouter, Route, Switch} from "react-router-dom";
import {Login} from "../pages/Login/Login.page";
import {Management, Users} from "../Layout";
import {Orders, ProductGroup, ProductListManagement, Products, StoreManagement} from "../pages";
import {Product} from "../pages/Product/Product.page";
import {Basket} from "../pages/";

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
                        <Orders/>
                    </Management> </Route>

                {/*managment*/}
                {/*users*/}
                <Route path="/" exact>
                    <Users>
                        <Products/>
                    </Users>
                </Route>
                <Route exact path="/products">
                    <Users><ProductGroup/></Users>

                </Route>
                <Route path="/product">
                    <Users><Product/></Users>
                </Route>
                <Route path="/basket">
                    <Users><Basket/></Users>

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