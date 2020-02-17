import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utils';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state, action) => {
  return updatedObject(state, { purchased: false });
};

const purchaseBurguerStart = (state, action) => {
  return updatedObject(state, { purchased: true });
};

const purchaseBurguerSucess = (state, action) => {
  return updatedObject(
    state, 
    {
      ...action.orderData,
      id: action.id
    }
  );
};

const purchaseBurguerFail = (state, action) => {
  return updatedObject(state, { purchased: false });
};

const fetchOrderStart = (state, action) => {
  return updatedObject(state, { purchased: true });
};

const fetchOrdersSuccess = (state, action) => {
  return updatedObject(
    state, 
    {
    orders: action.orders,
    loading: false,
    }
  );
}

const fetchOrdersFail = (state, action) => {
  return updatedObject(state, { purchased: false });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
    //   return {
    //     ...state,
    //     purchased: false,
    //   };

    case actionTypes.PURCHASE_BURGUER_START: return purchaseBurguerStart(state, action);
      // return {
      //   ...state,
      //   loading: true,
      // };

    case actionTypes.PURCHASE_BURGUER_SUCCESS: return purchaseBurguerSucess(state, action);
      // const newOrder = {
      //   ...action.orderData,
      //   id: action.id
      // };

      // return {
      //   ...state,
      //   loading: false,
      //   purchased: true,
      //   orders: state.orders.concat(newOrder),
      // };

    case actionTypes.PURCHASE_BURGUER_FAIL: return purchaseBurguerFail(state, action);
      // return {
      //   ...state,
      //   loading: false,
      // };

    case actionTypes.FETCH_ORDERS_START: return fetchOrderStart(state, action);
      // return {
      //   ...state,
      //   loading: true,
      // };

    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
      // return {
      //   ...state,
      //   orders: action.orders,
      //   loading: false,
      // };

    case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);
      // return {
      //   ...state,
      //   loading: false,
      // };

    default:
      return state;
  }
};

export default reducer;