import 'bootstrap/dist/css/bootstrap.min.css';
// import 'jquery/dist/jquery.js';
// import 'bootstrap/dist/js/bootstrap.min.js';

import Popper from "popper.js";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/app";
import { ProductProvider } from "./context";


ReactDOM.render(
        <ProductProvider>
            <Router>
                <App />
            </Router>
        </ProductProvider>
    , document.getElementById("root")
);
