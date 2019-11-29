import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: {},
    totalPrice: 0,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const burgerBuilder = (state = initialState, action: any) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingType]: (state.ingredients as any)[action.ingType] + 1
                },
                totalPrice: state.totalPrice + (INGREDIENT_PRICES as any)[action.ingType]
            };
        case actionTypes.REMOVE_INGREDIENT:
            const ingred1 = {...state.ingredients};
            let priceDeduction = state.totalPrice;
            if((ingred1 as any)[action.ingType] >= 1) {
                (ingred1 as any)[action.ingType] = (ingred1 as any)[action.ingType] - 1;
                priceDeduction = state.totalPrice - (INGREDIENT_PRICES as any)[action.ingType];
            }
            return {
                ...state,
                ingredients: ingred1,
                totalPrice: priceDeduction
            };
        case actionTypes.SET_INGREDIENT:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 0
            };
        case actionTypes.FETCH_INGREDIENT_FAILED:
            return {
                ...state,
                error: true
            };
        default:{
            return state;
        }
    }
};

export default burgerBuilder;
