import React from 'react';
import {Link} from "react-router-dom";
import "./Register.css";
import { ProductContext } from '../../context';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.validate = this.validate.bind(this);
    }

    validate(event) {
        event.preventDefault();
        let value = this.context;
        let name = event.target[0].value;
        let email = event.target[1].value;
        let password = event.target[2].value;
        let confPassword = event.target[3].value;
        if(password === confPassword){
            value.registerUser(name,email,password,confPassword);
        }
        console.log(email + "  " + password);
        


    }
    render(props){
        return(
            <div className="container-fluid" id="registerContainer">
            <form onSubmit={this.validate}>
                <div className="form-group">
                    <label htmlFor="nametag">Name</label>
                    <input type="text" className="form-control" id="nametag" aria-describedby="emailHelp" placeholder="Enter Name"></input>

                </div>
                <div className="form-group">
                    <label htmlFor="emailTag">Email</label>
                    <input type="email" className="form-control" id="emailTag" placeholder="Email"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Password"></input>
                </div><br/>
                <button type="submit" className="btn btn-primary">Submit</button><br/><br/>
            </form>
        </div>
        )
    }
}
Register.contextType = ProductContext;
export default Register;