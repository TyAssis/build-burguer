import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utils';

const initialState = {
    // ingredients: {
    //     salad: 0,
    //     meat: 0,
    //     bacon: 0,
    //     cheese: 0,
    // },
    ingredients: null,
    totalPrice: 4,
    error: false,
};

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngredient = (state, action) => {
    const updateIngredient = { 
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
    }
    const updatedIngredients = updatedObject(state.ingredients, updateIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
    };
    return updatedObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updateIngredient = { 
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
    }
    const updatedIngredients = updatedObject(state.ingredients, updateIngredient);
    const updatedState = {
        ingredients: { updatedIngredients },
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
    };
    return updatedObject(state, updatedState);
};

const setIngredients = (state, action) => {
    return updatedObject(
        state, 
        {
            ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
            error: false,
            totalPrice: 4,
        }
    );
};

const fetchIngredientsFail = (state, action) => {
    return updatedObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
            // return {
            //     ...state,
            //     ingredients: {
            //         ...state.ingredients,
            //         [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
            //     },
            //     totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            // };
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
            // return {
            //     ...state,
            //     ingredients: {
            //         ...state.ingredients,
            //         [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
            //     },
            //     totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
            // };
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
            // return {
            //     ...state,
            //     ingredients: {
            //         salad: action.ingredients.salad,
            //         bacon: action.ingredients.bacon,
            //         cheese: action.ingredients.cheese,
            //         meat: action.ingredients.meat,
            //     },
            //     error: false,
            //     totalPrice: 4,
            // }
        case actionTypes.FETCH_INGREDIENTS_FAILS: return fetchIngredientsFail(state, action);
            // return {
            //     ...state,
            //     error: true,
            // }
        default:
            return state;
    }
}

export default reducer;