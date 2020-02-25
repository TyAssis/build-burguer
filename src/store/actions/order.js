import * as actionTypes from './actionTypes';
import axiosOrder from '../../axios-order';

export const purchaseBurguerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGUER_SUCCESS,
    orderId: id,
    orderData,
  };
};

export const purchaseBurguerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGUER_FAIL,
    error,
  };
};

export const purchaseBurguerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGUER_START,
  }
}

export const purchaseBurguer = (orderData, token) => {
  return async dispatch => {
    dispatch(purchaseBurguerStart());
    try {
      const response = await axiosOrder.post(`/orders.json?auth=${token}`, orderData);
      dispatch(purchaseBurguerSuccess(response.data.name, orderData));
    } catch (error) {
      dispatch(purchaseBurguerFail(error));
    }
  }
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  }
}

export const fetchOrdersSucess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error,
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  }
}

export const fetchOrders = (token, userId) => {
  return async dispatch => {
    dispatch(fetchOrdersStart());
    try {
      const response = await axiosOrder.get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`);
      const fetchOrders = [];
      for (let key in response.data) {
        fetchOrders.push({
          ...response.data[key],
          id: key
        })
      }
      dispatch(fetchOrdersSucess(fetchOrders));
    } catch (error) {
      dispatch(fetchOrdersFail(error));
    }
  };
}