import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/CheckOut/CheckOut';
import Orders from './containers/Orders/Orders';
import { Route, Switch } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import { connect } from 'react-redux';
import * as actionTypes from './store/actions';
import { withRouter, Redirect } from 'react-router-dom';

class App extends Component {

  componentDidMount = () => {
    const token = localStorage.getItem('token');
    const expiration_time = new Date(localStorage.getItem('expiration_time'));
    if (token != null && expiration_time > new Date()) {
        const user_id = localStorage.getItem('user_id');
        this.props.autoLogin(token, user_id);
    }
  }

  render() {
    let routes = 
                <Switch>
                    <Route path='/orders' component={Orders} />
                    <Route path='/auth' component={Auth} />
                    <Route path='/checkout' component={CheckOut} />
                    <Route path='/' component={BurgerBuilder} />
                    <Redirect to='/' />
                </Switch>
    if (this.props.token === null) {
      routes = 
              <Switch>
                  <Route path='/auth' component={Auth} />
                  <Route path='/' component={BurgerBuilder} />
                  <Redirect to='/' />
              </Switch>
    }
    return (
      <div>
        <Layout>
            {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token:state.token
  }
}

const mapDispatchToProps = dispatch => {
  return  {
      autoLogin:(token, user_id) => dispatch({type:actionTypes.SET_TOKEN, token:token, user_id:user_id})
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
