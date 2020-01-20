import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

// import queryString from 'query-string';

class Checkout extends Component {

    // old state, now in reducer
    // state = {
    //     ingredients: {},
    //     price: 0
    // }

    // componentDidMount() {
    //     const query = new queryString.parse(this.props.location.search);
    //     let ingredients = { ...query};
    //     delete ingredients['price'];
    //     this.setState({ ingredients, price: query.price });
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        console.log(this.props.ings)
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route path={this.props.match.path + '/contact-data'} 
                    // old Route props passing, now in reducer 
                    //    render={(props) => (
                    //     <ContactData 
                    //         ingredients={this.state.ingredients} 
                    //         price={this.state.price}
                    //         {...props} />
                    //     )} 
                    component={ContactData}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
    }
};

export default connect(mapStateToProps)(Checkout);