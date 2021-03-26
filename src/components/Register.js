import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
    constructor(){
        super();
        this.state = { 
            redirect: false,
            register_failed: false
         }
    }

    register(refs) {
        // Checking inputs are sent successfully
        // console.log(refs.name.value);
        
        const self = this;
        const formData = new FormData()

        formData.append('username', refs.username.value);
        formData.append('password', refs.password.value);
        formData.append('name', refs.name.value);
        formData.append('email', refs.email.value);
        formData.append('phonenumber', refs.phonenumber.value);

        axios.post('http://localhost:3004/auth/register', formData, {})
        .then(function(response) {
            console.log(response.data);
            if(response.data.success) self.setState({redirect: true})
            else {
                self.setState({ 
                    register_failed: true,
                    error_message: response.data.message
                })
            }
        }).catch(function(err){
        console.log(err);
        });
    }

    renderRegisterFailed = () => {
        if (this.state.register_failed) {
            return <h4>{this.state.error_message}</h4>
        }
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/' />
        }
    }

    render (){
        return(
            <div className="register">
                {this.renderRedirect()}
                {this.renderRegisterFailed()}
                <form>
                    <input type="text" ref="username" placeholder="Username" required/><br/>
                    <input type="password" ref="password" placeholder="Password" required/><br/>
                    <input type="text" ref="name" placeholder="Name" required/><br/>
                    <input type="text" ref="email" placeholder="E-mail" required/><br/>
                    <input type="text" ref="phonenumber" placeholder="Phone Number" required/><br/>
                    <input type="button" onClick={() => this.register(this.refs)} value="Submit" /><br/>
                </form>
            </div>
        )
    }
}

export default Register;