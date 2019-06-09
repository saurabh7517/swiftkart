import React from 'react';
 
 
class Counter extends React.Component{
    constructor(props){
        super(props);
    }
    render(props){
        let value = this.props.value;
        let product =  this.props.product;
        return(
            <React.Fragment>
            <button onClick={() => value.decreaseQuantity(product)}>-</button><span>{this.props.product.quantity}</span><button onClick={() => value.increaseQuantity(product)}>+</button>
            </React.Fragment>
        );
    }
}

export default Counter;