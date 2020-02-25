import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import classes from './Layout.module.css';

class Layout extends Component {

  state = {
    showSideDrawer: true
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  sideDrawerToogleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer }
    });
  }

  render() {
    return (
      <Aux>
        <Toolbar 
          drawerToogleClicked={this.sideDrawerToogleHandler}
          isAuth={this.props.isAuthenticated} 
          />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <div>
          Toolbar, SideDrawer, Backdrop
      </div>
        <main className={classes.Content} >
          {this.props.children}
        </main>
      </Aux >
    );
  }

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null,
  };
}

export default connect(mapStateToProps)(Layout);
