import React from 'react';
import { ProductConsumer } from '../../context';
import {Redirect,Route} from "react-router-dom";
 
class PrivateRoute extends React.Component{
    constructor(props){
        super(props);
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }

    isAuthenticated(value){
        let Component = this.props.component;
        return (<Route render={() => {
            if(value.user !== ""){
                return <Component/>
            }else{
                return <Redirect to='/login'/>
            }
        }}/>);

    }

    render(props){
        return(
            <ProductConsumer>
                {
                    (value) => this.isAuthenticated(value)
                }
            </ProductConsumer>
        )
    }
}

export default PrivateRoute;