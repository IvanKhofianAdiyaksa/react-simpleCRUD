import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import './../style/style.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Menu extends Component {
    constructor(){
        super();
        this.state = { 
            products: [],
            login: false
         }
    }

    componentWillMount(){
        // if (cookies.get('jwtToken')) {
        //     this.setState({ login: true });
        // }

        axios.get('http://localhost:3004/products')
        .then((mineData) => {
            console.log(mineData.data.result);
            this.setState({
                products: mineData.data.result
            })
            console.log(this.state.products[0].image_filename);
        })
    }

    deleteProduct(product_id){
        const self = this;

        axios.delete(`http://localhost:3004/products/delete/${product_id}`)
        .then((response) => {
            console.log(response.data.result);
            console.log(response.data.success);
            if (response.data.success) {
                // console.log(response.data.product);
                self.setState({products: response.data.result})};
        }).catch((err) => {
            console.log(err);
        })
    }

    // loginRedirect = () => {
    //     if (!this.state.login) {
    //         return <Redirect to='/login' />
    //     }
    //   }

    render(){
        const productList = this.state.products.map((item, index) => {
            return <div className="background_menu" key={`${index}.${item.id}.${item.name}`}>
            <div className="product_head">
                <h3>{item.name}</h3>
            </div>
            <div className="product_image">
                <img src={`http://localhost:3004/assets/images/${item.image_filename}`} alt="product_image" />
            </div>
            <div className="product_body">
                <h4>{item.price}</h4>
                <p>{item.description}</p>
            </div>
            <div className="action_button">
                <Link to={`update/${item.id}`}><button className="btn update_btn">Update</button></Link>
                <button onClick={() => this.deleteProduct(item.id)} className="btn delete_btn">Delete</button>
            </div>
        </div>
        })
        return(
            <div className="menu">
                {/* {this.loginRedirect()} */}
                {productList}
            </div>
        )
    }
}

export default Menu;