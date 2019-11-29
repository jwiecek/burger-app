import React from 'react';
import classes from './Order.module.scss'

const order = (props: any) => {


    const ingredientsOutput = Object.keys(props.ingredients).map((ing: string, index: number)=> {
        return <span style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
        }} key={index}>{ing} : {props.ingredients[ing]} </span>
    });

    return (
        <div className={classes.Order}>
            <p>Ingredient: {ingredientsOutput} </p>
            <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
        </div>
    )
};


export default order;
