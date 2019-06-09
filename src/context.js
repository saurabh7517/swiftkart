import React from 'react';
import { UserContext } from './usercontext';
import {Redirect} from 'react-router-dom';
const ProductContext = React.createContext();
const URL = 'ws://localhost:8080/countNotify';
const loginURL = "http://localhost:8080/user/login";
//Provider
//Consumer

class ProductProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:"",
            auth_token:"",
            cartid:"",       
            pageSize:20,
            pageNumber:1,
            dataSize:"",
            productList: [],
            detailProduct: {},
            cartProducts: [],
            modalOpen: false,
            modalProduct: {},
            cartTotal: 0,
            ws: new WebSocket(URL),
            socketConnected: false


        }

        // this.ws = new new WebSocket(URL);

        

        this.handleDetail = this.handleDetail.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.increaseQuantity = this.increaseQuantity.bind(this);
        this.decreaseQuantity = this.decreaseQuantity.bind(this);
        this.getProductsFromBackEnd = this.getProductsFromBackEnd.bind(this);
        this.sendUserCred = this.sendUserCred.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }


    

    openModal(id) {
        let product = this.getItemFromProductList(id);
        this.setState(() => {
            return {
                modalOpen: true,
                modalProduct: product
            }
        });
    }

    closeModal() {
        this.setState(() => {
            return {
                modalOpen: false
            }
        });
    }


    getItemFromProductList(id) {
        let productList = this.state.productList;
        let foundProduct = productList.find((product) => product.id === id);
        return foundProduct;
    }


    handleDetail(id) {
        let product = this.getItemFromProductList(id);
        this.setState(() => {
            return {
                detailProduct: product
            }
        });
    }

    setQuantityForDBProducts(result){
        
        let tempResultList = [];
        for (let index = 0; index < result.products.length; index++) {
            let element = result.products[index];
            
            element = {...element,quantityLeft:element.quantity}          
                        
            tempResultList.push({...element,quantity:0})
        }
        return tempResultList;
    }
    processCart(id) {
        this.setState((prevState) => {
            let newProductList = this.toggleInCartStatus(id, [...prevState.productList]);
            
            // let productToAddInCart = newProductList.find((product) => product.id === id);
            let newCartProducts = [...prevState.cartProducts];
            newCartProducts.push(id);
            newProductList = this.setQuantityForCartAddedProducts(id,newProductList);
            let tempPrice = this.calculateCartProducts(newCartProducts, newProductList);
            return {
                cartProducts: newCartProducts,
                productList: newProductList,
                cartTotal: tempPrice
            }
        });
    }

    addToCart(id) {
        this.processCart(id);
        this.notifyBackendDB(id,true);
        this.openModal(id);
    }
