import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import Menu from './components/Menu';
import Create from './components/Create';
import Update from './components/Update';
import Login from './components/Login';
import Register from './components/Register';
// import Cookies from 'universal-cookie';

// const cookie = new Cookies();


class App extends Component {
    render(){

        return(
            <div>
              <Header />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route exact path='/' component={Menu} />
              <Route path='/create' component={Create} />
              <Route path='/update/:product_id?' component={Update} />
            </div>
        )
    }
}

export default App;