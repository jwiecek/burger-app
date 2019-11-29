import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

export const addIngredient = (name: string) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingType: name
    }
};
export const removeIngredient = (name: string) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingType: name
    }
};

export const setIngredients = (ingredients: any) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    }
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED}
};

export const initIngredients = () => {
    return (dispatch: any) => {
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
            })
            .catch(err => {
                dispatch(fetchIngredientsFailed())
            });
    }
};
