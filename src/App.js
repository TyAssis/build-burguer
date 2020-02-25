import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder'
import Logout from './containers/Auth/Logout/Logout';
import lazyLoading from './hoc/asyncComponent/asyncComponent';

import * as actions from './store/actions';

const lazyCheckout = lazyLoading(() => import('./containers/Checkout/Checkout'));
const lazyOrders = lazyLoading(() => import('./containers/Orders/Orders'));
const lazyAuth = lazyLoading(() => import('./containers/Auth/Auth'));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp()
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/auth" component={lazyAuth} />
        <Route path="/" exact component={BurguerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={lazyCheckout} />
          <Route path="/orders" component={lazyOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={lazyAuth} />
          <Route path="/" exact component={BurguerBuilder} />          
        </Switch>
      );
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
    isAuthenticated: state.auth.idToken !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
