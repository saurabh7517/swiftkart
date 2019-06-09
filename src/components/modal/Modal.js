import React from 'react';
import { ProductConsumer } from "../../context";
import { Link } from "react-router-dom";
import ProductPageButton from "../buttons/ProductPageButton";
import "./Modal.css";

class Modal extends React.Component {
    constructor(props) {
        super(props);
    }




    modalToRender(value){
        let { id, product_name, product_description, product_code, image, color, price } = { ...value.modalProduct }
        return(
            <div id="modalContainer">
                <div className="modal-dialog">
                        <div id="modal" className="text-center text-capitialize modal-content">
                            <h3><strong>Items added in Cart</strong></h3>
                            <img src={image}  alt="product"/>
                            <h5 className="text-center text-capitialize">{product_name}</h5>
                            <h5 className="text-muted text-capitalize">Price : ${price}</h5>
                            <Link to="/products"><ProductPageButton handleClick={() => value.closeModal()}/></Link>
                            <Link to="/cart" className="btn btn-warning mx-auto">Go To Cart </Link>
                        </div>
                        </div>
            </div>
        );
    }

    conditionalDisplay(value) {
        let openModalStatus = value.modalOpen;
        

        if (!openModalStatus) {
            return null;
        }
        else {
            return this.modalToRender(value);
        }
    }

    render(props) {
        return (
            <ProductConsumer>
                {
                    (value) => this.conditionalDisplay(value)
                }
            </ProductConsumer>
        );
    }
}

export default Modal;