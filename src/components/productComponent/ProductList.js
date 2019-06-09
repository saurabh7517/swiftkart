import React from 'react';
import "./ProductList.css";
import * as constants from '../common/applicationConstants';
import { ProductConsumer,ProductContext} from '../../context';
import Product from './Product';
import Modal from "../modal/Modal";



class ProductList extends React.Component {
    constructor(props) {
        super(props);
        // this.getProducts = this.getProducts.bind(this);

    }



    componentDidMount() {
        let value = this.context;
        value.getProductsFromBackEnd();
    }


    render(props) {

        return (
            <div className="row">
                <div className="col-sm-6 col-md-4 col-lg-2">

                </div>
                <div className="col-sm-6 col-md-8 col-lg-10">
                    {/* TODO */}
                    <div className="container">
                        <div className="row">
                            <ProductConsumer>
                                {(value) => {
                                    
                                    if (value.productList.length === 0) {
                                        return <p></p>;
                                    }
                                    else {
                                        return value.productList.map((product) => {
                                            return (
                                                <Product key={product.id} productDetail={product} />
                                            );
                                        })
                                    }


                                }
                                }
                            </ProductConsumer>
                        </div>
                        {/* End data from server */}
                    </div>
                    <Modal />
                </div>

            </div>

        )
    }
}
ProductList.contextType = ProductContext;
export default ProductList;