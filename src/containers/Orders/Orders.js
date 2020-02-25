import React, { Component } from 'react';

import { connect } from 'react-redux';

import axiosOrder from '../../axios-order';

import Order from '../../components/Order/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/'

class Orders extends Component {
    
    // state = {
    //     orders: [],
    //     loading: true,
    // }ç

    componentDidMount() {
        // try {
        //     const response = await axiosOrder.get('/orders.json');
        //     const fetchOrders = [];
        //     for (let key in response.data) {
        //         fetchOrders.push({
        //             ...response.data[key],
        //             id: key
        //         })
        //     }
        //     this.setState({
        //         loading: false, orders: fetchOrders
        //     });
        // } catch (error) {
        //     console.log(error);
        // }
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }
    
    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                        <Order 
                            key={order.id}
                            ingredients={order.ingredients}
                            price={+order.price}
                        />
                    ));
        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.idToken,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosOrder));