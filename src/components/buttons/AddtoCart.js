import React from 'react';
import "./AddtoCart.css";
 
class AddtoCartButton extends React.Component{
    constructor(props){
        super(props);
    }
    render(props){

        return(
            <button className="btn btn-warning" onClick={this.props.clickHandle}>Add to Cart</button>
        )
    }
}

export default AddtoCartButton;