// qunatity related methods
    notifyBackendDB(id,status){
        if(status === true){
            fetch("http://localhost:8080/api/addProduct",{
                method:'POST',
                headers:{'Content-Type':'application/json','auth_token':this.state.auth_token},
                body:JSON.stringify({"cartid": new String(this.state.cartid), "productid": new String(id)})
            })
            .then((result) =>{console.log(result)},(error)=>{console.log("Request could not be sent")});
        }else{
            fetch("http://localhost:8080/api/removeProduct",{
                method:'POST',
                headers:{'Content-Type':'application/json','auth_token':this.state.auth_token},
                body:JSON.stringify({"cartid": new String(this.state.cartid), "productid": new String(id)})
            })
            .then((result) =>{console.log(result)},(error)=>{console.log("Request could not be sent")});
        }

    }

    logoutUser(){
        fetch("http://localhost:8080/user/logout",{
            method:'GET',
            headers:{'Content-Type':'application/json','auth_token':this.state.auth_token}            
        }).then((result) => {        this.setState({
            user:"",
            auth_token:"",
            cartid:"",
            cartProducts:[],
            productList:[]

        })},(error) => {console.log(error)})
    }



    getProductsFromCart(cartProducts,productList){
        let tempProductList = productList;
        
        for (let index = 0; index < cartProducts.length; index++) {
            const element = cartProducts[index];
            let foundProduct = productList.find((product) => product.id === element);
            tempProductList = this.toggleInCartStatus(foundProduct.id,tempProductList);
            tempProductList = this.setQuantityForCartAddedProducts(foundProduct.id,tempProductList);            
        }
        return tempProductList;
        
    }

    setQuantityForCartAddedProducts(id,newProductList){
        let index = newProductList.findIndex((product)=> product.id===id);
         
        newProductList[index].quantityLeft = newProductList[index].quantityLeft -1;
        let qunatity_left = newProductList[index].quantityLeft
        newProductList[index].quantity = 1;
        this.notifyQunatityUpdate(id,qunatity_left);
        return newProductList;
    }

    toggleInCartStatus(id, productList) {
        for (let index = 0; index < productList.length; index++) {
            if (productList[index].id === id) {
                if (!productList[index].inCart) {
                    productList[index].inCart = true;
                }
                else {
                    productList[index].inCart = false;
                }
                break;
            }

        }
        return productList;
    }

    notifyQunatityUpdate(id,quantity){

        fetch("http://localhost:8080/api/updateCount",{
            method:'POST',
            headers:{'Content-Type':'application/json','auth_token':this.state.auth_token},
            body:JSON.stringify({"productId": id, "quantity": quantity})
        })
        .then((result) =>{console.log(result)},(error)=>{console.log("Request could not be sent")});
    }

    increaseQuantity(product) {
        let productIndex = this.state.productList.findIndex((cartProduct) => cartProduct.id === product.id);

        this.setState((prevState) => {
            let newQunantity = prevState.productList[productIndex].quantity;
            let quantity_Left = prevState.productList[productIndex].quantityLeft
            if (prevState.productList[productIndex].quantityLeft >= 1) {
                newQunantity = prevState.productList[productIndex].quantity + 1;
                quantity_Left = prevState.productList[productIndex].quantityLeft - 1;
            }
            // let newQunantity = prevState.productList[productIndex].quantity + 1;
            prevState.productList[productIndex].quantity = newQunantity;
            prevState.productList[productIndex].quantityLeft = quantity_Left;
            this.notifyQunatityUpdate(prevState.productList[productIndex].id,quantity_Left);
            let newProductList = [...prevState.productList];
            let tempPrice = this.calculateCartProducts(prevState.cartProducts, newProductList);
            return {
                productList: newProductList,
                cartTotal: tempPrice
            }
        })
    }

    decreaseQuantity(product) {
        if (product.quantity >= 2) {
            let productIndex = this.state.productList.findIndex((cartProduct) => cartProduct.id === product.id);
            this.setState((prevState) => {
                let newQunantity = product.quantity - 1;

                prevState.productList[productIndex].quantity = newQunantity;
                prevState.productList[productIndex].quantityLeft = prevState.productList[productIndex].quantityLeft + 1;
                let newProductList = [...prevState.productList];
                this.notifyQunatityUpdate(prevState.productList[productIndex].id,prevState.productList[productIndex].quantityLeft)
                let tempPrice = this.calculateCartProducts(prevState.cartProducts, newProductList);
                return {
                    productList: newProductList,
                    cartTotal: tempPrice
                }
            })
        }
    }

    calculateCartProducts(cartProducts, productList) {
        let temp = 0;
        cartProducts.forEach(id => {
            let tempProduct = productList.find((product) => product.id === id)
            temp = temp + tempProduct.quantity * tempProduct.price;

        });

        return temp;
    }

    updateQuantityInRemovedProduct(id, newProductList) {
        let index = newProductList.findIndex((product) => product.id === id);
        newProductList[index].quantityLeft = newProductList[index].quantityLeft + newProductList[index].quantity;
        newProductList[index].quantity = 0;
        let qunatity_Left = newProductList[index].quantityLeft;
        this.notifyQunatityUpdate(id,qunatity_Left);

        // for (let index = 0; index < newProductList.length; index++) {
        //     if (newProductList[index].id === id) {

        //         break;
        //     }
        // }
        return newProductList;
    }

    removeFromCart(id) {
        this.setState((prevState) => {
            let newProductList = this.toggleInCartStatus(id, [...prevState.productList]);
            newProductList = this.updateQuantityInRemovedProduct(id, newProductList);
            this.notifyBackendDB(id,false);
            let filteredCartList = prevState.cartProducts.filter((cartProduct) => !(cartProduct === id));
            let tempPrice = this.calculateCartProducts(filteredCartList, newProductList);
            this.notifyBackendDB(id,false);
            return {
                cartProducts: filteredCartList,
                productList: newProductList,
                cartTotal: tempPrice
            }
        });
    }

    registerUser(name,email,password,confirmPassword){
        let promise = fetch("http://localhost:8080/user/register",{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                    "name":name,
                    "email":email,
                    "password":password,
                    "confirmPassword":confirmPassword
            })
        });
        promise.then((result) => result.json()).then((result) => {
            if(result.status === true){
                 return <Redirect push to="/register_success"/>
            }else{
                
            }
        },(error) =>{console.log(error)});
    }



    sendUserCred(username,password){
        let promise = fetch(loginURL,{
            method:'POST',
            header:{'Content-Type':'application/json'},
            body:JSON.stringify({	"credentialsDto":{
                "username":username,
                "password":password
            },
            "dataSize":new String(this.state.dataSize),
            "pageNumber":new String(this.state.pageNumber)
        })


        }).then((result) => result.json()).then((result)=>{this.setState({user:result.user,auth_token:result.auth_token,cartid:result.cartId,cartProducts:result.cartProducts})},(error)=>{console.log(error)});

        promise.then(() =>{this.getProductsFromBackEnd()},(error) => console.log(error));
        
    }



    getProductsFromBackEnd() {
        if(this.state.auth_token !== "" && this.state.cartid !== "" && this.state.user !== ""){
            if(this.state.productList.length === 0){
                fetch("http://localhost:8080/api/getProducts",{
                    method:'POST',
                    headers:{'Content-Type':'application/json','auth_token':this.state.auth_token},
                    body:JSON.stringify({"pageNumber":this.state.pageNumber,"dataSize":this.state.pageSize})
                })
                    .then(res => res.json())
                    .then(
                        (result) => {
                            let newProductList = this.setQuantityForDBProducts(result);
                            
                            // this.setState({cartProducts:result.cartItems})
                            newProductList = this.getProductsFromCart(this.state.cartProducts,newProductList);
                            let tempPrice = this.calculateCartProducts(this.state.cartProducts,newProductList);
                            this.setState({
                                productList: newProductList,                        
                                pageNumber:result.pageNumber,
                                cartTotal: tempPrice
        
                            })
                        },
                        (error) => {
                            this.setState({
                                productList: []
                            })
                            console.log("Error in loading products" + error);
                        }
                    )

            }    

        }
    }


    render(props) {
        return (
            <ProductContext.Provider value={
                {
                    ...this.state,
                    handleDetail: this.handleDetail,
                    addToCart: this.addToCart,
                    openModal: this.openModal,
                    closeModal: this.closeModal,
                    removeFromCart: this.removeFromCart,
                    increaseQuantity: this.increaseQuantity,
                    decreaseQuantity: this.decreaseQuantity,
                    getProductsFromBackEnd: this.getProductsFromBackEnd,
                    sendUserCred:this.sendUserCred,
                    logoutUser:this.logoutUser,
                    registerUser:this.registerUser
                }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }

    updateCount(message){
        let index = 0;   
        index = this.state.productList.findIndex((product) => product.id === message.productId);     
        this.setState((prevState) => {
            prevState.productList[index].quantityLeft = message.quantity;
            let newProductList = [...prevState.productList];
            return{
                productList:newProductList
            }
        })

    }


    startWebSocketClient(URL) {
        let socket = this.state.ws;

        console.log("Looking for connection");
        socket.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected');
            this.setState((prevState) => {
                if (!prevState.socketConnected) {
                    return {
                        socketConnected: true
                    }
                }
            })
            socket.send("{\"message\":\"Hello from frontend\"}");
        }

        socket.onerror = (e) =>{
            console.log("error message" + e);
        }

        socket.onmessage = evt => {
            // on receiving a message, add it to the list of messages
            const message = JSON.parse(evt.data);
            this.updateCount(message);
            console.log(message);
        }
        socket.onclose = () => {
            console.log('disconnected');
            console.log("Attempting to connect again");
            this.setState((prevState) => {
                if (prevState.socketConnected) {
                    return {
                        ws: new WebSocket(URL),
                        socketConnected: false
                    }
                } else {
                    return {
                        ws: new WebSocket(URL)
                    }
                }
            });
        }
    }

    componentDidUpdate() {
        if (!this.state.socketConnected) {
            this.startWebSocketClient(URL);
        }
    }



    componentDidMount(props) {
        if (!this.state.socketConnected) {
            this.startWebSocketClient(URL);
        }
    }
}
const ProductConsumer = ProductContext.Consumer;


export { ProductProvider, ProductConsumer, ProductContext };