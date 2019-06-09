import React from 'react';
import CartList from "./CartList";
import { ProductConsumer } from "../../context";

class Cart extends React.Component {
    constructor(props) {
        super(props);
    }


    createCart(value) {
        return (
            <div className="container-fluid ">
                <div className="row ">
                <h1 className=" text-capitalize text-center"><strong>your cart</strong></h1>
                </div>
                <CartList value={value} />
            </div>
        );
    }

    createEmptyCart() {
        return (
            <div className="container">
                <div className="row">
                    <h1 className="col-12 text-center text-capitalize "><strong>your cart is empty</strong></h1>
                </div>
            </div>
        );
    }

    conditionalRender(value) {
        if (value.cartProducts.length === 0) {
            return this.createEmptyCart();
        } else {
            return this.createCart(value);
        }
    }

    render(props) {
        return (

            <React.Fragment>
                <ProductConsumer>
                    {
                        (value) => this.conditionalRender(value)

                    }
                </ProductConsumer>
            </React.Fragment>
        )
    }
}

export default Cart;