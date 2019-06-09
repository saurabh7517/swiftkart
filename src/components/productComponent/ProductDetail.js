import React from 'react';
import { ProductConsumer } from "../../context";
import { Link } from "react-router-dom";
import AddToCart from "../buttons/AddtoCart";
class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.createPageForDetails = this.createPageForDetails.bind(this);
    }



    createPageForDetails(value) {
        const { id, name, description, code, image, color,inCart } = { ...value.detailProduct };
        let renderButton = <p></p>;
        if(inCart){
            renderButton = <button className="btn btn-warning" disabled>In Cart</button>
        }
        else{
            renderButton = <AddToCart clickHandle={() => value.addToCart(id)}/>
        }
        return (
            <div className="container">
                {/* start title */}
                <div className="row">
                    <div className="col-10 text-center text-blue ml-auto">
                        <h1>{name}</h1>
                    </div>
                </div>
                {/* end title */}
                {/* {start product info} */}
                <div className="row">
                    <div className="col-10 col-md-6 mx-auto">
                        <img src={image} className="img-fluid img-thumbnail"></img>
                    </div>
                    <div className="col-10 col-md-6 mx-auto">
                        <h2>Model: {code}</h2>
                        <h4 className="text-title text-uppercase mt-3 mb-2"></h4>
                        {/* <h4><strong>Price:{}</strong></h4> */}
                        <p className="text-capitalize font-weight-bold mt-3 mb-0">
                            some info about the product
                                    </p>
                        <p className="text-muted lead"> {description}</p>
                        {/* buttons */}
                        <Link to="/products"> back to products</Link>
                        {renderButton}
                    </div>
                </div>
                {/* {end product info} */}
            </div>
        )

    }



    render(props) {
        return (
            <ProductConsumer>
                {(value) => this.createPageForDetails(value)}
            </ProductConsumer>
        )
    }


}

export default ProductDetail;