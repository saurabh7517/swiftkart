import React from 'react';
import { Route, Switch } from "react-router-dom";
import Header from "./common/header";
import HomePage from "./homeComponent/homePage";
import Register from "./register/register";
import ProductList from "./productComponent/ProductList";
import PageNotFound from "./common/pageNotFound";
import Login from "./login/loginPage";
import ProductDetail from "./productComponent/ProductDetail";
import Cart from "./cart/Cart";
import Logout from "./logout/Logout";
import "./app.css"
import RegisterSuccess from './register/RegisterSuccess';

const App = () => {

    return (
        <React.Fragment>
            
            <Header />
            
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/products" component={ProductList} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login}/>
                <Route path="/details" component={ProductDetail}/>
                <Route path="/cart" component={Cart}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/register_success" component={RegisterSuccess}/>
                <Route component={PageNotFound}/>
            </Switch>
            
        </React.Fragment>
    )
};

export default App;
