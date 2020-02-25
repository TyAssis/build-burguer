import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(ingredientKey => {
                return (
                    <li key={ingredientKey}>
                        <span style={{ textTransform: 'capitalize' }}>{ingredientKey} </span>: {this.props.ingredients[ingredientKey]}
                    </li>
                );
            });

        return (
            <Aux>
                <h3> Your Order </h3>
                <p> A delicious burguer with the followin ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong> Total Price: {this.props.price.toFixed(2)} </strong></p>
                <p> Continue to checkout? </p>
                <Button buttonType={"Danger"} clicked={this.props.purchaseCanceled}> CANCEL </Button>
                <Button buttonType={"Success"} clicked={this.props.purchaseContinue}> CONTINUE </Button>
            </Aux>
        )
    };
}

export default OrderSummary;