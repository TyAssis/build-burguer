import React, { Component } from 'react';

import axiosOrder from '../../axios-order';

import Order from '../../components/Order/Order/Order';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    
    state = {
        orders: [],
        loading: true,
    }

    async componentDidMount() {
        try {
            const response = await axiosOrder.get('/orders.json');
            const fetchOrders = [];
            for (let key in response.data) {
                fetchOrders.push({
                    ...response.data[key],
                    id: key
                })
            }
            this.setState({
                loading: false, orders: fetchOrders
            });
        } catch (error) {
            console.log(error);
        }
    }
    
    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}
                    />
                ))}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axiosOrder);