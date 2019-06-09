import React from 'react';
import { PropTypes } from "prop-types";
import CartTotal from "./CartTotal";
import Counter from "./Counter";
class CartList extends React.Component {
    constructor(props) {
        super(props);
    }

    renderCartList(cartProducts,value) {
        return (
            <React.Fragment>

                <div className="container-fluid">
                    <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-10">
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Code</th>
                                {/* TODO */}
                                <th scope="col">Quantity</th>
                                <th scope="col">Left</th>
                                <th scope="col">Price</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartProducts.map((product) => {
                                const { id, name, description, code,quantity, image, quantityLeft, price } = { ...product };
                                return (
                                    <tr key={id}>
                                        <td><img src={image} className="thumbnail" alt={name} /></td>
                                        <td>{name}</td>
                                        <td>{description}</td>
                                        <td>{code}</td>
                                        <td ><Counter product={product} value={value}/></td>
                                        <td>{quantityLeft}</td>
                                        {/* <td ><button >-</button><span>{this.props.quantity}</span><button onClick={() => value.increaseQuantity(id)}>+</button></td> */}
                                        
                                        <td>{price * quantity}</td>
                                        <td><button className="btn btn-warning" onClick={() => value.removeFromCart(id)}>Remove</button></td>
                                    </tr>

                                )
                            })}
                        </tbody> 
                    </table>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-2 ml-auto">
                            <CartTotal value={value}/>
                    </div>
                    </div>
                </div>
            </React.Fragment>
        ) 
    }



    render(props) {
        const productIds = this.props.value.cartProducts;
        let productList = this.props.value.productList;
        let cartProducts = [];
        for (let index = 0; index < productIds.length; index++) {
            const element = productIds[index];
            let tempCartProduct = productList.find((product) => product.id === element)
            cartProducts.push(tempCartProduct)
        }

        let value = this.props.value;

        return (

            this.renderCartList(cartProducts,value)

        );
    }
}
export default CartList;

CartList.propTypes = {
    cartProducts: PropTypes.array
}