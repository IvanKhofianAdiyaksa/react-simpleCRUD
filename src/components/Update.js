import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './../style/style.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


class Update extends Component {
    constructor(){
        super();
        this.state = {
            selectedFile: null,
            redirect: false,
            product: {},
            login: false
        };
    };

    componentWillMount(){
        if (cookies.get('jwtToken')) {
            this.setState({ login: true });
        }

        // receiving params form endpoint
        const {match:{params}} = this.props;
        // console.log(params);
        axios.get(`http://localhost:3004/products/${params.product_id}`)
        .then((mineData) => {
            // Checking if API is delivered successfully
            console.log(mineData.data.result[0]);
            this.setState({
                product: mineData.data.result[0]
            })
            // Checking if data is delivered successfully
            console.log(this.state.product.name);
        })
    }

    onFileChange = event => {
        // checking image file is added succesfully in file upload
        // console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    kirimUpdate(refs){
        // Checking inputs are sent successfully
        // console.log(refs);
        // console.log(refs.name.value);
        // Checking if image has delivered successfully
        // console.log(this.state.selectedFile);
       
        // receiving params form endpoint
        const {match:{params}} = this.props;
        // console.log(params);

        // declaring self to make global variable for this
        const self = this;

        // declaring object template
        const formData = new FormData()
        // taking data with 
        // 'objectProperty_name',
        // from refs.name.value ==> from input result can be seen in console
        formData.append('name', refs.name.value);
        formData.append('price', refs.price.value);
        formData.append('description', refs.description.value);
        formData.append('image_filename', this.state.selectedFile);

        axios.patch(`http://localhost:3004/products/update/${params.product_id}`, formData, {})
        .then(function(response) {
        // Checking Express API is delivered successfully
        // console.log(response.data);
        // console.log(response.data.success);
        // reseting all value in form > input tag, thus all of them cannot be empty
        document.getElementById("simple-form").reset();
        // redirect logic
        if(response.data.success) self.setState({redirect: true});
        }).catch(function(err){
        console.log(err);
        });
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/' />
        }
    }

    loginRedirect = () => {
        if (!this.state.login) {
            return <Redirect to='/login' />
        }
    }
        

    render(){
        // console.log(this.state.product);
        return(
            <div className="form">
                {this.loginRedirect()}
                {this.renderRedirect()}
                <form id="simple-form" action="#">
                    <label>Product</label><br/>
                    <input type="text" ref="name" placeholder="Product Name" defaultValue={this.state.product.name} required/><br/>
                    <label>Product Price</label><br/>
                    <input type="number" ref="price" placeholder="Price" defaultValue={this.state.product.price} required/><br/>
                    <label>Description</label><br/>
                    <textarea type="text" ref="description" placeholder="Description" defaultValue={this.state.product.description} required/><br/>
                    <label>Product Image</label><br/>
                    <input type="file" accept="image/*" onChange={this.onFileChange} /><br/>
                    <input type="button" onClick={() => this.kirimUpdate(this.refs)} value="submit"/>
                </form>
            </div>
        )
    }
}

export default Update;