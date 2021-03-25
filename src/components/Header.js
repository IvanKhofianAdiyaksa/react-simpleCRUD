import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../style/style.css';

class Header extends Component {
    render(){
        return(
            <div>
                <div className="container">
                    <nav className="navigation">
                        <ul>
                            <li><Link to='/'>Menu</Link></li>
                            <li><Link to='/create'>Create</Link></li>
                            <li><Link to='/update/:product_id?'>Update</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}

export default Header;