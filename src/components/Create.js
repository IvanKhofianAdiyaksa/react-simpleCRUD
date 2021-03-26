import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './../style/style.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Create extends Component {
    constructor(){
        super();
        this.state = {
            selectedFile: null,
            redirect: false,
            login: false
        };
    };

    componentWillMount(){
        if (cookies.get('jwtToken')) {
            this.setState({ login: true });
        }
    }

    onFileChange = event => {
        // checking image file is added succesfully in file upload
        // console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    kirim(refs){
        // Checking inputs are sent successfully
        // console.log(refs);
        // console.log(refs.name.value);
        // Checking if image has delivered successfully
        // console.log(this.state.selectedFile);
       
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

        axios.post('http://localhost:3004/products/new/add', formData, {})
        .then(function(response) {
        // Checking Express API is delivered successfully
        // console.log(response.data.result);
        console.log(response.data.success);
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
        return(
            <div className="form">
                {this.loginRedirect()}
                {this.renderRedirect()}
                <form id="simple-form" action="#">
                    <label>Product</label><br/>
                    <input type="text" ref="name" placeholder="Product Name" required/><br/>
                    <label>Product Price</label><br/>
                    <input type="number" ref="price" placeholder="Price" required/><br/>
                    <label>Description</label><br/>
                    <textarea type="text" ref="description" placeholder="Description" required/><br/>
                    <label>Product Image</label><br/>
                    <input type="file" accept="image/*" onChange={this.onFileChange} required/><br/>
                    <input type="button" onClick={() => this.kirim(this.refs)} value="submit"/>
                </form>
            </div>
        )
    }
}

export default Create;