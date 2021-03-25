import React, { Component } from 'react';
import './../style/style.css';

class Login extends Component {
    render (){
        return(
            <div className= "login">
                <input type="text" ref="username" placeholder="Username" required/><br/>
                <input type="password" ref="password" placeholder="Password" required/><br/>
                <input type="button" onClick={() => this.login(this.refs)} value="Login" /><br/>
            </div>
        )
    }
}

export default Login;