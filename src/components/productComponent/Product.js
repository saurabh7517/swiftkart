import React from 'react';
import "./Product.css";
import AddToCart from "../buttons/AddtoCart";
import {Link} from "react-router-dom";
import {PropTypes} from "prop-types";
import {ProductConsumer} from '../../context';
class Product extends React.Component {
    constructor(props) {
        super(props);
        this.createProductBlock = this.createProductBlock.bind(this);
    }

    createProductBlock(value,product){
        let renderButton = <p></p>;
        if(product.inCart){
            renderButton = <button className="btn btn-warning" disabled>In Cart</button>
        }
        else{
            renderButton = <AddToCart clickHandle={() => value.addToCart(product.id)}/>
        }
        return (
            <div className="card col-sm-5 col-md-4 col-lg-4 col-xl-3">
            <img className="card-img-top" src={product.image} alt="card-image" onClick={()=>{console.log( "image is clicked" )}} />
            <div className="card-body">
                <h4 className="card-title">{product.name}</h4>                
                <Link to="/details" className="btn btn-primary" onClick={() => value.handleDetail(product.id)}>More Info</Link>
                
                {renderButton}
                
            </div>
        </div>
        )
    }


    render(props) {
        // console.log(this.props.productDetail);
        let product = this.props.productDetail; 
        return (
            <ProductConsumer>
                {
                    (value) => this.createProductBlock(value,product)
                }
            </ProductConsumer>
        )
    }
}

Product.propTypes = { 
    productDetail : PropTypes.shape({
        product_name:PropTypes.string,
        image:PropTypes.string,
        id:PropTypes.number,
        product_description:PropTypes.string,
        product_code:PropTypes.string
    }).isRequired
}
export default Product;