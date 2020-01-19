import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

import queryString from 'query-string';

class Checkout extends Component {
    state = {
        ingredients: {},
        price: 0
    }

    componentDidMount() {
        const query = new queryString.parse(this.props.location.search);
        let ingredients = { ...query};
        delete ingredients['price'];
        this.setState({ ingredients, price: query.price });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        console.log(this.state.ingredients)
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route path={this.props.match.path + '/contact-data'} 
                       render={(props) => (
                        <ContactData 
                            ingredients={this.state.ingredients} 
                            price={this.state.price}
                            {...props} />
                        )} 
                />
            </div>
        );
    }
}

export default Checkout;