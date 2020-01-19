import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axiosOrder from '../../../axios-order';

import classes from './ContactData.module.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
    };

    orderHandler = async (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
            this.setState({ loading: false });
            console.log(response);
        } catch (error) {
            console.log(error);
            this.setState({ loading: false });
        }
    }

    render () {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                <input className={classes.Input} type="text" name="email" placeholder="Your email" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postalCode" placeholder="Postal code" />
                <Button buttonType="Success" clicked={this.orderHandler}> ORDER </Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4> Enter your contact data </h4>
                {form}
            </div>
        );
    }
}

export default ContactData;