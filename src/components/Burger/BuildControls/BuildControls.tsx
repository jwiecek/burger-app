import React from 'react';
import classes from './BuildControls.module.scss'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props: any) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(control => (
            <BuildControl
                key={control.label}
                label={control.label}
                added={() => props.add(control.type)}
                removed={() => props.remove(control.type)}
                disabled={props.disable[control.type]}
            />
        ))}
        <button disabled={props.price <= 0} className={classes.OrderButton} onClick={props.ordered}>Order now {props.price} </button>
    </div>
);

export default buildControls;
