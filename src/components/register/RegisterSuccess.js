import React from 'react';
import {Link} from 'react-router-dom';
 
class RegisterSuccess extends React.Component{
    constructor(props){
        super(props);
    }
    render(props){  
        return(
            <div className="container">
                Successfully registered!!!
                <Link to="/login">Login</Link>
            </div>
        )
    }
}

export  default RegisterSuccess;