import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import axios from 'axios';
import './../style/style.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Login extends Component {
    constructor(){
        super();
        this.state = { 
            redirect: false,
            error_message: false,
            login_failed: false
         }
    }

    login(refs) {
        // Checking inputs are sent successfully
        // console.log(refs.name.value);
        
        const self = this;
        const formData = new FormData()

        formData.append('username', refs.username.value);
        formData.append('password', refs.password.value);

        axios.post('http://localhost:3004/auth/login', formData, {})
        .then(function(response) {
            console.log(response.data);
            if(response.data.success) {
                cookies.set('jwtToken', response.data.token, {path: '/'});
                self.setState({redirect: true})
            }
            else {
                self.setState({ 
                    login_failed: true,
                    error_message: response.data.message
                })
            }
        }).catch(function(err){
        console.log(err);
        });
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/' />
        }
    }

    renderLoginFailed = () => {
        if (this.state.login_failed) {
            return <h4>{this.state.error_message}</h4>
        }
    }

    render (){
        return(
            <div className= "login">
                {this.renderRedirect()}
                {this.renderLoginFailed()}
                <form>
                    <input type="text" ref="username" placeholder="Username" required/><br/>
                    <input type="password" ref="password" placeholder="Password" required/><br/>
                    <input type="button" onClick={() => this.login(this.refs)} value="Login" />
                    <Link to="/register"><button>Register</button></Link><br/>
                </form>
            </div>
        )
    }
}

export default Login;