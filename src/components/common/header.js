import React from 'react';
import { Link } from "react-router-dom";
import "./header.css";
import {Dropdown} from "react-bootstrap";
import { ProductConsumer, ProductContext } from "../../context";
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);

    }
    logout(){
        this.context.logoutUser();
    }





    render(props) {
        let navigation_inline = {
            display: "inline-flex"
        }

        return (
            <nav id="navigator" className="navbar fixed-top navbar-expand-md" >
                <div className="navbar-collapse collapse w-100  dual-collapse2">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/" className=" nav-link text-vertical" > Home </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/products" className="nav-link text-vertical" > Products </Link>
                        </li>
                    </ul>
                </div>

                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul className="navbar-nav ml-auto">
                        {/* <li className="nav-item">
                        <Link id="login" to="/login" className="nav-link text-vertical">Register/Login</Link>
                    </li> */}
                        <ProductConsumer>
                            {
                                (value) => {
                                    let renderVal = <span><Link id="login" to="/login" className="nav-link text-vertical">Register/Login</Link></span>;

                                    // let dropdownList = <span></span>
                                    // if(this.state.listStatus){
                                    //     let dropdownList = <Link id="login" to="/login" className="dropdown-item" href="#">Logout</Link>
                                    // }
                                    if (value.auth_token !== "") {
                                        renderVal = <Dropdown>
                                        <Dropdown.Toggle  className="btn-secondary" id="dropdown-basic">
                                        {value.user}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item><Link id="logout" to="/logout" className="nav-link text-vertical"><button type="button"onClick={() => this.logout()} className="btn btn-warning">Logout</button></Link></Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    }
                                    return (<React.Fragment><li className="nav-item">{renderVal} </li> <li className="nav-item"><Link id="cart" to="/cart"><button type="button" className="btn btn-success">
                                        <strong>Cart </strong> <span className="badge badge-light">{value.cartProducts.length}</span>
                                    </button></Link></li></React.Fragment>)
                                }
                            }
                        </ProductConsumer>

                    </ul>
                </div>
            </nav>
        )
    }
}
Header.contextType = ProductContext;
export default Header;