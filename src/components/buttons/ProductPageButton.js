import React from 'react';
import "./ProductPageButton.css";
 
class ProductPageButton extends React.Component{
    constructor(props){
        super(props);
    }
    render(props){
        return(
            <React.Fragment>
                <button className="btn btn-primary" onClick={this.props.handleClick}>Continue Shopping</button>
            </React.Fragment>
        )
    }
}

export default ProductPageButton;