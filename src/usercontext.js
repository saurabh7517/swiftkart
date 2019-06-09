import React from 'react';
import { ProductProvider } from './context';
const UserContext =  React.createContext();
const loginURL = "http://localhost:8080/user/login";
//UserProvider
//UserConsumer
 
class UserProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:"",
            auth_token:"",
            cartid:"",       
            dataSize:20,
            pageNumber:1
        }
        this.sendUserCred = this.sendUserCred.bind(this);
    }

    sendUserCred(username,password){
        fetch(loginURL,{
            method:'POST',
            header:{},
            body:JSON.stringify({	"credentialsDto":{
                "username":username,
                "password":password
            },
            "dataSize":new String(this.state.dataSize),
            "pageNumber":new String(this.state.pageNumber)
        })


        }).then((result) => result.json()).then((result)=>{this.setState({user:result.user,auth_token:result.auth_token})},(error)=>{console.log(error)});
    }
    render(props){
        return(
            <UserContext.Provider value = {
                {
                    ...this.state,
                    sendUserCred:this.sendUserCred
                }
            }>
        {this.props.children}
        {/* <ProductProvider userProp={this.state}/> */}

            </UserContext.Provider>
        )
    }
}

const UserConsumer = UserContext.Consumer;
export{UserProvider,UserConsumer,UserContext};