import React from 'react'
import classes from './Button.module.scss'

const button = (props: any) => (
        <button
            className={[classes.Button, classes[props.btnType]].join(' ')}
            disabled={props.disabled}
            onClick={props.clicked}>{props.children}</button>
    );

export default button;
