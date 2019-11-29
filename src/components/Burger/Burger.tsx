import React from 'react';
import classes from './Burger.module.scss';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props: any) => {

    // const transformedIngredients = Object.keys(props.ingredients)
    //     .map(igKey => {
    //         console.log([...Array(props.ingredients[igKey])]);
    //         return [...Array(props.ingredients[igKey])].map((_, i) => {
    //             return <BurgerIngredient key={igKey + i} type={igKey}/>
    //         })
    //     });

    let transformedIngredients = props.ingredients.map((igKey: string, i: number) => {
            return <BurgerIngredient key={igKey + i} type={igKey}/>
    });

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};


export default burger;
