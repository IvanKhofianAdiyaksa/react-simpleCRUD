import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import axios from 'axios';
import './../style/style.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Header extends Component {
    state = {
        user_detail: {},
        login: true
    }
    
    componentWillMount(){
        const token = cookies.get('jwtToken');

        // receiving params form endpoint
        // const {match:{params}} = this.props;
        // console.log(params);
        axios.get(`http://localhost:3004/auth/token/decode/${token}`)
        .then((mineData) => {
            // Checking if API is delivered successfully
            console.log(mineData);
            this.setState({
                product: mineData.data.user_detail
            })
            // Checking if data is delivered successfully
            // console.log(this.state.product.name);
        })
    }

    logOut(){
        cookies.remove('jwtToken');
        this.setState({
            login: false
        })
    }

    loginRedirect = () => {
        if (!this.state.login) {
            return <Redirect to='/login' />
        }
    }

    render(){
        return(
            <div>
                <div className="container">
                    {this.loginRedirect()}
                    <nav className="navigation">
                        <ul>
                            <li><Link to='/'>Menu</Link></li>
                            <li><Link to='/create'>Create</Link></li>
                            <li><Link to='/update/:product_id?'>Update</Link></li>
                            <li>welcome, {this.state.user_detail}</li>
                        </ul>
                    </nav>
                    <input type="button" onClick={() => this.logOut()} value="Log Out" />
                </div>
            </div>
        )
    }
}

export default Header;