import React, { Component } from 'react';

class Register extends Component {
    render (){
        return(
            <div className="register">
                <input type="text" ref="username" placeholder="Username" required/><br/>
                <input type="password" ref="password" placeholder="Password" required/><br/>
                <input type="text" ref="email" placeholder="E-mail" required/><br/>
                <input type="text" ref="phonenumber" placeholder="Phone Number" required/><br/>
                <input type="button" onClick={() => this.register(this.refs)} value="Submit" /><br/>
            </div>
        )
    }
}

export default Register;