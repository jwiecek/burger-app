import React, {useEffect, useState} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler.js";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

export function BurgerBuilder(props: any) {

    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredient();
    },[]);

    let saladArr = Array(props.ing.salad).fill('salad');
    let baconArr = Array(props.ing.bacon).fill('bacon');
    let cheeseArr = Array(props.ing.cheese).fill('cheese');
    let meatArr = Array(props.ing.meat).fill('meat');

    const ingredientsList = [...saladArr, ...baconArr, ...cheeseArr, ...meatArr];
    const ingredientsTable = [
        { name: 'salad', count: props.ing.salad },
        { name: 'bacon', count: props.ing.bacon },
        { name: 'cheese', count: props.ing.cheese },
        { name: 'meat', count: props.ing.meat },
    ];

    const disabledInfo = {
        salad: saladArr.length === 0,
        bacon: baconArr.length === 0,
        cheese: cheeseArr.length === 0,
        meat: meatArr.length === 0
        };

    const purchaseHandler = () => {
        setPurchasing(!purchasing)
    };

    const purchaseContinueHandler = () => {
        props.onPurchaseInit();
        props.history.push( '/checkout');
    };

    let orderSummary = <OrderSummary
        price={props.prc}
        ingredients={ingredientsTable}
        purchaseCancel={purchaseHandler}
        purchaseContinue={purchaseContinueHandler}
    />;


    let burger = props.error ? <p>Ingredients can't be loaded</p> : null;

    if(props.ing) {
        burger = (
            <Aux>
                <Modal
                    show={purchasing}
                    modalClosed={purchaseHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients = {ingredientsList}/>
                <BuildControls add={props.addIngredient}
                               remove={props.removeIngredient}
                               price={props.prc}
                               disable={disabledInfo}
                               ordered={purchaseHandler}
                />
            </Aux>
        );
    }
    return burger;

}

const mapStateToProps = (state:any) => {
    return {
        ing: state.burgerBuilder.ingredients,
        prc: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        addIngredient: (type: string) => dispatch(actions.addIngredient(type)),
        removeIngredient: (type: string) => dispatch(actions.removeIngredient(type)),
        onInitIngredient: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
