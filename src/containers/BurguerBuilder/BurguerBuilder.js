import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';
import Burguer from '../../components/Burguer/Burguer';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

import axiosOrder from '../../axios-order';

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurguerBuilder extends Component {

  /*constructor(props) {
    super(props);
    this.state = {...}
  }*/
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  async componentDidMount() {
    try {
      const response = await axiosOrder.get('/ingredients.json');
      this.setState({ ingredients: response.data });
    } catch (error) {
      this.setState({ error: true })
      console.log(error)
    }
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(ingredientKey => {
          return ingredients[ingredientKey];
      })
      .reduce((sum, element) => { 
        return sum + element; 
      }, 0 );
      this.setState({purchasable: sum > 0})
  };

  purchaseHandler = () => {
    this.setState({purchasing: true});
  };

  purchaseCanceledHandler = () => {
    this.setState({purchasing: false})
  };

  purchaseContinueHandler = async () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Taylon Assis',
        address: {
          street: 'Rua das Ananás',
          zipCode: '231512412',
          country: 'Narnia'
        },
        email: 'taylon@taylon.com'
      },
      deliver: 'fastest'
    };

    try {
      const response = await axiosOrder.post('/orders.json', order);
      this.setState({ loading: false, purchasing: false });
      console.log(response);
    } catch (error) {
      console.log(error);
      this.setState({ loading: false, purchasing: false });
    }
    this.purchaseCanceledHandler();
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burguer = this.state.error ? <p> Ingredients can't be loaded </p> : <Spinner />;
    if (this.state.ingredients) {
      burguer = (
        <Aux>
          <Burguer ingredients={this.state.ingredients}/>
          <BuildControls 
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}/>
          </Aux>
      );
      orderSummary =  <OrderSummary 
                          ingredients={this.state.ingredients}
                          purchaseCanceled={this.purchaseCanceledHandler}
                          purchaseContinue={this.purchaseContinueHandler}
                          price={this.state.totalPrice} />
    }
    
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

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

export default withErrorHandler(BurguerBuilder, axiosOrder);
