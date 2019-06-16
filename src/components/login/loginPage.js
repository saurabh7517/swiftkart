import React from 'react';
import { Link,Redirect } from "react-router-dom";
import "./loginPage.css";
import { ProductConsumer, ProductContext } from '../../context';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.validate = this.validate.bind(this);
    }

    validate(event) {
        event.preventDefault();
        let value = this.context;
        let email = event.target[0].value;
        let password = event.target[1].value;
        console.log(email + "  " + password);
        value.sendUserCred(email, password);


    }

    render(props) {
        let value = this.context;
        if (value.user === "") {
            return (
                <div className="container-fluid" id="formContainer">
                    <form onSubmit={this.validate}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>

                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
                        </div><br />

                        <button type="submit" className="btn btn-primary">Submit</button><br /><br />
                        If you are a first time user, Click below to register!!!!<br /><br />
                        <Link to="/register"><button type="submit" className="btn btn-warning">Click to Register</button></Link>
                    </form>
                </div>
            );
        } else {
            return (
                <Redirect to="/products"/>
            );
        }

    }
}
Login.contextType = ProductContext;
export default Login;