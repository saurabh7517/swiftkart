import React from 'react';
import { ProductConsumer } from '../../context';
import {Link} from "react-router-dom";
 
 
class Logout extends React.Component{
    constructor(props){
        super(props);
    }
    render(props){
        return(
            <div className="container">
                <div className="text-capitalize font-weight-bolder">User logged out!!!!</div>
                <Link to="/" ><button className="btn-warning"> Home</button></Link>
            </div>

        )
    }
}

export default Logout;