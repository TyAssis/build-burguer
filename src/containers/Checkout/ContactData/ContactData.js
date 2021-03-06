import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axiosOrder from '../../../axios-order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/';
import { updatedObject } from '../../../utils/utils';
import { checkValidity } from '../../../utils/checkValidity';

import classes from './ContactData.module.css';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                minLength: 5,
                maxLength: 5,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            deliver: {
                elementType: 'select',
                elementConfig: {
                    options: [{
                        value: 'fastest',
                        displayValue: 'Fastest',
                    },
                    {
                        value: 'cheapest',
                        displayValue: 'Cheapest',
                    }]
                },
                value: 'cheapest',
                valid: true
            },
        },
        formIsValid: false,
        // loading: false,
    };

    orderHandler = async (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            order: formData,
            userId: this.props.userId,
        };
        this.props.onOrderBurguer(order, this.props.token);
    }


    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updatedObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true,
        })
        const updatedOrderForm = updatedObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement,
        })
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        } 
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid
        })
    };

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(element => (
                    <Input 
                        key={element.id}
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        value={element.config.value} 
                        invalid={!element.config.valid}
                        shouldValidate={element.config.validation}
                        touched={element.config.touched}
                        changed={(event) => this.inputChangedHandler(event, element.id)} />
                ))}
                <Button 
                    buttonType="Success" 
                    clicked={this.orderHandler}
                    disabled={!this.state.formIsValid}> 
                    ORDER 
                </Button>
            </form>
        );
        if (this.props.loading) {
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

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurguer: (orderData, token) => dispatch(actions.purchaseBurguer(orderData, token))
    };
};

const mapStateToProps = state => {
    return {
        ings: state.burguerBuilder.ingredients,
        price: state.burguerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.idToken,
        userId: state.auth.userId,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axiosOrder));