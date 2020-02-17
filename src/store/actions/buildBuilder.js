import * as actionTypes from './actionTypes';

import axiosOrder from '../../axios-order';

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  }
}

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients,
  }
}

export const fetchIngredientsFails = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILS,
  }
}

export const initIngredients = () => {
  return async dispatch => {
    try {
      const response = await axiosOrder.get('/ingredients.json');
      dispatch(setIngredients(response.data));
    } catch (error) {
      dispatch(fetchIngredientsFails());
    }
  }
}