import React from 'react';
import {ProductConsumer} from "../../context";
import "./CartTotal.css"; 
class CartTotal extends React.Component{
    constructor(props){
        super(props);
    }





    render(props){
        return(
            <div id="totalContainer" className="row">
            <div className="mr-auto">Total Amount :</div><div className="ml-auto">{this.props.value.cartTotal}</div>
            </div>
            
        )
    }
}

export default CartTotal;