import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';
import Burguer from '../../components/Burguer/Burguer';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as action from '../../store/actions/';

import axiosOrder from '../../axios-order';

class BurguerBuilder extends Component {
  /*constructor(props) {
    super(props);
    this.state = {...}
  }*/
  state = {
    //old component state, now in reducer
    //ingredients: null,
    //totalPrice: 4,
    //purchasable: false,
    purchasing: false,
    // loading: false,
    // error: false
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(ingredientKey => {
          return ingredients[ingredientKey];
      })
      .reduce((sum, element) => { 
        return sum + element; 
      }, 0 );
      //this.setState({purchasable: sum > 0})
      return sum > 0;
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }

  };

  purchaseCanceledHandler = () => {
    this.setState({purchasing: false})
  };

  purchaseContinueHandler = async () => {
    // this.setState({ loading: true });
    // old passing state, now with reducer
    // const queryParams = [];
    // for (let i in this.props.ings) {
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
    // }
    // queryParams.push('price=' + this.state.totalPrice);
    // const queryString = queryParams.join('&');
    this.props.onInitPurchase();
    this.props.history.push({
      pathname: '/checkout',
      //search: '?' + queryString,
    });
    
    this.purchaseCanceledHandler();
  };

  // addIngredientHandler = (type) => {
  //   const oldCount = this.props.ings[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.props.ings
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENTS_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  //   this.updatePurchaseState(updatedIngredients);
  // }

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.props.ings[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.props.ings
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENTS_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  //   this.updatePurchaseState(updatedIngredients);
  // }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burguer = this.props.error ? <p> Ingredients can't be loaded </p> : <Spinner />;
    if (this.props.ings) {
      burguer = (
        <Aux>
          <Burguer ingredients={this.props.ings}/>
          <BuildControls 
            isAuth={this.props.isAuthenticated}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.price}/>
          </Aux>
      );

      orderSummary =  <OrderSummary 
                          ingredients={this.props.ings}
                          purchaseCanceled={this.purchaseCanceledHandler}
                          purchaseContinue={this.purchaseContinueHandler}
                          price={this.props.price} />
    }
    
    // if (this.state.loading) {
    //   orderSummary = <Spinner />;
    // }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCanceledHandler}>
          {orderSummary}
        </Modal>
        {burguer}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burguerBuilder.ingredients,
    price: state.burguerBuilder.totalPrice,
    error: state.burguerBuilder.error,
    isAuthenticated: state.auth.idToken !== null,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(action.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(action.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(action.initIngredients()),
    onInitPurchase: () => dispatch(action.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(action.setAuthRedirectPath(path)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurguerBuilder, axiosOrder));
